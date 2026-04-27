#!/usr/bin/env python3

from __future__ import annotations

import json
import os
import re
import sys
from datetime import datetime, timezone
from functools import partial
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib import error, request


ROOT_DIR = Path(__file__).resolve().parent
CONFIG_PATH = ROOT_DIR / "google-sheets.config.json"
SUBMISSIONS_DIR = ROOT_DIR / "data"
SUBMISSIONS_PATH = SUBMISSIONS_DIR / "unlock-submissions.jsonl"
DEFAULT_PORT = 8091
EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")


def load_google_sheets_config() -> dict[str, Any]:
    file_config: dict[str, Any] = {}
    if CONFIG_PATH.exists():
        try:
            file_config = json.loads(CONFIG_PATH.read_text(encoding="utf-8"))
        except json.JSONDecodeError:
            file_config = {}

    timeout_value = os.getenv("GOOGLE_SHEETS_TIMEOUT_SECONDS") or file_config.get("timeoutSeconds") or 15

    try:
        timeout_seconds = int(timeout_value)
    except (TypeError, ValueError):
        timeout_seconds = 15

    return {
        "webhook_url": os.getenv("GOOGLE_SHEETS_WEBHOOK_URL") or file_config.get("webhookUrl") or "",
        "timeout_seconds": timeout_seconds,
    }


def parse_google_sheets_error(response_body: Any) -> str:
    if isinstance(response_body, dict):
        message = response_body.get("message")
        if isinstance(message, str) and message.strip():
            return message.strip()

        errors = response_body.get("errors")
        if isinstance(errors, dict):
            parts: list[str] = []
            for value in errors.values():
                if isinstance(value, list):
                    parts.extend(str(item) for item in value)
                elif value:
                    parts.append(str(value))
            if parts:
                return " ".join(parts)

    return "Google Sheets webhook grąžino klaidą."


def send_to_google_sheets(config: dict[str, Any], payload: dict[str, Any]) -> tuple[bool, str, Any]:
    endpoint = str(config.get("webhook_url", "")).strip()

    if not endpoint:
        return False, "Trūksta Google Sheets webhook URL.", {"message": "missing_webhook"}

    req = request.Request(
        endpoint,
        method="POST",
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        data=json.dumps(payload).encode("utf-8"),
    )

    try:
        with request.urlopen(req, timeout=config["timeout_seconds"]) as response:
            body = response.read().decode("utf-8")
            parsed = json.loads(body) if body else {}
            return True, "ok", parsed
    except error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="ignore")
        parsed: Any = {}
        if body:
            try:
                parsed = json.loads(body)
            except json.JSONDecodeError:
                parsed = {"message": body}
        return False, parse_google_sheets_error(parsed), parsed
    except Exception as exc:  # noqa: BLE001
        return False, str(exc), {"message": str(exc)}


def store_submission(payload: dict[str, Any], status: str, detail: str = "") -> None:
    SUBMISSIONS_DIR.mkdir(parents=True, exist_ok=True)
    record = {
        "receivedAt": datetime.now(timezone.utc).isoformat(),
        "status": status,
        "detail": detail,
        "payload": payload,
    }
    with SUBMISSIONS_PATH.open("a", encoding="utf-8") as submissions_file:
        submissions_file.write(json.dumps(record, ensure_ascii=False) + "\n")


class LazyFitHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, directory=str(ROOT_DIR), **kwargs)

    def do_POST(self) -> None:  # noqa: N802
        if self.path.rstrip("/") == "/api/unlock-exercises":
            self.handle_unlock_exercises()
            return

        self.send_json(HTTPStatus.NOT_FOUND, {"message": "Nerastas API kelias."})

    def handle_unlock_exercises(self) -> None:
        content_length = int(self.headers.get("Content-Length", "0"))

        try:
            raw_body = self.rfile.read(content_length) if content_length > 0 else b"{}"
            payload = json.loads(raw_body.decode("utf-8"))
        except Exception:  # noqa: BLE001
            self.send_json(HTTPStatus.BAD_REQUEST, {"message": "Nepavyko perskaityti formos duomenų."})
            return

        if not isinstance(payload, dict):
            self.send_json(HTTPStatus.BAD_REQUEST, {"message": "Gauti netinkami duomenys."})
            return

        email = str(payload.get("email", "")).strip()
        consent_marketing = bool(payload.get("consentMarketing"))

        if not EMAIL_PATTERN.match(email):
            self.send_json(HTTPStatus.BAD_REQUEST, {"message": "Įrašyk galiojantį el. pašto adresą."})
            return

        if not consent_marketing:
            self.send_json(
                HTTPStatus.BAD_REQUEST,
                {"message": "Pažymėk sutikimą, kad galėtum atrakinti pratimus."},
            )
            return

        config = load_google_sheets_config()
        webhook_url = str(config.get("webhook_url", "")).strip()

        if not webhook_url:
            store_submission(payload, "local_only", "Google Sheets webhook nenustatytas. Išsaugota lokaliai.")
            self.send_json(HTTPStatus.OK, {"ok": True, "storage": "local_only"})
            return

        ok, message, _response_payload = send_to_google_sheets(config, payload)

        if not ok:
            store_submission(payload, "local_fallback", f"Nepavyko išsiųsti į Google Sheets: {message}")
            print(f"[lazyfit] Google Sheets webhook klaida: {message}")
            self.send_json(
                HTTPStatus.OK,
                {
                    "ok": True,
                    "storage": "local_fallback",
                    "warning": f"Nepavyko išsiųsti į Google Sheets: {message}",
                },
            )
            return

        store_submission(payload, "google_sheets_success", "Išsiųsta į Google Sheets ir išsaugota lokaliai.")
        self.send_json(HTTPStatus.OK, {"ok": True, "storage": "google_sheets"})

    def send_json(self, status: HTTPStatus, payload: dict[str, Any]) -> None:
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status.value)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, format: str, *args: Any) -> None:  # noqa: A003
        sys.stdout.write(f"[lazyfit] {self.address_string()} - {format % args}\n")


def main() -> None:
    port = int(os.getenv("PORT", DEFAULT_PORT))
    server = ThreadingHTTPServer(("0.0.0.0", port), partial(LazyFitHandler))

    print("")
    print("LazyFit Body Check paleistas.")
    print(f"Atidaryk naršyklėje: http://localhost:{port}")
    if CONFIG_PATH.exists():
        print(f"Google Sheets config rasta: {CONFIG_PATH}")
    else:
        print(f"Google Sheets config nerasta. Susikurk: {ROOT_DIR / 'google-sheets.config.json'}")
    print(f"Lokalus backup failas: {SUBMISSIONS_PATH}")
    print("")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServeris sustabdytas.")


if __name__ == "__main__":
    main()
