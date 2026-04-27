const exercises = [
  // 🔹 WIDE
  {
    id: "breathing-rotation",
    name: "Rotacija su kvėpavimu",
    category: "mobility_expansion",
    type: "rotation",
    side: "both",
    shortDescription:
      "Pratimas leidžia aktyviai suspausti šonkaulius į šonus, pagerinant jų kontrolę ir judrumą.",
    setsReps: "2×6",
    videoUrl:
      "https://iframe.mediadelivery.net/play/239542/af820c0e-27e7-402a-ace5-908652d65a4e",
    previewImage:
      "https://vz-01a4b1c4-97f.b-cdn.net/bcdn_token=zQwwT0u-hQFnXYNI6voakngEsnbppftqoZ_4EQxXrXw&expires=1777315940&token_path=%2Faf820c0e-27e7-402a-ace5-908652d65a4e%2F/af820c0e-27e7-402a-ace5-908652d65a4e/thumbnail.jpg",
  },
  {
    id: "zercher-squat",
    name: "Zercher pritūpimas",
    category: "mobility_expansion",
    type: "squat",
    side: "both",
    shortDescription:
      "Padeda išlaikyti svorio centrą atgal ir lengviau pasiekti gylį pritūpime.",
    setsReps: "2×8",
    videoUrl:
      "https://iframe.mediadelivery.net/play/239542/0613e60d-8db4-4a1e-9474-c2248f630a6e",
    previewImage:
      "https://vz-01a4b1c4-97f.b-cdn.net/bcdn_token=9Mpocyv4_o_vTwKuDwW7ShInyQtGOI9p5NDrvbsx4QM&expires=1777316435&token_path=%2F0613e60d-8db4-4a1e-9474-c2248f630a6e%2F/0613e60d-8db4-4a1e-9474-c2248f630a6e/thumbnail.jpg",
  },
  {
    id: "side-plank-lift",
    name: "Šoninis pasikėlimas",
    category: "mobility_expansion",
    type: "core",
    side: "both",
    shortDescription:
      "Aktyvina šoninius korpuso raumenis ir gerina kontrolę šoninėse grandyse.",
    setsReps: "2×8",
    videoUrl:
      "https://iframe.mediadelivery.net/play/239542/c3ac8ec3-aeb8-4072-bd40-d1dbfcc71d31",
    previewImage:
      "https://vz-01a4b1c4-97f.b-cdn.net/bcdn_token=pbLOwXnZStEFLNxc8Vrr9DRagKjX8JAysfQD8rwe28M&expires=1777316879&token_path=%2Fc3ac8ec3-aeb8-4072-bd40-d1dbfcc71d31%2F/c3ac8ec3-aeb8-4072-bd40-d1dbfcc71d31/thumbnail.jpg",
  },

  // 🔹 NARROW
  {
    id: "forward-breathing",
    name: "Kvėpavimas pasilenkus",
    category: "stability_control",
    type: "breathing",
    side: "both",
    shortDescription:
      "Padeda sumažinti dubens įtampą ir pagerinti pasilenkimo kontrolę.",
    setsReps: "2×30 sek",
    videoUrl:
      "https://iframe.mediadelivery.net/play/239542/9521c5e6-6d60-49ba-a41a-4166ef06e82b",
    previewImage:
      "https://vz-01a4b1c4-97f.b-cdn.net/bcdn_token=eUBXHahLkTpGeKf4uBv3zM74LNKBW1gIHplT1HtWShg&expires=1777383196&token_path=%2F9521c5e6-6d60-49ba-a41a-4166ef06e82b%2F/9521c5e6-6d60-49ba-a41a-4166ef06e82b/thumbnail.jpg",
  },
  {
    id: "pullover",
    name: "Puloveris su svareliu",
    category: "stability_control",
    type: "upper_body",
    side: "both",
    shortDescription:
      "Padeda plėsti krūtinę ir gerinti laikyseną.",
    setsReps: "2×10",
    videoUrl:
      "https://iframe.mediadelivery.net/play/239542/c880c519-4aeb-4e3f-a410-868c413b9abc",
    previewImage:
      "https://vz-01a4b1c4-97f.b-cdn.net/bcdn_token=41WmDoRAGN3XTuA4RuxoKiCRxrvEcYXgzH9mDjNFCug&expires=1777383814&token_path=%2Fc880c519-4aeb-4e3f-a410-868c413b9abc%2F/c880c519-4aeb-4e3f-a410-868c413b9abc/thumbnail.jpg",
  },
  {
    id: "rdl",
    name: "RDL",
    category: "stability_control",
    type: "hinge",
    side: "both",
    shortDescription:
      "Gerina užpakalinės grandinės mobilumą ir stiprina judesio kontrolę.",
    setsReps: "2×8",
    videoUrl:
      "https://iframe.mediadelivery.net/play/239542/9bf824b4-4518-403f-ba77-c9da0d2b220e",
    previewImage:
      "https://vz-01a4b1c4-97f.b-cdn.net/bcdn_token=yN8FHxJiJxjnIIbBVZBopBLfDzoTl6lxwVcBWIEelCY&expires=1777384009&token_path=%2F9bf824b4-4518-403f-ba77-c9da0d2b220e%2F/9bf824b4-4518-403f-ba77-c9da0d2b220e/thumbnail.jpg",
  },

  // 🔹 MIXED
  {
    id: "deep-squat-reach",
    name: "Siekimas žemai pritūpus",
    category: "balanced_foundation",
    type: "mobility",
    side: "both",
    shortDescription:
      "Gerina klubų mobilumą ir padeda grąžinti svorio centrą atgal.",
    setsReps: "2×30 sek",
    videoUrl:
      "https://iframe.mediadelivery.net/play/239542/b379d352-1439-4fe7-bcb1-ca08353f1a40",
    previewImage:
      "https://vz-01a4b1c4-97f.b-cdn.net/bcdn_token=IHcYa1mhu9-aVqFILfWa4pbhOXPZwSldIcbxdB8kFNo&expires=1777384334&token_path=%2Fb379d352-1439-4fe7-bcb1-ca08353f1a40%2F/b379d352-1439-4fe7-bcb1-ca08353f1a40/thumbnail.jpg",
  },
  {
    id: "mixed-zercher",
    name: "Zercher pritūpimas",
    category: "balanced_foundation",
    type: "squat",
    side: "both",
    shortDescription:
      "Padeda pasiekti gylį ir stabilumą pritūpime.",
    setsReps: "2×8",
    videoUrl:
      "https://iframe.mediadelivery.net/play/239542/0613e60d-8db4-4a1e-9474-c2248f630a6e",
    previewImage:
      "https://vz-01a4b1c4-97f.b-cdn.net/bcdn_token=9Mpocyv4_o_vTwKuDwW7ShInyQtGOI9p5NDrvbsx4QM&expires=1777316435&token_path=%2F0613e60d-8db4-4a1e-9474-c2248f630a6e%2F/0613e60d-8db4-4a1e-9474-c2248f630a6e/thumbnail.jpg",
  },
  {
    id: "mixed-rdl",
    name: "RDL",
    category: "balanced_foundation",
    type: "hinge",
    side: "both",
    shortDescription:
      "Padeda išlaikyti mobilumą ir jį užtvirtinti jėga.",
    setsReps: "2×8",
    videoUrl:
      "https://iframe.mediadelivery.net/play/239542/9bf824b4-4518-403f-ba77-c9da0d2b220e",
    previewImage:
      "https://vz-01a4b1c4-97f.b-cdn.net/bcdn_token=yN8FHxJiJxjnIIbBVZBopBLfDzoTl6lxwVcBWIEelCY&expires=1777384009&token_path=%2F9bf824b4-4518-403f-ba77-c9da0d2b220e%2F/9bf824b4-4518-403f-ba77-c9da0d2b220e/thumbnail.jpg",
  },
  {
    id: "front-foot-elevated-lunge",
    name: "Įtūpstas pakelta priekinė koja",
    category: "rotation_balance",
    type: "single_leg",
    side: "both",
    shortDescription:
      "Moko išlaikyti neutralų dubenį leidžiantis žemyn, neperlenkiant nugaros.",
    setsReps: "2×8",
    videoUrl:
      "https://iframe.mediadelivery.net/play/239542/1b5bf8c4-6299-4058-a1be-7267ff0d2b11",
    previewImage:
      "https://vz-01a4b1c4-97f.b-cdn.net/bcdn_token=20eIfNVpMCnrsgZEx_kww2eMmi1Nw1psAs5jTYCSEpQ&expires=1777385336&token_path=%2F1b5bf8c4-6299-4058-a1be-7267ff0d2b11%2F/1b5bf8c4-6299-4058-a1be-7267ff0d2b11/thumbnail.jpg",
  },
  {
    id: "rear-foot-elevated-lunge",
    name: "Įtūpstas pakelta galinė koja",
    category: "rotation_balance",
    type: "single_leg",
    side: "both",
    shortDescription:
      "Moko stabiliai kontroliuoti dubenį ir liemenį leidžiantis žemyn.",
    setsReps: "2×8",
    videoUrl:
      "https://iframe.mediadelivery.net/play/239542/161abcf1-5996-4bf4-9a5a-48dd12e46ab5",
    previewImage:
      "https://vz-01a4b1c4-97f.b-cdn.net/bcdn_token=nmfvKa8jFN11d7pce0Xi_L6V0LnyBx--JK76mVsfy7M&expires=1777385884&token_path=%2F161abcf1-5996-4bf4-9a5a-48dd12e46ab5%2F/161abcf1-5996-4bf4-9a5a-48dd12e46ab5/thumbnail.jpg",
  },
];

export default exercises;