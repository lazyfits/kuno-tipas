import exercises from "./src/data/exercises.js?v=4";

const RESULT_SCORE_KEYS = [
  "narrowScore",
  "wideScore",
  "neutralScore",
  "rightBiasScore",
  "leftBiasScore",
  "asymmetryScore",
  "extensionWarning",
  "controlWarning",
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_STORAGE_KEY = "lazyfit_body_check_email_v2";
const EXERCISES_UNLOCKED_STORAGE_KEY = "lazyfit_body_check_exercises_unlocked_v2";
const GOOGLE_SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbz0HoEBUC_0RzMmfL6qomTNgaJ0uKf9At5v-L_VMuG01AccCTEZ96ekpHN98WON63lPsg/exec";
const QUESTIONS = [
  {
    id: "toe-touch",
    pose: "toe",
    imageSrc: "./assets/tests/pirstu_siekimas.png?v=2",
    title: "1. Pirštų pasiekimas prie žemės",
    summaryLabel: "pirštų pasiekimas",
    summaryEligible: true,
    instruction:
      "Atsistok tiesiai, kojos klubų plotyje, ir lėtai lenkis žemyn. Įvertink, kiek arti grindų nusileidžia rankos. Leisdamasis laikyk kelius pilnai ištiestus, nes jei jie pradės linkti, testo vaizdas gali būti netikslus.",
    answers: [
      {
        label: "Rankos šiek tiek žemiau nei keliai",
        note: "Rankos lieka gana aukštai, judesys trumpas.",
        insight:
          "Šitas testas rodo, kad lenkimosi metu kūnas gali rinktis trumpesnį kelią.",
        quality: 0,
        effects: { narrowScore: 2, extensionWarning: 1 },
      },
      {
        label: "Trūksta maždaug 1 delno",
        note: "Iki pilno pasiekimo lieka nedidelis tarpas.",
        insight:
          "Čia jau matosi kryptis, kad galinė grandinė dar neatsidaro iki galo.",
        quality: 1,
        effects: { narrowScore: 1 },
      },
      {
        label: "Paliečiu pirštus",
        note: "Pirštai pasiekia pėdas ar grindis, bet be aiškaus rezervo.",
        insight:
          "Lenkimosi bazė atrodo nebloga, bet rezervo dar nėra daug.",
        quality: 2,
        effects: { neutralScore: 1 },
      },
      {
        label: "Paliečiu delnais",
        note: "Judesys lengvas ir gana gilus.",
        insight:
          "Lankstumo čia netrūksta, svarbu išlaikyti ir ramų valdymą.",
        quality: 3,
        effects: { wideScore: 1, controlWarning: 1 },
      },
    ],
  },
  {
    id: "deep-squat",
    pose: "squat",
    imageSrc: "./assets/tests/gilus_pritupimas.png?v=5",
    title: "2. Gilus pritūpimas",
    summaryLabel: "gilus pritūpimas",
    summaryEligible: true,
    instruction:
      "Atsistok tiesiai, kojos klubų plotyje, ir lėtai tūpk žemyn. Stebėk, kad keliai ir pėdos neišeitų į šalis, o kulnai nekiltų. Kai tik norisi pakelti kulną arba išskėsti pėdas ar kelius, sustok ir pasirink tinkamiausią variantą.",
    answers: [
      {
        label: "Pilnas pritūpimas, iki pat žemės nepakeliant kulnų",
        note: "Galiu nusileisti iki galo nepakeldamas kulnų nuo žemės.",
        insight:
          "Pritūpime kūnas gana lengvai randa gylį.",
        quality: 3,
        effects: { narrowScore: 2 },
      },
      {
        label: "Pritūpiu šiek tiek žemiau nei 90°",
        note: "Nusileidžiu gana neblogai, bet iki pilno gylio dar trūksta.",
        insight:
          "Gylis jau visai neblogas, bet dar ne pilnas.",
        quality: 2,
        effects: { wideScore: 1 },
      },
      {
        label: "Pritūpiu iki 90 laipsnių",
        note: "Sustoju maždaug ties 90° ir giliau nebeeinu.",
        insight:
          "Čia jau matosi aiškesnis gylio ribojimas pritūpime.",
        quality: 1,
        effects: { wideScore: 2 },
      },
      {
        label: "Nepritūpiu iki 90 laipsnių, kyla kulnai, riečiasi nugara",
        note: "Judesiui pritrūksta gylio, o kūnas ima kompensuoti kulnais ar nugara.",
        insight:
          "Kai gylio neužtenka, kūnas pradeda ieškoti pagalbos per kulnus ar nugarą.",
        quality: 0,
        effects: { wideScore: 2, controlWarning: 2, extensionWarning: 1 },
      },
    ],
  },
  {
    id: "overhead-reach",
    pose: "overhead",
    imageSrc: "./assets/tests/rankos_virs_galvos.png",
    title: "3. Rankų kėlimas virš galvos",
    summaryLabel: "rankų kėlimas virš galvos",
    summaryEligible: true,
    instruction:
      "Atsistojus prie sienos kelk abi tiesias rankas aukštyn ir stebėk nugarą, kad neišsirietum.",
    answers: [
      {
        label: "Lengvai, be nugaros išrietimo",
        note: "Rankos kyla gana švariai ir be aiškios kompensacijos.",
        insight:
          "Viršutinė dalis čia juda gana laisvai.",
        quality: 3,
        effects: { narrowScore: 2 },
      },
      {
        label: "Yra lengvas nugaros išrietimas",
        note: "Rankos kyla, bet joms padeda nugara.",
        insight:
          "Rankos kyla, bet dalį darbo gali pasiimti nugara.",
        quality: 2,
        effects: { wideScore: 1, extensionWarning: 1 },
      },
      {
        label: "Sunku pilnai pakelti rankas",
        note: "Amplitudė mažesnė nei norėtųsi.",
        insight:
          "Čia labiau matosi amplitudės trūkumas.",
        quality: 1,
        effects: { wideScore: 2 },
      },
      {
        label: "Iškart kompensuoju",
        note: "Vos keliant rankas kūnas greitai ieško aplinkkelio.",
        insight:
          "Vos kylant rankoms kūnas iškart ieško greitesnio aplinkkelio.",
        quality: 0,
        effects: { wideScore: 2, extensionWarning: 2, controlWarning: 1 },
      },
    ],
  },
  {
    id: "trunk-rotation",
    pose: "rotation",
    imageSrc: "./assets/tests/sukimasis_per_liemeni.png",
    title: "4. Liemens rotacija",
    summaryLabel: "liemens rotacija",
    summaryEligible: true,
    instruction:
      "Sėdėdamas ar stovėdamas pasisuk į kairę ir į dešinę nekeliant bei nepasukant pėdų (pėdos turi būti lygiagrečios). Įvertink ar abi pusės jaučiasi panašiai.",
    answers: [
      {
        label: "Abi pusės panašios",
        note: "Sukimasis abiem kryptimis jaučiasi gana vienodas.",
        insight:
          "Rotacija abiem pusėmis atrodo gana tolygi.",
        quality: 3,
        effects: { neutralScore: 1 },
      },
      {
        label: "Sunkiau suktis į kairę",
        note: "Į kairę judesys trumpesnis arba mažiau laisvas.",
        insight:
          "Testai leidžia įtarti, kad kairė rotacijos pusė šiuo metu ribotesnė.",
        quality: 1,
        effects: { asymmetryScore: 2 },
        flags: { leftRotationLimited: true },
      },
      {
        label: "Sunkiau suktis į dešinę",
        note: "Į dešinę judesys trumpesnis arba mažiau laisvas.",
        insight:
          "Testai leidžia įtarti, kad dešinė rotacijos pusė šiuo metu ribotesnė.",
        quality: 1,
        effects: { asymmetryScore: 2 },
        flags: { rightRotationLimited: true },
      },
      {
        label: "Kompensuoju dubeniu ar pėdomis",
        note: "Sukimuisi padeda ne tik liemuo, bet ir apatinė dalis.",
        insight:
          "Sukantis kūnas gali ieškoti papildomo kelio per dubenį ar pėdas.",
        quality: 0,
        effects: { asymmetryScore: 1, controlWarning: 1 },
      },
    ],
  },
  {
    id: "single-leg-balance",
    pose: "balance",
    imageSrc: "./assets/tests/stovejimas_ant_vienos_kojos.png",
    title: "5. Balansas ant vienos kojos",
    summaryLabel: "balansas ant vienos kojos",
    summaryEligible: true,
    instruction:
      "Atsistok 20 sek. ant vienos kojos ir palygink abi puses. Svarbiausia ne laikas, o stabilumo pojūtis.",
    answers: [
      {
        label: "Stabilu abiem pusėm",
        note: "Abi pusės jaučiasi gana ramiai.",
        insight:
          "Balanso bazė atrodo gana stabili.",
        quality: 3,
        effects: { wideScore: 1, neutralScore: 1 },
      },
      {
        label: "Sunkiau stovėti ant kairės kojos",
        note: "Kairėje pusėje atrama jaučiasi mažiau stabili.",
        insight:
          "Testai leidžia įtarti, kad kairė atrama šiuo metu pasitiki mažiau.",
        quality: 1,
        effects: { asymmetryScore: 3, rightBiasScore: 2 },
        flags: { leftSupportLimited: true },
      },
      {
        label: "Sunkiau stovėti ant dešinės kojos",
        note: "Dešinėje pusėje atrama jaučiasi mažiau stabili.",
        insight:
          "Testai leidžia įtarti, kad dešinė atrama šiuo metu pasitiki mažiau.",
        quality: 1,
        effects: { asymmetryScore: 3, leftBiasScore: 2 },
        flags: { rightSupportLimited: true },
      },
      {
        label: "Nestabilu abiem pusėm",
        note: "Abiejose pusėse kūnas sunkiai išlaiko ramų balansą.",
        insight:
          "Čia labiau matosi bendros kontrolės klausimas, o ne tik vienos pusės skirtumas.",
        quality: 0,
        effects: { narrowScore: 1, controlWarning: 2 },
      },
    ],
  },
];

const POSE_SVGS = {
  hero: `
    <svg viewBox="0 0 240 240" class="pose-icon pose-icon--hero" aria-hidden="true">
      <circle class="pose-stroke" cx="120" cy="42" r="16"></circle>
      <line class="pose-stroke torso" x1="120" y1="58" x2="120" y2="118"></line>
      <line class="pose-stroke arm arm-left" x1="120" y1="78" x2="82" y2="58"></line>
      <line class="pose-stroke arm arm-right" x1="120" y1="78" x2="158" y2="58"></line>
      <line class="pose-stroke leg leg-left" x1="120" y1="118" x2="96" y2="178"></line>
      <line class="pose-stroke leg leg-right" x1="120" y1="118" x2="144" y2="178"></line>
      <path class="pose-ground" d="M62 192 H178"></path>
    </svg>
  `,
  toe: `
    <svg viewBox="0 0 240 240" class="pose-icon pose-icon--toe" aria-hidden="true">
      <circle class="pose-stroke" cx="124" cy="40" r="16"></circle>
      <line class="pose-stroke torso" x1="124" y1="56" x2="100" y2="116"></line>
      <line class="pose-stroke arm arm-left" x1="114" y1="82" x2="76" y2="128"></line>
      <line class="pose-stroke arm arm-right" x1="114" y1="82" x2="136" y2="136"></line>
      <line class="pose-stroke leg leg-left" x1="100" y1="116" x2="96" y2="184"></line>
      <line class="pose-stroke leg leg-right" x1="100" y1="116" x2="126" y2="180"></line>
      <path class="pose-ground" d="M68 192 H170"></path>
    </svg>
  `,
  squat: `
    <svg viewBox="0 0 240 240" class="pose-icon pose-icon--squat" aria-hidden="true">
      <circle class="pose-stroke" cx="120" cy="46" r="16"></circle>
      <line class="pose-stroke torso" x1="120" y1="62" x2="118" y2="112"></line>
      <line class="pose-stroke arm arm-left" x1="118" y1="84" x2="86" y2="104"></line>
      <line class="pose-stroke arm arm-right" x1="118" y1="84" x2="154" y2="100"></line>
      <line class="pose-stroke leg leg-left" x1="118" y1="112" x2="90" y2="138"></line>
      <line class="pose-stroke lower-leg lower-leg-left" x1="90" y1="138" x2="82" y2="184"></line>
      <line class="pose-stroke leg leg-right" x1="118" y1="112" x2="150" y2="138"></line>
      <line class="pose-stroke lower-leg lower-leg-right" x1="150" y1="138" x2="160" y2="184"></line>
      <path class="pose-ground" d="M64 192 H176"></path>
    </svg>
  `,
  overhead: `
    <svg viewBox="0 0 240 240" class="pose-icon pose-icon--overhead" aria-hidden="true">
      <circle class="pose-stroke" cx="120" cy="42" r="16"></circle>
      <line class="pose-stroke torso" x1="120" y1="58" x2="120" y2="122"></line>
      <line class="pose-stroke arm arm-left" x1="120" y1="82" x2="92" y2="24"></line>
      <line class="pose-stroke arm arm-right" x1="120" y1="82" x2="148" y2="24"></line>
      <line class="pose-stroke leg leg-left" x1="120" y1="122" x2="98" y2="182"></line>
      <line class="pose-stroke leg leg-right" x1="120" y1="122" x2="142" y2="182"></line>
      <path class="pose-ground" d="M72 192 H168"></path>
    </svg>
  `,
  rotation: `
    <svg viewBox="0 0 240 240" class="pose-icon pose-icon--rotation" aria-hidden="true">
      <circle class="pose-stroke" cx="120" cy="42" r="16"></circle>
      <line class="pose-stroke torso" x1="120" y1="58" x2="124" y2="122"></line>
      <line class="pose-stroke arm arm-left" x1="122" y1="82" x2="74" y2="70"></line>
      <line class="pose-stroke arm arm-right" x1="122" y1="82" x2="164" y2="102"></line>
      <line class="pose-stroke leg leg-left" x1="124" y1="122" x2="104" y2="182"></line>
      <line class="pose-stroke leg leg-right" x1="124" y1="122" x2="146" y2="182"></line>
      <path class="pose-ground" d="M74 192 H170"></path>
    </svg>
  `,
  balance: `
    <svg viewBox="0 0 240 240" class="pose-icon pose-icon--balance" aria-hidden="true">
      <circle class="pose-stroke" cx="120" cy="42" r="16"></circle>
      <line class="pose-stroke torso" x1="120" y1="58" x2="124" y2="120"></line>
      <line class="pose-stroke arm arm-left" x1="122" y1="82" x2="80" y2="94"></line>
      <line class="pose-stroke arm arm-right" x1="122" y1="82" x2="164" y2="74"></line>
      <line class="pose-stroke leg leg-left" x1="124" y1="120" x2="116" y2="184"></line>
      <line class="pose-stroke leg leg-right" x1="124" y1="120" x2="164" y2="150"></line>
      <path class="pose-ground" d="M80 192 H166"></path>
    </svg>
  `,
  isa: `
    <svg viewBox="0 0 240 240" class="pose-icon" aria-hidden="true">
      <circle class="pose-stroke" cx="120" cy="42" r="16"></circle>
      <line class="pose-stroke" x1="120" y1="58" x2="120" y2="128"></line>
      <line class="pose-stroke" x1="120" y1="74" x2="88" y2="98"></line>
      <line class="pose-stroke" x1="120" y1="74" x2="152" y2="98"></line>
      <line class="pose-stroke" x1="104" y1="110" x2="86" y2="144"></line>
      <line class="pose-stroke" x1="136" y1="110" x2="154" y2="144"></line>
      <path class="pose-ground" d="M82 154 L120 126 L158 154"></path>
      <path class="pose-ground" d="M72 192 H168"></path>
    </svg>
  `,
};

const state = {
  step: "start",
  currentQuestion: 0,
  answers: [],
  ctaMessage: "",
  isTransitioning: false,
  pendingAnswerIndex: null,
  emailValue: "",
  emailError: "",
  unlockConsentMarketing: false,
  unlockConsentError: "",
  unlockSubmitting: false,
  emailSubmitted: false,
  exercisesUnlocked: false,
  unlockModalOpen: false,
  unlockMessage: "",
  consultationSubmitting: false,
  consultationInterest: "",
  consultationMessage: "",
  shouldScrollToExercises: false,
  shouldFocusUnlockInput: false,
  unlockPromptOpen: false,
  unlockPromptDismissed: false,
};

let insightTimerId = null;
let unlockPromptTimerId = null;

const appCard = document.querySelector("#appCard");
const screenContainer = document.querySelector("#screenContainer");
const progressShell = document.querySelector("#progressShell");
const progressText = document.querySelector("#progressText");
const progressHint = document.querySelector("#progressHint");
const progressFill = document.querySelector("#progressFill");
const restartButton = document.querySelector("#restartButton");

function isMobileViewport() {
  return window.matchMedia("(max-width: 759px)").matches;
}

function scrollPageToTop() {
  try {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (_error) {
    window.scrollTo(0, 0);
  }

  if (document.documentElement) {
    document.documentElement.scrollTop = 0;
  }

  if (document.body) {
    document.body.scrollTop = 0;
  }
}

function openUnlockModal() {
  state.unlockPromptOpen = false;
  state.unlockModalOpen = true;
  state.emailError = "";
  state.unlockConsentError = "";
  state.unlockSubmitting = false;
  state.shouldFocusUnlockInput = true;
  render();
}

function readStorageValue(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (_error) {
    return null;
  }
}

function writeStorageValue(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (_error) {
    return false;
  }

  return true;
}

function clearStorageValue(key) {
  try {
    window.localStorage.removeItem(key);
  } catch (_error) {
    return false;
  }

  return true;
}

function syncStoredUnlockState() {
  const storedEmail = readStorageValue(EMAIL_STORAGE_KEY);
  const storedUnlocked = readStorageValue(EXERCISES_UNLOCKED_STORAGE_KEY) === "true";

  if (storedEmail) {
    state.emailValue = storedEmail;
  }

  state.exercisesUnlocked = storedUnlocked;
}

function createEmptyResultScores() {
  return {
    narrowScore: 0,
    wideScore: 0,
    neutralScore: 0,
    rightBiasScore: 0,
    leftBiasScore: 0,
    asymmetryScore: 0,
    extensionWarning: 0,
    controlWarning: 0,
    leftSupportLimited: false,
    rightSupportLimited: false,
    leftRotationLimited: false,
    rightRotationLimited: false,
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function upperFirst(value) {
  const text = String(value ?? "").trim();

  if (!text) {
    return "";
  }

  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function clearInsightTimer() {
  if (insightTimerId) {
    window.clearTimeout(insightTimerId);
    insightTimerId = null;
  }
}

function clearUnlockPromptTimer() {
  if (unlockPromptTimerId) {
    window.clearTimeout(unlockPromptTimerId);
    unlockPromptTimerId = null;
  }
}

function calculateResultScores() {
  const totals = state.answers.reduce((currentTotals, answerIndex, questionIndex) => {
    const answer = QUESTIONS[questionIndex]?.answers?.[answerIndex];

    if (!answer) {
      return currentTotals;
    }

    RESULT_SCORE_KEYS.forEach((key) => {
      currentTotals[key] += answer.effects[key] || 0;
    });

    Object.entries(answer.flags || {}).forEach(([key, value]) => {
      if (value) {
        currentTotals[key] = true;
      }
    });

    return currentTotals;
  }, createEmptyResultScores());

  if (totals.leftSupportLimited && totals.rightRotationLimited) {
    totals.rightBiasScore += 3;
  }

  if (totals.rightSupportLimited && totals.leftRotationLimited) {
    totals.leftBiasScore += 3;
  }

  return totals;
}

function createBodyType(scores) {
  if (
    scores.narrowScore >= scores.wideScore + 3 &&
    scores.narrowScore >= scores.neutralScore
  ) {
    return {
      key: "narrow",
      name: "Labiau primena siauresnį tipą",
      shortLabel: "Siauresnis",
      explanation:
        "Tavo testai labiau primena siauresnį tipą. Tai nėra diagnozė, tik kryptis, kurią leidžia įtarti atsakymai.",
    };
  }

  if (
    scores.wideScore >= scores.narrowScore + 3 &&
    scores.wideScore >= scores.neutralScore
  ) {
    return {
      key: "wide",
      name: "Labiau primena platesnį tipą",
      shortLabel: "Platesnis",
      explanation:
        "Tavo testai labiau primena platesnį tipą. Tai nėra diagnozė, tik kryptis, kurią leidžia įtarti atsakymai.",
    };
  }

  return {
    key: "mixed",
    name: "Labiau primena mišrų tipą",
    shortLabel: "Mišrus",
    explanation:
      "Tavo testai labiau primena mišrų tipą. Tai nėra diagnozė, tik kryptis, kurią leidžia įtarti atsakymai.",
  };
}

function createPelvisLoadProfile(scores) {
  if (scores.rightBiasScore > scores.leftBiasScore + 2) {
    return {
      key: "right_dominant",
      name: "Labiau primena dešinės pusės dominavimą",
      shortLabel: "Daugiau į dešinę",
      explanation:
        "Testai gali rodyti, kad atrama ir apkrova dažniau krypsta į dešinę pusę.",
    };
  }

  if (scores.leftBiasScore > scores.rightBiasScore + 2) {
    return {
      key: "left_dominant",
      name: "Labiau primena kairės pusės dominavimą",
      shortLabel: "Daugiau į kairę",
      explanation:
        "Testai gali rodyti, kad atrama ir apkrova dažniau krypsta į kairę pusę.",
    };
  }

  return {
    key: "balanced",
    name: "Labiau primena subalansuotą apkrovą",
    shortLabel: "Subalansuota",
    explanation:
      "Ryškaus vienos pusės dominavimo testai nerodo, todėl apkrova labiau primena balansą.",
  };
}

function createExerciseCategory(bodyTypeKey) {
  if (bodyTypeKey === "narrow") {
    return {
      key: "stability_control",
      name: "Stabilumo ir kontrolės kryptis",
      shortLabel: "Stabilumas",
      explanation:
        "Pagal šią kryptį pradžiai labiau tiktų stabilumo ir kontrolės tipo pratimai.",
    };
  }

  if (bodyTypeKey === "wide") {
    return {
      key: "mobility_expansion",
      name: "Mobilumo ir atsivėrimo kryptis",
      shortLabel: "Mobilumas",
      explanation:
        "Pagal šią kryptį pradžiai labiau tiktų mobilumo ir atsivėrimo tipo pratimai.",
    };
  }

  return {
    key: "balanced_foundation",
    name: "Subalansuoto pagrindo kryptis",
    shortLabel: "Pagrindas",
    explanation:
      "Pagal šią kryptį pradžiai labiau tiktų subalansuoto pagrindo pratimai.",
  };
}

function createSideSpecificModifier(pelvisLoadProfileKey) {
  if (pelvisLoadProfileKey === "right_dominant") {
    return {
      key: "left_stance_control",
      label: "Kairės atramos kontrolė",
      badgeLabel: "Kairė atrama",
      summary:
        "Papildomai gali būti verta pridėti daugiau kairės atramos kontrolės.",
      tipTitle: "Pridėk kairės atramos darbą",
      tipBody:
        "Rinkis pratimus, kuriuose daugiau ramaus svorio ir kontrolės tenka kairei kojai.",
    };
  }

  if (pelvisLoadProfileKey === "left_dominant") {
    return {
      key: "right_stance_control",
      label: "Dešinės atramos kontrolė",
      badgeLabel: "Dešinė atrama",
      summary:
        "Papildomai gali būti verta pridėti daugiau dešinės atramos kontrolės.",
      tipTitle: "Pridėk dešinės atramos darbą",
      tipBody:
        "Rinkis pratimus, kuriuose daugiau ramaus svorio ir kontrolės tenka dešinei kojai.",
    };
  }

  return null;
}

function getMovementEntries() {
  return QUESTIONS.map((question, questionIndex) => {
    const answerIndex = state.answers[questionIndex];
    const answer = question.answers[answerIndex];

    return {
      question,
      answer,
    };
  }).filter((entry) => entry.question.summaryEligible && entry.answer);
}

function createProfileSummary(
  bodyType,
  pelvisLoadProfile,
  exerciseCategory,
  sideSpecificModifier,
) {
  if (bodyType.key === "wide") {
    return "Tai nereiškia, kad kažkas blogai. Tiesiog vieni judesiai tau seksis lengviau, o kiti prašys daugiau mobilumo.";
  }

  if (bodyType.key === "narrow") {
    return "Tai nereiškia, kad kažkas blogai. Tiesiog vieni judesiai tau seksis lengviau, o kiti prašys daugiau stabilumo.";
  }

  return "Tai visiškai normalu – tavo kūnas turi abiejų tipų savybių.";
}

function createCompensationText(scores, bodyTypeKey, pelvisLoadProfileKey) {
  if (pelvisLoadProfileKey === "right_dominant") {
    return "Testai leidžia įtarti, kad dalyje judesių kūnas gali labiau remtis dešine puse, o kairė atrama gali atsilikti.";
  }

  if (pelvisLoadProfileKey === "left_dominant") {
    return "Testai leidžia įtarti, kad dalyje judesių kūnas gali labiau remtis kaire puse, o dešinė atrama gali atsilikti.";
  }

  if (scores.extensionWarning >= 2) {
    return "Kai kuriuose judesiuose kūnas gali ieškoti papildomo kelio per nugarą, kai viršuje trūksta laisvesnio atsivėrimo.";
  }

  if (scores.controlWarning >= 2) {
    return "Kai kuriuose testuose kūnas gali skubėti į lengvesnę atramą ar amplitudę vietoje ramesnės kontrolės.";
  }

  if (scores.asymmetryScore >= 2) {
    return "Testai gali rodyti skirtumą tarp pusių, net jei aiški vienos pusės dominavimo kryptis nesusidaro.";
  }

  if (bodyTypeKey === "wide") {
    return "Kai reikia daugiau amplitudės, kūnas gali greičiau ieškoti papildomo judesio per liemenį ar balansą.";
  }

  if (bodyTypeKey === "narrow") {
    return "Kai kuriuose judesiuose kūnas gali rinktis kompaktiškesnį kelią vietoje laisvesnio atsivėrimo.";
  }

  return "Ryškios vienos kompensacijos testai nerodo, bet kūno strategija vis tiek gali keistis pagal tempą ar nuovargį.";
}

function createBulletInsights(scores, bodyTypeKey, pelvisLoadProfileKey) {
  const entries = getMovementEntries();

  if (!entries.length) {
    return [
      {
        label: "Kas lengviau",
        body: "Šiuo metu dar trūksta atsakymų, kad matytųsi aiškesnis lengvesnis judesys.",
      },
      {
        label: "Kas sunkiau",
        body: "Kai užpildysi visą testą, čia matysis judesys, kuriam reikia daugiausia dėmesio.",
      },
      {
        label: "Galimos kompensacijos",
        body: "Kompensacijos bus aiškesnės, kai turėsime visų testų atsakymus.",
      },
    ];
  }

  const easiest = [...entries].sort(
    (first, second) => (second.answer.quality || 0) - (first.answer.quality || 0),
  )[0];

  const hardest = [...entries].sort(
    (first, second) => (first.answer.quality || 0) - (second.answer.quality || 0),
  )[0];

  return [
    {
      label: "Kas lengviau",
      body: `Iš testo dalių santykinai lengviau atrodo ${easiest.question.summaryLabel}. ${easiest.answer.insight}`,
    },
    {
      label: "Kas sunkiau",
      body: `Daugiausia dėmesio dabar prašo ${hardest.question.summaryLabel}. ${hardest.answer.insight}`,
    },
    {
      label: "Galimos kompensacijos",
      body: createCompensationText(scores, bodyTypeKey, pelvisLoadProfileKey),
    },
  ];
}

function createLifeMeaning(bodyTypeKey, pelvisLoadProfileKey, scores) {
  if (pelvisLoadProfileKey === "right_dominant" || pelvisLoadProfileKey === "left_dominant") {
    return "Kasdien tai gali rodyti, kad viena pusė dažniau perima darbą, todėl gali atsirasti diskomfortas arba progresas tampa mažiau tolygus.";
  }

  if (scores.extensionWarning >= 2 || scores.controlWarning >= 2) {
    return "Kai kuriuose judesiuose tai gali kelti diskomfortą arba riboti progresą, ypač kai norisi daugiau gylio, tempo ar jėgos.";
  }

  if (bodyTypeKey === "narrow") {
    return "Kasdien tai gali rodyti daugiau standumo lenkiantis, pritūpiant ar keliant rankas, ir tai gali riboti progresą.";
  }

  if (bodyTypeKey === "wide") {
    return "Kasdien tai gali rodyti, kad amplitudė atsiranda lengviau nei ramus valdymas, todėl progresas gali būti mažiau stabilus.";
  }

  return "Kasdien tai gali reikšti, kad vieni judesiai atrodo lengvesni, o kituose reikia daugiau pagrindo ir kontrolės.";
}

function createTips(exerciseCategoryKey, scores, sideSpecificModifier) {
  const tips = [];

  if (exerciseCategoryKey === "stability_control") {
    tips.push({
      title: "Rinkis stabilumo ir kontrolės pratimus",
      body: "Pradžiai geriau tinka lėtesni pratimai su trumpu sustojimu, kad kūnas rastų ramesnę atramą.",
    });
  }

  if (exerciseCategoryKey === "mobility_expansion") {
    tips.push({
      title: "Rinkis mobilumo ir atsivėrimo darbą",
      body: "Pradžiai labiau tinka pratimai, kurie atveria krūtinę, šonkaulius ar klubus prieš sudėtingesnę jėgą.",
    });
  }

  if (exerciseCategoryKey === "balanced_foundation") {
    tips.push({
      title: "Kurti subalansuotą pagrindą",
      body: "Po vieną mobilumo ir vieną kontrolės pratimą dažnai duoda aiškesnį startą nei daug skirtingų užduočių vienu metu.",
    });
  }

  if (sideSpecificModifier) {
    tips.push({
      title: sideSpecificModifier.tipTitle,
      body: sideSpecificModifier.tipBody,
    });
  } else if (scores.controlWarning >= 2) {
    tips.push({
      title: "Lėtink tempą ir ieškok atramos",
      body: "Jei kūnas skuba į lengvesnį variantą, lėtesnis tempas dažnai padeda geriau pajusti tikrą kontrolę.",
    });
  } else if (scores.extensionWarning >= 2) {
    tips.push({
      title: "Neieškok judesio vien per nugarą",
      body: "Jei amplitudė atsiranda tik per nugarą, mažesnis ir švaresnis judesys dažnai duoda daugiau nei didesnis kompensuojamas.",
    });
  } else {
    tips.push({
      title: "Pakartok testą po apšilimo",
      body: "Kelios minutės ramaus apšilimo dažnai padeda atskirti momentinį standumą nuo pastovesnės judesio krypties.",
    });
  }

  return tips.slice(0, 2);
}

function createVisualFocus(scores, sideSpecificModifier) {
  if (sideSpecificModifier) {
    return sideSpecificModifier.badgeLabel;
  }

  if (scores.controlWarning >= 2) {
    return "Kontrolė";
  }

  if (scores.extensionWarning >= 2) {
    return "Atsivėrimas";
  }

  if (scores.asymmetryScore >= 2) {
    return "Pusių skirtumas";
  }

  return "Tolygumas";
}

function createVisualNote(scores, bodyTypeKey, pelvisLoadProfileKey, sideSpecificModifier) {
  if (sideSpecificModifier?.key === "left_stance_control") {
    return "Papildomas fokusas dabar gali būti kairės atramos kontrolė ir ramesnis svorio perkėlimas.";
  }

  if (sideSpecificModifier?.key === "right_stance_control") {
    return "Papildomas fokusas dabar gali būti dešinės atramos kontrolė ir ramesnis svorio perkėlimas.";
  }

  if (scores.extensionWarning >= 2) {
    return "Testai leidžia įtarti, kad verta ieškoti laisvesnio atsivėrimo be papildomos nugaros kompensacijos.";
  }

  if (scores.controlWarning >= 2) {
    return "Testai leidžia įtarti, kad verta pradėti nuo ramesnės kontrolės prieš didesnę amplitudę ar tempą.";
  }

  if (pelvisLoadProfileKey === "balanced" && bodyTypeKey === "mixed") {
    return "Didžiausia kryptis dabar labiau primena mišrų profilį, todėl geriausiai tiktų ramus ir subalansuotas startas.";
  }

  return "Didžiausia kryptis dabar labiau matosi tavo bendrame judesio profilyje, o ne viename atskirame teste.";
}

function roundPercent(value) {
  return Math.round(value);
}

function createBodyTypePercentages(scores) {
  const total = scores.wideScore + scores.narrowScore;

  if (total <= 0) {
    return {
      widePercent: 50,
      narrowPercent: 50,
    };
  }

  const rawPercents = {
    widePercent: (scores.wideScore / total) * 100,
    narrowPercent: (scores.narrowScore / total) * 100,
  };

  const roundedPercents = {
    widePercent: roundPercent(rawPercents.widePercent),
    narrowPercent: roundPercent(rawPercents.narrowPercent),
  };

  const roundedSum = roundedPercents.widePercent + roundedPercents.narrowPercent;

  if (roundedSum !== 100) {
    const largestKey = Object.entries(rawPercents).sort((first, second) => second[1] - first[1])[0]?.[0];

    if (largestKey) {
      roundedPercents[largestKey] = clamp(
        roundedPercents[largestKey] + (100 - roundedSum),
        0,
        100,
      );
    }
  }

  return roundedPercents;
}

function createBodyTypeBreakdown(percentages) {
  return [
    {
      key: "wide",
      label: "Platesnis tipas",
      traitLabel: "Platesnio tipo bruožai",
      percent: percentages.widePercent,
    },
    {
      key: "narrow",
      label: "Siauresnis tipas",
      traitLabel: "Siauresnio tipo bruožai",
      percent: percentages.narrowPercent,
    },
  ].sort((first, second) => second.percent - first.percent);
}

function createDisplayedBodyType(rawBodyType, dominantType, percentages) {
  const dominantPercent = dominantType?.percent || 0;
  const spread = Math.abs(percentages.widePercent - percentages.narrowPercent);

  if (spread <= 20 || (dominantPercent >= 40 && dominantPercent <= 60)) {
    return {
      key: "mixed",
      name: "Ir siauresnio, ir platesnio tipo bruožai",
      shortLabel: "Mišrus",
      explanation:
        "Pagal testą pas tave matosi tiek siauresnio, tiek platesnio šonkaulių tipo bruožų.",
      percent: dominantPercent,
    };
  }

  if (dominantType?.key === "wide") {
    return {
      key: "wide",
      name: "Platesnis tipas",
      shortLabel: "Platesnis",
      explanation:
        "Pagal testą labiau panašu, kad turi platesnį šonkaulių lanką.",
      percent: dominantPercent,
    };
  }

  return {
    key: "narrow",
    name: "Siauresnis tipas",
    shortLabel: "Siauresnis",
    explanation:
      "Pagal testą labiau panašu į siauresnį šonkaulių tipą.",
    percent: dominantPercent,
  };
}

function createBodyTypeMeaning(bodyTypeKey) {
  if (bodyTypeKey === "wide") {
    return [
      "Tau gali labiau trūkti mobilumo nei stabilumo.",
      "Gali būti sunku atlikti pritūpimą ir veiksmus, kur keli rankas į viršų.",
      "Tačiau lengviau atliksi traukos ir klubo atvedimo atgal veiksmus (kaip RDL, deadlift).",
    ];
  }

  if (bodyTypeKey === "narrow") {
    return [
      "Tau gali labiau trūkti stabilumo.",
      "Gali būti sunkesni traukos judesiai ir klubo davimo atgal veiksmas.",
      "Dažniausiai lengviau seksis pritūpimo judesiai ir rankų kėlimas virš galvos.",
    ];
  }

  return [
    "Pas tave matosi ir siauresnio, ir platesnio tipo bruožų.",
    "Vieni judesiai gali eiti lengviau, o kituose gali trūkti stabilumo ar mobilumo.",
    "Pradžiai geriausia eiti nuo paprasto ir subalansuoto pagrindo.",
  ];
}

function createLoadProfileDetails(scores, pelvisLoadProfile) {
  const logicPoints = [];
  const hasSupportAsymmetry = scores.leftSupportLimited || scores.rightSupportLimited;
  const hasRotationAsymmetry = scores.leftRotationLimited || scores.rightRotationLimited;
  const pelvisDirection = scores.leftRotationLimited
    ? "left"
    : scores.rightRotationLimited
      ? "right"
      : scores.rightSupportLimited
        ? "left"
        : scores.leftSupportLimited
          ? "right"
          : null;

  if (scores.leftSupportLimited) {
    logicPoints.push("Balanse sunkiau stovėti ant kairės kojos.");
  }

  if (scores.rightSupportLimited) {
    logicPoints.push("Balanse sunkiau stovėti ant dešinės kojos.");
  }

  if (scores.leftRotationLimited) {
    logicPoints.push("Rotacija į kairę pusę mažesnė.");
  }

  if (scores.rightRotationLimited) {
    logicPoints.push("Rotacija į dešinę pusę mažesnė.");
  }

  if (!logicPoints.length) {
    logicPoints.push("Vienos kojos balanse ir atliekant rotacijos testą aiškaus skirtumo tarp pusių nesimato.");
  }

  if (pelvisDirection === "left") {
    return {
      title: "Tikėtina, kad dubuo labiau pasisukęs į kairę",
      summary:
        "Tai labiausiai matosi iš rotacijos ir atramos testų tarp kūno pusių.",
      showLogicPoints: true,
      logicPoints,
    };
  }

  if (pelvisDirection === "right") {
    return {
      title: "Tikėtina, kad dubuo labiau pasisukęs į dešinę",
      summary:
        "Tai labiausiai matosi iš rotacijos ir atramos testų tarp kūno pusių.",
      showLogicPoints: true,
      logicPoints,
    };
  }

  if (hasSupportAsymmetry || hasRotationAsymmetry) {
    return {
      title: "Tarp pusių matosi skirtumas",
      summary:
        "Testai rodo, kad tarp pusių dar yra skirtumas: viena pusė gali prasčiau laikyti atramą arba suktis mažiau.",
      showLogicPoints: true,
      logicPoints,
    };
  }

  return {
    title: "Tolygiai per abi puses",
    summary:
      "Testas rodo, kad svorį dedi tolygiai ir jo nepermeti tik į vieną kūno pusę.",
    showLogicPoints: false,
    logicPoints,
  };
}

function createActionPlan(bodyTypeKey, pelvisLoadProfileKey) {
  const exerciseCategory = createExerciseCategory(bodyTypeKey);
  const matchedCategoryExercises = exercises.filter(
    (exercise) => exercise.category === exerciseCategory.key,
  );
  const categoryExercises = matchedCategoryExercises.length ? matchedCategoryExercises : exercises;
  const selectedExercises = categoryExercises
    .slice(0, 3)
    .map((exercise, index) => ({
      kind: String(index + 1),
      name: exercise.name,
      benefit: exercise.shortDescription,
      dosage: exercise.setsReps,
      videoUrl: exercise.videoUrl,
      previewImage: exercise.previewImage,
    }));

  return {
    explanation:
      "Pagal testus matosi, kad tavo kūnui trūksta šių judesių, todėl šie pratimai ir yra prioritetas.",
    exercises: selectedExercises,
    asymmetryBlock: createAsymmetryExerciseBlock(),
  };
}

function getAnswerIndexByQuestionId(questionId) {
  const questionIndex = QUESTIONS.findIndex((question) => question.id === questionId);

  if (questionIndex === -1) {
    return null;
  }

  return state.answers[questionIndex] ?? null;
}

function getAsymmetryRestrictions() {
  const rotationAnswerIndex = getAnswerIndexByQuestionId("trunk-rotation");
  const singleLegAnswerIndex = getAnswerIndexByQuestionId("single-leg-balance");

  let rotationRestriction = "none";
  if (rotationAnswerIndex === 1) {
    rotationRestriction = "left";
  } else if (rotationAnswerIndex === 2) {
    rotationRestriction = "right";
  } else if (rotationAnswerIndex === 3) {
    rotationRestriction = "compensation";
  }

  let singleLegRestriction = "none";
  if (singleLegAnswerIndex === 1) {
    singleLegRestriction = "left";
  } else if (singleLegAnswerIndex === 2) {
    singleLegRestriction = "right";
  } else if (singleLegAnswerIndex === 3) {
    singleLegRestriction = "both";
  }

  return {
    rotationRestriction,
    singleLegRestriction,
  };
}

function createFallbackAsymmetryExercise(id, name) {
  return {
    id,
    name,
    shortDescription:
      "Gali padėti geriau jausti atramą ir lavinti dubens bei liemens kontrolę abiejose pusėse.",
    setsReps: "2×8",
    videoUrl: "#",
    previewImage: "./assets/tests/stovejimas_ant_vienos_kojos.png",
  };
}

function createAsymmetryExerciseBlock() {
  const { rotationRestriction, singleLegRestriction } = getAsymmetryRestrictions();

  let asymmetryDirection = null;

  if (rotationRestriction === "right") {
    asymmetryDirection = "right";
  } else if (rotationRestriction === "left") {
    asymmetryDirection = "left";
  } else if (singleLegRestriction === "left") {
    asymmetryDirection = "right";
  } else if (singleLegRestriction === "right") {
    asymmetryDirection = "left";
  }

  if (!asymmetryDirection) {
    return null;
  }

  const frontFootElevatedExercise =
    exercises.find((exercise) => exercise.id === "front-foot-elevated-lunge") ||
    createFallbackAsymmetryExercise(
      "front-foot-elevated-lunge",
      "Įtūpstas pakelta priekinė koja",
    );
  const rearFootElevatedExercise =
    exercises.find((exercise) => exercise.id === "rear-foot-elevated-lunge") ||
    createFallbackAsymmetryExercise(
      "rear-foot-elevated-lunge",
      "Įtūpstas pakelta galinė koja",
    );

  if (asymmetryDirection === "right") {
    return {
      title: "4 pratimas pagal tavo asimetriją",
      explanation:
        "Kadangi testuose matosi ribojimas į dešinę arba sunkesnė kairės kojos atrama, šį papildomą darbą atlik su hanteliu dešinėje rankoje. Tai tas pats 4 pratimas, tik apačioje matai abi jo puses atskirai.",
      exercises: [
        {
          kind: "4A",
          name: "Kai priekyje dešinė koja",
          benefit: frontFootElevatedExercise.shortDescription,
          dosage: frontFootElevatedExercise.setsReps,
          videoUrl: frontFootElevatedExercise.videoUrl,
          previewImage: frontFootElevatedExercise.previewImage,
          instructionText:
            "Dešinė koja priekyje ant pakylos. Hantelį laikyk dešinėje rankoje.",
        },
        {
          kind: "4B",
          name: "Kai priekyje kairė koja",
          benefit: rearFootElevatedExercise.shortDescription,
          dosage: rearFootElevatedExercise.setsReps,
          videoUrl: rearFootElevatedExercise.videoUrl,
          previewImage: rearFootElevatedExercise.previewImage,
          instructionText:
            "Kairė koja priekyje, galinė koja pakelta. Hantelį laikyk dešinėje rankoje.",
        },
      ],
    };
  }

  return {
    title: "4 pratimas pagal tavo asimetriją",
    explanation:
      "Kadangi testuose matosi ribojimas į kairę arba sunkesnė dešinės kojos atrama, šį papildomą darbą atlik su hanteliu kairėje rankoje. Tai tas pats 4 pratimas, tik apačioje matai abi jo puses atskirai.",
    exercises: [
      {
        kind: "4A",
        name: "Kai priekyje kairė koja",
        benefit: frontFootElevatedExercise.shortDescription,
        dosage: frontFootElevatedExercise.setsReps,
        videoUrl: frontFootElevatedExercise.videoUrl,
        previewImage: frontFootElevatedExercise.previewImage,
        instructionText:
          "Kairė koja priekyje ant pakylos. Hantelį laikyk kairėje rankoje.",
      },
      {
        kind: "4B",
        name: "Kai priekyje dešinė koja",
        benefit: rearFootElevatedExercise.shortDescription,
        dosage: rearFootElevatedExercise.setsReps,
        videoUrl: rearFootElevatedExercise.videoUrl,
        previewImage: rearFootElevatedExercise.previewImage,
        instructionText:
          "Dešinė koja priekyje, galinė koja pakelta. Hantelį laikyk kairėje rankoje.",
      },
    ],
  };
}

function resultData() {
  const rawScores = calculateResultScores();
  const scoredBodyType = createBodyType(rawScores);
  const pelvisLoadProfile = createPelvisLoadProfile(rawScores);
  const bodyTypePercentages = createBodyTypePercentages(rawScores);
  const { widePercent, narrowPercent } = bodyTypePercentages;
  const bodyTypeBreakdown = createBodyTypeBreakdown(bodyTypePercentages);
  const dominantType = bodyTypeBreakdown[0];
  const secondaryType = bodyTypeBreakdown[1];
  const bodyType = createDisplayedBodyType(scoredBodyType, dominantType, bodyTypePercentages);
  const exerciseCategory = createExerciseCategory(bodyType.key);
  const sideSpecificModifier = createSideSpecificModifier(pelvisLoadProfile.key);
  const loadProfileDetails = createLoadProfileDetails(rawScores, pelvisLoadProfile);
  const actionPlan = createActionPlan(bodyType.key, pelvisLoadProfile.key);

  return {
    rawScores,
    scoredBodyType,
    bodyType,
    pelvisLoadProfile,
    exerciseCategory,
    sideSpecificModifier,
    bodyTypePercentages,
    widePercent,
    narrowPercent,
    bodyTypeBreakdown,
    dominantType,
    secondaryType,
    bodyTypeMeaning: createBodyTypeMeaning(bodyType.key),
    loadProfileDetails,
    actionPlan,
    profile: {
      name: bodyType.name,
      explanation: bodyType.explanation,
    },
    profileSummary: createProfileSummary(
      bodyType,
      pelvisLoadProfile,
      exerciseCategory,
      sideSpecificModifier,
    ),
    bulletInsights: createBulletInsights(rawScores, bodyType.key, pelvisLoadProfile.key),
    lifeMeaning: createLifeMeaning(bodyType.key, pelvisLoadProfile.key, rawScores),
    tips: createTips(exerciseCategory.key, rawScores, sideSpecificModifier),
    visualFocus: createVisualFocus(rawScores, sideSpecificModifier),
    visualNote: createVisualNote(
      rawScores,
      bodyType.key,
      pelvisLoadProfile.key,
      sideSpecificModifier,
    ),
  };
}

function renderStartScreen() {
  return `
    <section class="screen screen--start">
      <div class="hero-scene">
        <div class="hero-bloom hero-bloom--one"></div>
        <div class="hero-bloom hero-bloom--two"></div>
        <div class="hero-bloom hero-bloom--three"></div>

        <div class="hero-logo-stage">
          <picture class="hero-logo-picture">
            <source srcset="./assets/lazyfit-logo-transparent.webp" type="image/webp" />
            <img class="hero-logo-image" src="./assets/lazyfit-logo-transparent.png" alt="LazyFit logo" width="1800" height="1500" />
          </picture>
        </div>

        <div class="screen-copy start-copy hero-copy">
          <span class="section-tag">2 min. savikontrolė</span>
          <h1>Per 2 min. sužinok, kas iš tikrųjų riboja tavo kūno judėjimą</h1>
          <p class="screen-lead">
            Per ${QUESTIONS.length} trumpus žingsnius sužinosi, kur stringa tavo kūnas,
            ir gausi aiškius pratimus, kurie padės tai išspręsti.
          </p>

          <div class="chip-row">
            <span class="info-chip">✔ Užtruksi mažiau nei 2 min</span>
            <span class="info-chip">✔ Jokios įrangos</span>
            <span class="info-chip">✔ Rezultatą gausi iškart</span>
          </div>

          <div class="screen-actions">
            <button class="primary-button" type="button" data-action="start">Pradėti testą</button>
          </div>

          <p class="support-note">
            Tai edukacinis savęs įsivertinimas. Jei judesio metu jauti skausmą, testo netęsk.
          </p>
        </div>
      </div>
    </section>
  `;
}

function renderQuestionScreen() {
  const question = QUESTIONS[state.currentQuestion];
  const questionVisualMarkup = `
    ${renderQuestionVisual(question)}
    <p class="visual-note">
      Judesį atlik lėtai, neskubant
    </p>
  `;

  const answersMarkup = question.answers
    .map((answer, index) => {
      return `
        <button
          class="answer-button"
          type="button"
          data-action="answer"
          data-answer-index="${index}"
        >
          <span class="answer-title">${escapeHtml(answer.label)}</span>
          <span class="answer-note">${escapeHtml(answer.note)}</span>
        </button>
      `;
    })
    .join("");

  return `
    <section class="screen screen--question">
      <div class="screen-copy">
        <div class="visual-panel visual-panel--mobile">
          ${questionVisualMarkup}
        </div>

        <div class="question-head">
          <div class="question-kicker">
            <span class="section-tag">Testas ${state.currentQuestion + 1} iš ${QUESTIONS.length}</span>
            ${
              state.currentQuestion > 0
                ? '<button class="ghost-button" type="button" data-action="back">Atgal</button>'
                : ""
            }
          </div>

          <h1>${escapeHtml(question.title)}</h1>
          <p class="screen-lead">${escapeHtml(question.instruction)}</p>
        </div>

        <div class="question-hint">
          Pasirink variantą, kuris labiausiai atitinka tavo situaciją šiandien. Kuo tiksliau
          atsakysi, tuo aiškesnę kryptį parodys rezultatas.
        </div>

        <div class="answers-grid">${answersMarkup}</div>
      </div>

      <aside class="visual-panel visual-panel--desktop">
        ${questionVisualMarkup}
      </aside>
    </section>
  `;
}

function renderInsightScreen() {
  const question = QUESTIONS[state.currentQuestion];
  const answer = question.answers[state.pendingAnswerIndex];

  if (!answer) {
    return renderQuestionScreen();
  }

  const questionVisualMarkup = `
    ${renderQuestionVisual(question)}
    <p class="visual-note">
      Kiekvienas atsakymas duoda mažą užuominą apie tavo bendrą judesio kryptį.
    </p>
  `;

  return `
    <section class="screen screen--insight">
      <div class="screen-copy">
        <div class="visual-panel visual-panel--mobile">
          ${questionVisualMarkup}
        </div>

        <span class="section-tag">Trumpa įžvalga</span>
        <h1>${escapeHtml(upperFirst(question.summaryLabel))}</h1>

        <div class="profile-card insight-card">
          <span class="profile-name">${escapeHtml(answer.label)}</span>
          <p class="screen-lead">${escapeHtml(answer.insight)}</p>
        </div>

        <div class="insight-progress" aria-hidden="true">
          <span class="insight-progress-bar"></span>
        </div>

        <div class="screen-actions">
          <button class="primary-button" type="button" data-action="continue">
            Toliau
          </button>
        </div>

        <p class="support-note">
          Po akimirkos pereisime prie kito žingsnio.
        </p>
      </div>

      <aside class="visual-panel visual-panel--desktop">
        ${questionVisualMarkup}
      </aside>
    </section>
  `;
}

function renderQuestionVisual(question) {
  if (question.imageSrc) {
    return `
      <img
        class="visual-photo"
        src="${question.imageSrc}"
        alt="${escapeHtml(question.summaryLabel)}"
        decoding="async"
      />
    `;
  }

  return POSE_SVGS[question.pose] ?? "";
}

function renderUnlockModal(stateEmailValue, stateEmailError, isOpen) {
  if (!isOpen) {
    return "";
  }

  const consentMarketingChecked = state.unlockConsentMarketing ? "checked" : "";
  const consentInvalidClass = state.unlockConsentError ? " is-invalid" : "";
  const unlockButtonDisabled =
    state.unlockConsentMarketing && !state.unlockSubmitting ? "" : "disabled";
  const unlockButtonLabel = state.unlockSubmitting ? "Atrakinama..." : "Atrakinti pratimus";
  const emailInputDisabled = state.unlockSubmitting ? "disabled" : "";

  return `
    <div class="modal-backdrop" data-action="close-unlock-modal">
      <section
        class="unlock-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="unlockModalTitle"
        >
        <button class="modal-close" type="button" data-action="close-unlock-modal" aria-label="Uždaryti">
          ×
        </button>
        <h2 id="unlockModalTitle">Atrakinti pratimus</h2>
        <p class="screen-lead">
          Įvesk el. paštą ir atrakink pratimus, kurie pagerins tavo mobilumą ir padės išvengti skausmo ateityje.
        </p>

        <form class="lead-form" id="unlockExercisesForm" novalidate>
          <label class="field-label" for="unlockEmailInput">El. paštas</label>
          <div class="lead-form-row">
            <input
              class="email-input"
              id="unlockEmailInput"
              name="email"
              type="email"
              inputmode="email"
              autocomplete="email"
              placeholder="El. paštas"
              value="${escapeHtml(stateEmailValue)}"
              ${emailInputDisabled}
            />
            <button class="primary-button" type="submit" ${unlockButtonDisabled}>${unlockButtonLabel}</button>
          </div>
          <div class="consent-list${consentInvalidClass}">
            <label class="consent-item">
              <input
                type="checkbox"
                id="unlockConsentMarketing"
                name="consentMarketing"
                ${consentMarketingChecked}
                ${emailInputDisabled}
              />
              <span>
                Sutinku gauti LazyFit pasiūlymus ir naujienas el. paštu.
              </span>
            </label>
          </div>
          ${
            stateEmailError
              ? `<p class="form-error">${escapeHtml(stateEmailError)}</p>`
              : ""
          }
          ${
            state.unlockConsentError
              ? `<p class="form-error">${escapeHtml(state.unlockConsentError)}</p>`
              : ""
          }
        </form>
      </section>
    </div>
  `;
}

function renderLockedExerciseCards() {
  return [1, 2, 3]
    .map(
      (index) => `
        <article class="exercise-card exercise-card--locked">
          <div class="exercise-card-lock">🔒</div>
          <div class="exercise-card-content">
            <div class="exercise-card-header">
              <span class="exercise-number">${index}</span>
              <h3>🔒 ${index} pratimas</h3>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderStickyUnlockCta() {
  return `
    <button class="sticky-unlock-cta" type="button" data-action="open-unlock-modal">
      Atrakink pratimus 🔥
    </button>
  `;
}

function renderExerciseCard(exercise) {
  const instructionMarkup = exercise.instructionText
    ? `
        <div class="exercise-extra-field">
          <strong>Kaip atlikti:</strong>
          <span>${escapeHtml(exercise.instructionText)}</span>
        </div>
      `
    : "";

  return `
    <article class="exercise-card">
      <div class="exercise-card-media">
        <img
          class="exercise-card-image"
          src="${escapeHtml(exercise.previewImage)}"
          alt="${escapeHtml(exercise.name)} pratimo peržiūra"
          loading="lazy"
          onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('is-fallback');"
        />
      </div>
      <div class="exercise-card-content">
        <div class="exercise-card-header">
          <span class="exercise-number">${exercise.kind}</span>
          <h3>${escapeHtml(exercise.name)}</h3>
        </div>
        <p class="exercise-benefit">${escapeHtml(exercise.benefit)}</p>
        <div class="exercise-card-footer">
          <div class="exercise-meta">
            <strong>Serijos / pakartojimai</strong>
            <span>${escapeHtml(exercise.dosage)}</span>
          </div>
          <a
            class="exercise-video-link"
            href="${escapeHtml(exercise.videoUrl)}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Žiūrėti pratimą
          </a>
        </div>
        ${instructionMarkup}
      </div>
    </article>
  `;
}

function buildUnlockPayload(emailValue) {
  const { bodyType, pelvisLoadProfile, exerciseCategory, actionPlan } = resultData();
  const { rotationRestriction, singleLegRestriction } = getAsymmetryRestrictions();

  return {
    email: emailValue,
    consentMarketing: state.unlockConsentMarketing,
    source: "lazyfit_body_check",
    submittedAt: new Date().toISOString(),
    result: {
      bodyType: bodyType.key,
      bodyTypeLabel: bodyType.name,
      pelvisLoadProfile: pelvisLoadProfile.key,
      exerciseCategory: exerciseCategory.key,
      rotationRestriction,
      singleLegRestriction,
    },
    exercises: {
      primary: actionPlan.exercises.slice(0, 3).map((exercise) => ({
        name: exercise.name,
        videoUrl: exercise.videoUrl,
      })),
      asymmetry: actionPlan.asymmetryBlock
        ? actionPlan.asymmetryBlock.exercises.map((exercise) => ({
            name: exercise.name,
            instructionText: exercise.instructionText,
            videoUrl: exercise.videoUrl,
          }))
        : [],
    },
  };
}

function buildConsultationPayload(interestType) {
  const normalizedEmail = state.emailValue || readStorageValue(EMAIL_STORAGE_KEY) || "";
  const basePayload = buildUnlockPayload(normalizedEmail);
  const normalizedInterest =
    interestType === "live_consultation" ? "live_consultation" : "online_consultation";

  return {
    ...basePayload,
    source: `lazyfit_body_check_${normalizedInterest}`,
    submittedAt: new Date().toISOString(),
    consultation: {
      interestType: normalizedInterest,
      label:
        normalizedInterest === "live_consultation"
          ? "Noriu gyvo susitikimo"
          : "Noriu online susitikimo",
    },
  };
}

async function saveLeadToGoogleSheets(payload) {
  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    return;
  }

  await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify(payload),
  });
}

function downloadPdfReport() {
  const previousTitle = document.title;
  const exportDate = new Date().toISOString().slice(0, 10);

  document.title = `LazyFit-ataskaita-${exportDate}`;
  window.print();

  window.setTimeout(() => {
    document.title = previousTitle;
  }, 400);
}

function renderUnlockPrompt(isOpen) {
  if (!isOpen) {
    return "";
  }

  return `
    <section class="unlock-prompt" aria-live="polite">
      <button class="unlock-prompt-close" type="button" data-action="close-unlock-prompt" aria-label="Uždaryti">
        ×
      </button>
      <strong>Nori sužinoti, kokie pratimai tau labiausiai tinka?</strong>
      <p>Įvesk email ir atrakink pratimus, atsižvelgiant į tavo kūno tipą.</p>
      <button class="primary-button unlock-prompt-button" type="button" data-action="open-unlock-modal">
        Atrakinti pratimus
      </button>
    </section>
  `;
}

function renderTestimonialCard() {
  return `
    <section class="result-section-card testimonial-card">
      <div class="testimonial-head">
        <span class="testimonial-chip">Atsiliepimas po analizės</span>
        <div class="testimonial-rating" aria-label="5 iš 5">
          <span class="testimonial-stars">★★★★★</span>
          <strong>5/5</strong>
        </div>
      </div>

      <div class="testimonial-body">
        <img
          class="testimonial-avatar"
          src="./assets/testimonials/monika-avatar-circle.png?v=1"
          alt="Monikos nuotrauka"
          loading="lazy"
          decoding="async"
        />

        <div class="testimonial-copy">
          <p class="testimonial-quote">
            „Sužinojau, kur konkrečiai yra problemos ir ką tiksliai daryti, kad jas spręsčiau.
            Taip pat pasitikrinau techniką, supratau, ką galiu daryti geriau ir kas mano kūnui
            tinka labiausiai. Rekomenduočiau visiems, kurie nori ilgai ir laimingai sportuoti.“
          </p>
          <div class="testimonial-person">
            <strong>Monika</strong>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderConsultationCta() {
  const isSubmitting = state.consultationSubmitting;
  const successMarkup = state.consultationMessage
    ? `<div class="consultation-success-note">${escapeHtml(state.consultationMessage)}</div>`
    : "";
  const consultationPreviewPages = [
    2, 5, 6, 7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 18, 20, 21, 23, 24, 25,
    26, 27, 28, 29, 30,
  ];
  const consultationPreviewPagesMarkup = consultationPreviewPages
    .map(
      (pageNumber, displayIndex) => `
        <article class="consultation-preview-page">
          <img
            class="consultation-preview-image"
            src="./assets/report-preview/page-${String(pageNumber).padStart(2, "0")}.png?v=4"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <span class="consultation-preview-page-label">${displayIndex + 1} / ${consultationPreviewPages.length}</span>
        </article>
      `,
    )
    .join("");

  return `
    <section class="result-section-card consultation-cta-card">
      <div class="consultation-cta-copy">
        <span class="consultation-offer-chip">Pilna biomechanikos konsultacija</span>
        <h2 class="result-section-title result-section-title--accent">
          O kas toliau?
        </h2>
        <p class="consultation-lead">
          Jei nori geriau jaustis ir greičiau pasiekti rezultatų, nepalik to spėliojimui.
        </p>
        <p class="profile-summary">
          Pilna biomechanikos konsultacija padeda aiškiai pamatyti, kas tavo kūne riboja judesį ir progresą.
        </p>
        <ul class="summary-list consultation-summary-list">
          <li class="summary-bullet">
            <span>🔥 Mažiau spėliojimo, daugiau aiškumo</span>
          </li>
          <li class="summary-bullet">
            <span>🎯 Pratimai pagal tavo kūną, o ne bendri patarimai</span>
          </li>
          <li class="summary-bullet">
            <span>✨ Greitesnis progresas ir aiškesnis supratimas, kas tave stabdo</span>
          </li>
        </ul>
        <div class="meaning-card consultation-value-card">
          <strong>Po konsultacijos gausi</strong>
          <p>
            Personalizuotą analizę ir konkrečius pratimus su aiškiais nurodymais, pritaikytus
            būtent tavo kūnui.
          </p>
        </div>
      </div>

      <div class="consultation-preview-card" aria-hidden="true">
        <div class="consultation-preview-copy">
          <span class="consultation-preview-chip">Pilnos analizės pavyzdys</span>
          <strong>24+ lapų personalizuotos informacijos</strong>
          <p>Matai analizės stilių, išdėstymą ir bendrą vaizdą. Žemiau gali prascrollinti didžiąją dalį pavyzdinės ataskaitos.</p>
        </div>
        <div class="consultation-preview-shell">
          <div class="consultation-preview-pages">
            ${consultationPreviewPagesMarkup}
          </div>
        </div>
      </div>

      <div class="consultation-cta-actions">
        <button
          class="primary-button consultation-button"
          type="button"
          data-action="consultation-live"
          ${isSubmitting ? "disabled" : ""}
        >
          ${isSubmitting && state.consultationInterest === "live_consultation" ? "Žymima..." : "Noriu gyvo susitikimo"}
        </button>
        <button
          class="secondary-button consultation-button consultation-button--secondary"
          type="button"
          data-action="consultation-online"
          ${isSubmitting ? "disabled" : ""}
        >
          ${isSubmitting && state.consultationInterest === "online_consultation" ? "Žymima..." : "Noriu online susitikimo"}
        </button>
      </div>
      ${successMarkup}
    </section>
  `;
}

function renderResultScreen() {
  const {
    profile,
    profileSummary,
    bodyType,
    widePercent,
    narrowPercent,
    dominantType,
    secondaryType,
    bodyTypeMeaning,
    loadProfileDetails,
    actionPlan,
  } = resultData();
  const isUnlocked = state.exercisesUnlocked;
  const bodyTypeBars = [
    { label: "Siauresnis tipas", percent: narrowPercent },
    { label: "Platesnis tipas", percent: widePercent },
  ];
  const bodyTypeBarsMarkup = [
    ...bodyTypeBars,
  ]
    .map((entry, index) => {
      const maxPercent = Math.max(...bodyTypeBars.map((item) => item.percent));
      const levelClass = entry.percent === maxPercent ? "type-bar-item--dominant" : "type-bar-item--secondary";

      return `
        <div class="type-bar-item ${levelClass}">
          <div class="type-bar-head">
            <strong>${escapeHtml(entry.label)}</strong>
            <span>~${entry.percent}%</span>
          </div>
          <div class="type-bar-track">
            <span class="type-bar-fill" style="width: ${clamp(entry.percent, 0, 100)}%"></span>
          </div>
        </div>
      `;
    })
    .join("");
  const bodyTypeMainLine =
    bodyType.key === "mixed"
      ? `Ir siauresnio, ir platesnio tipo bruožai (~${dominantType.percent}% / ~${secondaryType.percent}%)`
      : `${bodyType.name} (~${bodyType.percent}%)`;
  const bodyTypeSecondaryLine =
    bodyType.key === "mixed"
      ? "Testas nerodo vieno labai aiškaus tipo."
      : `Yra ir ${secondaryType.traitLabel.toLowerCase()} (~${secondaryType.percent}%), bet jų mažiau.`;
  const profileChipLabel = bodyType.key === "mixed" ? "Mišrus tipas" : profile.name;

  const bodyTypeMeaningMarkup = bodyTypeMeaning
    .map(
      (item) => `
        <li class="summary-bullet">
          <span>${escapeHtml(item)}</span>
        </li>
      `,
    )
    .join("");

  const loadProfileLogicMarkup = loadProfileDetails.logicPoints
    .map(
      (item) => `
        <li class="summary-bullet">
          <span>${escapeHtml(item)}</span>
        </li>
      `,
    )
    .join("");
  const loadProfileReasonMarkup = loadProfileDetails.showLogicPoints
    ? `
              <div class="result-summary">
                <h3>Kodėl taip atrodo</h3>
                <ul class="summary-list">${loadProfileLogicMarkup}</ul>
              </div>
            `
    : "";

  const actionPlanCardsMarkup = actionPlan.exercises
    .slice(0, 3)
    .map((exercise) => renderExerciseCard(exercise))
    .join("");
  const unlockNoticeMarkup = state.unlockMessage
    ? `<div class="unlock-success-note">${escapeHtml(state.unlockMessage)}</div>`
    : "";
  const asymmetryExerciseMarkup = actionPlan.asymmetryBlock
    ? `
        <div class="exercise-bonus-block">
          <div class="exercise-bonus-copy">
            <strong>${escapeHtml(actionPlan.asymmetryBlock.title)}</strong>
            <p>${escapeHtml(actionPlan.asymmetryBlock.explanation)}</p>
          </div>
          <div class="exercise-plan">
            ${actionPlan.asymmetryBlock.exercises.map((exercise) => renderExerciseCard(exercise)).join("")}
          </div>
        </div>
      `
    : "";
  const exerciseUnlockSectionMarkup = isUnlocked
    ? `
        <section class="result-section-card" id="exerciseUnlockSection">
          <div class="result-section-head">
            <h2 class="result-section-title result-section-title--accent">Tavo rezultatui parinkau šiuos pratimus</h2>
          </div>
          <div class="unlock-result-tools">
            ${unlockNoticeMarkup}
            <button class="secondary-button pdf-download-button" type="button" data-action="download-pdf">
              Parsisiųsti PDF ataskaitą
            </button>
          </div>
          <div class="exercise-plan">
            ${actionPlanCardsMarkup}
          </div>
          ${asymmetryExerciseMarkup}
        </section>
      `
    : `
        <section class="result-section-card" id="exerciseUnlockSection">
          <div class="result-section-head">
            <h2 class="result-section-title result-section-title--accent">Tavo rezultatui parinkau šiuos pratimus</h2>
          </div>
          <p class="profile-summary">
            Įvesk email ir atrakink pratimus pagal savo rezultatą.
          </p>
          <div class="exercise-plan exercise-plan--locked">
            ${renderLockedExerciseCards()}
          </div>
        </section>
      `;
  const stickyUnlockCtaMarkup = isUnlocked ? "" : renderStickyUnlockCta();
  const unlockPromptMarkup =
    !isUnlocked && !state.unlockModalOpen ? renderUnlockPrompt(state.unlockPromptOpen) : "";
  const unlockModalMarkup = renderUnlockModal(
    state.emailValue,
    state.emailError,
    state.unlockModalOpen,
  );
  const testimonialMarkup = isUnlocked ? renderTestimonialCard() : "";
  const consultationCtaMarkup = isUnlocked ? renderConsultationCta() : "";

  return `
    <section class="screen screen--result">
      <div class="screen-copy screen-copy--result">
        <h1>Ką apie tave parodė testas</h1>

        <div class="profile-card profile-card--hero">
          <span class="profile-name">${escapeHtml(profileChipLabel)}</span>
          <p class="screen-lead">${escapeHtml(profile.explanation)}</p>
          <p class="profile-summary">${escapeHtml(profileSummary)}</p>
        </div>

        <div class="result-hero-figure" aria-hidden="true">
          <img
            class="result-hero-image"
            src="./assets/result-hero-banner.png?v=2"
            alt=""
            decoding="async"
          />
        </div>

        <div class="result-overview-grid">
          <section class="result-section-card">
            <div class="result-section-head">
              <span class="type-spectrum-tag">1</span>
              <h2>Kūno tipas</h2>
            </div>

            <div class="type-spectrum-card">
              <div class="type-spectrum-copy">
                <span class="type-spectrum-label">Pagal testą</span>
                <strong class="type-main-title">${escapeHtml(bodyTypeMainLine)}</strong>
                <p class="type-main-copy">${escapeHtml(bodyTypeSecondaryLine)}</p>
                <div class="type-bars">
                  ${bodyTypeBarsMarkup}
                </div>
              </div>
            </div>

            <div class="result-summary">
              <h3>Ką tai reiškia tau</h3>
              <ul class="summary-list">${bodyTypeMeaningMarkup}</ul>
            </div>
          </section>

          <section class="result-section-card">
            <div class="result-section-head">
              <span class="type-spectrum-tag">2</span>
              <h2>Apkrova tarp kūno pusių</h2>
            </div>

            <div class="profile-card profile-card--load">
              <span class="profile-name">${escapeHtml(loadProfileDetails.title)}</span>
              <p class="screen-lead">${escapeHtml(loadProfileDetails.summary)}</p>
              ${loadProfileReasonMarkup}
            </div>
          </section>
        </div>

        <section class="result-section-card">
          <div class="result-section-head">
            <span class="type-spectrum-tag">3</span>
            <h2 class="result-section-title result-section-title--accent">Kokius pratimus atlikti?</h2>
          </div>

          <div class="meaning-card">
            <strong>${escapeHtml(actionPlan.explanation)}</strong>
          </div>
        </section>

        ${exerciseUnlockSectionMarkup}
        ${testimonialMarkup}
        ${consultationCtaMarkup}

        <p class="support-note">
          Tai nėra diagnozė. Tai tik trumpas testas, kuris parodo bendrą kryptį.
        </p>
      </div>
      ${stickyUnlockCtaMarkup}
      ${unlockPromptMarkup}
      ${unlockModalMarkup}
    </section>
  `;
}

function updateChrome() {
  const showProgress = state.step === "question" || state.step === "insight";
  const showRestart = state.step !== "start";
  const isStart = state.step === "start";
  const isResult = state.step === "result";

  progressShell.classList.toggle("is-hidden", !showProgress);
  restartButton.classList.toggle("is-hidden", !showRestart);
  progressShell.setAttribute("aria-hidden", showProgress ? "false" : "true");
  appCard.classList.toggle("app-card--start", isStart);
  appCard.classList.toggle("app-card--result", isResult);
  document.body.classList.toggle("start-mode", isStart);

  if (showProgress) {
    const current = state.currentQuestion + 1;
    progressText.textContent = `${current} / ${QUESTIONS.length}`;
    progressHint.textContent = state.step === "insight" ? "Trumpa įžvalga" : "Testo eiga";
    progressFill.style.width = `${(current / QUESTIONS.length) * 100}%`;
  }
}

function syncTransientUi() {
  clearInsightTimer();

  if (state.step === "insight") {
    insightTimerId = window.setTimeout(() => {
      if (state.step === "insight") {
        transition(commitPendingAnswer);
      }
    }, 1350);
  }
}

function syncResultPageUi() {
  if (state.step !== "result") {
    clearUnlockPromptTimer();
    return;
  }

  if (!state.exercisesUnlocked && !state.unlockPromptDismissed && !state.unlockPromptOpen && !state.unlockModalOpen && !unlockPromptTimerId) {
    unlockPromptTimerId = window.setTimeout(() => {
      unlockPromptTimerId = null;

      if (state.step !== "result" || state.exercisesUnlocked || state.unlockPromptDismissed || state.unlockModalOpen) {
        return;
      }

      const exerciseSection = document.querySelector("#exerciseUnlockSection");
      const isExerciseSectionAlreadyVisible =
        exerciseSection instanceof HTMLElement &&
        exerciseSection.getBoundingClientRect().top <= window.innerHeight * 0.42;
      const hasScrolledFarDown = window.scrollY > 560;

      if (isExerciseSectionAlreadyVisible || hasScrolledFarDown) {
        return;
      }

      state.unlockPromptOpen = true;
      render();
    }, 5000);
  }

  if (state.shouldFocusUnlockInput) {
    const unlockInput = document.querySelector("#unlockEmailInput");

    if (unlockInput instanceof HTMLInputElement && !isMobileViewport()) {
      window.requestAnimationFrame(() => unlockInput.focus());
    }

    state.shouldFocusUnlockInput = false;
  }

  if (state.shouldScrollToExercises) {
    const exerciseSection = document.querySelector("#exerciseUnlockSection");

    if (exerciseSection instanceof HTMLElement) {
      const scrollDelay = isMobileViewport() ? 260 : 0;

      window.setTimeout(() => {
        const topPosition = Math.max(window.scrollY + exerciseSection.getBoundingClientRect().top - 12, 0);
        window.scrollTo({
          top: topPosition,
          behavior: "smooth",
        });
      }, scrollDelay);
    }

    state.shouldScrollToExercises = false;
  }
}

function render() {
  let markup = "";

  if (state.step === "start") {
    markup = renderStartScreen();
  } else if (state.step === "question") {
    markup = renderQuestionScreen();
  } else if (state.step === "insight") {
    markup = renderInsightScreen();
  } else {
    markup = renderResultScreen();
  }

  screenContainer.innerHTML = markup;
  updateChrome();
  syncTransientUi();
  syncResultPageUi();
}

function transition(callback) {
  if (state.isTransitioning) {
    return;
  }

  clearInsightTimer();
  clearUnlockPromptTimer();
  state.isTransitioning = true;
  appCard.classList.add("is-switching");

  window.setTimeout(() => {
    callback();
    render();

    window.requestAnimationFrame(() => {
      appCard.classList.remove("is-switching");
      state.isTransitioning = false;
    });
  }, 180);
}

function commitPendingAnswer() {
  const answerIndex = state.pendingAnswerIndex;

  if (!Number.isInteger(answerIndex)) {
    state.step = "question";
    return;
  }

  state.answers[state.currentQuestion] = answerIndex;
  state.pendingAnswerIndex = null;
  state.ctaMessage = "";

  if (state.currentQuestion === QUESTIONS.length - 1) {
    state.step = "result";
  } else {
    state.step = "question";
    state.currentQuestion += 1;
  }
}

function restartTest() {
  transition(() => {
    clearStorageValue(EMAIL_STORAGE_KEY);
    clearStorageValue(EXERCISES_UNLOCKED_STORAGE_KEY);
    state.step = "start";
    state.currentQuestion = 0;
    state.answers = [];
    state.ctaMessage = "";
    state.pendingAnswerIndex = null;
    state.emailValue = "";
    state.emailError = "";
    state.unlockConsentMarketing = false;
    state.unlockConsentError = "";
    state.unlockSubmitting = false;
    state.emailSubmitted = false;
    state.unlockModalOpen = false;
    state.unlockMessage = "";
    state.consultationSubmitting = false;
    state.consultationInterest = "";
    state.consultationMessage = "";
    state.shouldScrollToExercises = false;
    state.shouldFocusUnlockInput = false;
    state.unlockPromptOpen = false;
    state.unlockPromptDismissed = false;
    state.exercisesUnlocked = false;
  });
}

document.addEventListener("click", (event) => {
  const clickedInsideUnlockModal = event.target.closest(".unlock-modal");
  const clickedModalClose = event.target.closest(".modal-close");
  const target = event.target.closest("[data-action]");

  if (clickedInsideUnlockModal && !clickedModalClose) {
    return;
  }

  if (!target) {
    return;
  }

  const { action } = target.dataset;

  if (action === "start") {
    transition(() => {
      state.step = "question";
      state.currentQuestion = 0;
      state.answers = [];
      state.ctaMessage = "";
      state.pendingAnswerIndex = null;
      state.emailValue = "";
      state.emailError = "";
      state.unlockConsentMarketing = false;
      state.unlockConsentError = "";
      state.unlockSubmitting = false;
      state.emailSubmitted = false;
      state.unlockModalOpen = false;
      state.unlockMessage = "";
      state.consultationSubmitting = false;
      state.consultationInterest = "";
      state.consultationMessage = "";
      state.shouldScrollToExercises = false;
      state.shouldFocusUnlockInput = false;
      state.unlockPromptOpen = false;
      state.unlockPromptDismissed = false;
      syncStoredUnlockState();
    });
    return;
  }

  if (action === "back" && state.currentQuestion > 0) {
    transition(() => {
      state.currentQuestion -= 1;
      state.pendingAnswerIndex = null;
      state.step = "question";
    });
    return;
  }

  if (action === "answer") {
    const answerIndex = Number.parseInt(target.dataset.answerIndex || "", 10);

    if (!Number.isInteger(answerIndex)) {
      return;
    }

    transition(() => {
      state.pendingAnswerIndex = answerIndex;
      state.ctaMessage = "";
      state.step = "insight";
    });
    return;
  }

  if (action === "continue") {
    transition(commitPendingAnswer);
    return;
  }

  if (action === "open-unlock-modal") {
    if (isMobileViewport()) {
      scrollPageToTop();
      window.setTimeout(openUnlockModal, 220);
      return;
    }
    openUnlockModal();
    return;
  }

  if (action === "close-unlock-prompt") {
    state.unlockPromptOpen = false;
    state.unlockPromptDismissed = true;
    render();
    return;
  }

  if (action === "close-unlock-modal") {
    state.unlockModalOpen = false;
    state.emailError = "";
    state.unlockConsentError = "";
    state.unlockSubmitting = false;
    render();
    return;
  }

  if (action === "full-analysis") {
    state.ctaMessage =
      "Čia vėliau galima prijungti registracijos formą, Calendly arba apmokamą pilnos biomechanikos analizės puslapį.";
    render();
    return;
  }

  if (action === "send-video") {
    state.ctaMessage =
      "Čia vėliau galima prijungti video įkėlimo formą arba individualios peržiūros užklausą.";
    render();
    return;
  }

  if (action === "consultation-live" || action === "consultation-online") {
    const interestType =
      action === "consultation-live" ? "live_consultation" : "online_consultation";
    const consultationPayload = buildConsultationPayload(interestType);

    state.consultationSubmitting = true;
    state.consultationInterest = interestType;
    state.consultationMessage = "";
    render();

    saveLeadToGoogleSheets(consultationPayload)
      .catch((error) => {
        window.console.warn("Nepavyko išsiųsti konsultacijos pasirinkimo į Google Sheets:", error);
      })
      .finally(() => {
        state.consultationSubmitting = false;
        state.consultationInterest = interestType;
        state.consultationMessage =
          "Puiku, gavau tavo pasirinkimą. Susisieksiu su tavimi ir atsiųsiu tolimesnę informaciją.";
        writeStorageValue(
          "lazyfit_body_check_last_consultation_interest",
          JSON.stringify(consultationPayload),
        );
        render();
      });

    return;
  }

  if (action === "restart") {
    restartTest();
    return;
  }

  if (action === "download-pdf") {
    downloadPdfReport();
  }
});

document.addEventListener("submit", async (event) => {
  const form = event.target;

  if (!(form instanceof HTMLFormElement) || form.id !== "unlockExercisesForm") {
    return;
  }

  event.preventDefault();

  const formData = new FormData(form);
  const emailValue = String(formData.get("email") ?? "").trim();
  const consentMarketing = formData.get("consentMarketing") === "on";

  state.emailValue = emailValue;
  state.unlockConsentMarketing = consentMarketing;

  if (!EMAIL_PATTERN.test(emailValue)) {
    state.emailError = "Įrašyk galiojantį el. pašto adresą.";
    render();
    return;
  }

  state.emailError = "";

  if (!consentMarketing) {
    state.unlockConsentError = "Pažymėk sutikimą, kad galėtum atrakinti pratimus.";
    render();
    return;
  }

  state.unlockConsentError = "";
  state.unlockSubmitting = true;
  render();

  const unlockPayload = buildUnlockPayload(emailValue);

  try {
    await saveLeadToGoogleSheets(unlockPayload);

    state.emailError = "";
    state.emailSubmitted = true;
    state.exercisesUnlocked = true;
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    state.unlockModalOpen = false;
    state.unlockPromptOpen = false;
    state.unlockMessage = "Pratimai atrakinti ✅";
    state.shouldScrollToExercises = true;
    state.unlockSubmitting = false;
    writeStorageValue(EMAIL_STORAGE_KEY, emailValue);
    writeStorageValue(EXERCISES_UNLOCKED_STORAGE_KEY, "true");
    writeStorageValue("lazyfit_body_check_last_lead_payload", JSON.stringify(unlockPayload));
    render();
  } catch (error) {
    window.console.warn("Nepavyko išsiųsti į Google Sheets:", error);

    state.emailError = "";
    state.emailSubmitted = true;
    state.exercisesUnlocked = true;
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    state.unlockModalOpen = false;
    state.unlockPromptOpen = false;
    state.unlockMessage = "Pratimai atrakinti ✅";
    state.shouldScrollToExercises = true;
    state.unlockSubmitting = false;
    writeStorageValue(EMAIL_STORAGE_KEY, emailValue);
    writeStorageValue(EXERCISES_UNLOCKED_STORAGE_KEY, "true");
    writeStorageValue("lazyfit_body_check_last_lead_payload", JSON.stringify(unlockPayload));
    render();
  }
});

document.addEventListener("input", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  if (target.id === "unlockEmailInput") {
    state.emailValue = target.value;
  }
});

document.addEventListener("change", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  if (target.id === "unlockConsentMarketing") {
    state.unlockConsentMarketing = target.checked;
  }

  if (target.id === "unlockConsentMarketing") {
    if (state.unlockConsentMarketing) {
      state.unlockConsentError = "";
    }
    render();
  }
});

restartButton.addEventListener("click", restartTest);

syncStoredUnlockState();
render();
