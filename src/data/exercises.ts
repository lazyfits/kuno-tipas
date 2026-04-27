export type ExerciseCategory =
  | "stability_control"
  | "mobility_expansion"
  | "balanced_foundation"
  | "asymmetry_support";

export type ExerciseType =
  | "breathing"
  | "rotation"
  | "squat"
  | "hinge"
  | "core"
  | "single_leg"
  | "shoulder";

export type ExerciseSide = "left" | "right" | "both";

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  type: ExerciseType;
  side: ExerciseSide;
  shortDescription: string;
  setsReps: string;
  videoUrl: string;
  previewImage: string;
}

export const exercises: Exercise[] = [
  {
    id: "90-90-wall-breathing",
    name: "90/90 kvėpavimas prie sienos",
    category: "stability_control",
    type: "breathing",
    side: "both",
    shortDescription: "Padeda ramiau surasti atramą per dubenį, šonkaulius ir pėdas.",
    setsReps: "3 serijos x 5 ramūs įkvėpimai",
    videoUrl: "/videos/90-90-wall-breathing.mp4",
    previewImage: "/assets/movement-single-leg-balance.png",
  },
  {
    id: "dead-bug-heel-press",
    name: "Dead bug su kulnų spaudimu",
    category: "stability_control",
    type: "core",
    side: "both",
    shortDescription: "Moko išlaikyti liemens kontrolę, kai juda rankos ir kojos.",
    setsReps: "3 serijos x 6-8 pakartojimai",
    videoUrl: "/videos/dead-bug-heel-press.mp4",
    previewImage: "/assets/movement-overhead-reach.png",
  },
  {
    id: "left-stance-reach",
    name: "Kairės kojos atramos siekimas",
    category: "stability_control",
    type: "single_leg",
    side: "left",
    shortDescription: "Padeda geriau jausti kairę atramą ir ramesnį svorio perkėlimą.",
    setsReps: "2-3 serijos x 20-30 sek.",
    videoUrl: "/videos/left-stance-reach.mp4",
    previewImage: "/assets/movement-single-leg-balance.png",
  },
  {
    id: "right-stance-reach",
    name: "Dešinės kojos atramos siekimas",
    category: "stability_control",
    type: "single_leg",
    side: "right",
    shortDescription: "Padeda geriau jausti dešinę atramą ir sumažinti skubėjimą į stipresnę pusę.",
    setsReps: "2-3 serijos x 20-30 sek.",
    videoUrl: "/videos/right-stance-reach.mp4",
    previewImage: "/assets/movement-single-leg-balance.png",
  },
  {
    id: "wall-overhead-reach",
    name: "Rankų kėlimas prie sienos",
    category: "mobility_expansion",
    type: "shoulder",
    side: "both",
    shortDescription: "Padeda lengviau kelti rankas į viršų neieškant judesio per nugarą.",
    setsReps: "3 serijos x 6-8 pakartojimai",
    videoUrl: "/videos/wall-overhead-reach.mp4",
    previewImage: "/assets/movement-overhead-reach.png",
  },
  {
    id: "supported-deep-squat-breathing",
    name: "Pritūpimas su atrama ir kvėpavimu",
    category: "mobility_expansion",
    type: "squat",
    side: "both",
    shortDescription: "Padeda lengviau rasti gylį pritūpime ir atpalaiduoti įtemptesnes vietas.",
    setsReps: "3 serijos x 4-5 kvėpavimai",
    videoUrl: "/videos/supported-deep-squat-breathing.mp4",
    previewImage: "/assets/movement-deep-squat.png",
  },
  {
    id: "hinge-reach-to-wall",
    name: "Klubo atvedimas atgal į sieną",
    category: "mobility_expansion",
    type: "hinge",
    side: "both",
    shortDescription: "Moko švaresnio klubo davimo atgal veiksmo be skubėjimo į nugarą.",
    setsReps: "3 serijos x 8 pakartojimai",
    videoUrl: "/videos/hinge-reach-to-wall.mp4",
    previewImage: "/assets/movement-toe-touch.png",
  },
  {
    id: "left-open-book-rotation",
    name: "Rotacija gulint į kairę",
    category: "mobility_expansion",
    type: "rotation",
    side: "left",
    shortDescription: "Padeda laisviau atsisukti į kairę pusę ir mažiau kompensuoti dubeniu.",
    setsReps: "2-3 serijos x 6 pakartojimai",
    videoUrl: "/videos/left-open-book-rotation.mp4",
    previewImage: "/assets/movement-trunk-rotation.png",
  },
  {
    id: "right-open-book-rotation",
    name: "Rotacija gulint į dešinę",
    category: "mobility_expansion",
    type: "rotation",
    side: "right",
    shortDescription: "Padeda laisviau atsisukti į dešinę pusę ir mažiau kompensuoti dubeniu.",
    setsReps: "2-3 serijos x 6 pakartojimai",
    videoUrl: "/videos/right-open-book-rotation.mp4",
    previewImage: "/assets/movement-trunk-rotation.png",
  },
  {
    id: "hook-lying-breathing",
    name: "Kvėpavimas gulint sulenktomis kojomis",
    category: "balanced_foundation",
    type: "breathing",
    side: "both",
    shortDescription: "Duoda paprastą startą, kai reikia ramaus pagrindo be per daug sudėtingų užduočių.",
    setsReps: "3 serijos x 5-6 kvėpavimai",
    videoUrl: "/videos/hook-lying-breathing.mp4",
    previewImage: "/assets/movement-single-leg-balance.png",
  },
  {
    id: "box-squat-pattern",
    name: "Pritūpimas iki dėžės",
    category: "balanced_foundation",
    type: "squat",
    side: "both",
    shortDescription: "Padeda švariau suderinti gylį, atramą ir kontrolę viename judesyje.",
    setsReps: "3 serijos x 6-8 pakartojimai",
    videoUrl: "/videos/box-squat-pattern.mp4",
    previewImage: "/assets/movement-deep-squat.png",
  },
  {
    id: "cross-connect-march",
    name: "Lėtas cross-connect žingsniavimas",
    category: "balanced_foundation",
    type: "single_leg",
    side: "both",
    shortDescription: "Moko tolygiau pernešti svorį tarp pusių ir geriau jausti vienos kojos atramą.",
    setsReps: "2-3 serijos x 20-30 sek.",
    videoUrl: "/videos/cross-connect-march.mp4",
    previewImage: "/assets/movement-single-leg-balance.png",
  },
  {
    id: "dumbbell-lunge-right-hand",
    name: "Įtūpstas su hanteliu",
    category: "asymmetry_support",
    type: "single_leg",
    side: "both",
    shortDescription: "Padeda geriau jausti atramą ir lavinti dubens bei liemens kontrolę abiejose pusėse.",
    setsReps: "2×8 kiekvienai pusei",
    videoUrl: "/videos/dumbbell-lunge-right-hand.mp4",
    previewImage: "/assets/movement-single-leg-balance.png",
  },
  {
    id: "dumbbell-lunge-left-hand",
    name: "Įtūpstas su hanteliu",
    category: "asymmetry_support",
    type: "single_leg",
    side: "both",
    shortDescription: "Padeda geriau jausti atramą ir lavinti dubens bei liemens kontrolę abiejose pusėse.",
    setsReps: "2×8 kiekvienai pusei",
    videoUrl: "/videos/dumbbell-lunge-left-hand.mp4",
    previewImage: "/assets/movement-single-leg-balance.png",
  },
];

export default exercises;
