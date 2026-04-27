#!/bin/zsh

cd /Users/airidasbutkus/Desktop/lazyfit-galutinis-body-check || exit 1

echo ""
echo "LazyFit Body Check paleistas."
echo "Atidaryk naršyklėje: http://localhost:8091"
echo ""

if lsof -nP -iTCP:8091 -sTCP:LISTEN >/dev/null 2>&1; then
  echo "8091 portas jau naudojamas. Uždaryk seną serverį ir paleisk komandą dar kartą."
  exit 1
fi

python3 server.py
