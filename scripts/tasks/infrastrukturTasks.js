// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [
  // ... Your infrastructure task objects here ...
    {
        title: "Serverkonsolidering",
        shortDesc: "Konsolider fysiske servere ved hjælp af virtualisering.",
        narrativeIntro: "Reducerer hardwareomkostninger, energiforbrug og pladsbehov.",
        riskProfile: 3,
        focus: "udvikling",
        steps: [
            {
                location: "infrastruktur",
                stepDescription: "Analyser eksisterende serverbelastning.",
                stepContext: "Identificer servere, der kan virtualiseres.",
                choiceA: {
                    label: "Fuldstændig analyse",
                    text: "+3 udvikling, -2 tid",
                    recommended: true,
                    applyEffect: { timeCost: 2, statChange: { development: 3 } }
                },
                choiceB: {
                    label: "Hurtig oversigt",
                    text: "+1 udvikling, 0 tid",
                    recommended: false,
                    applyEffect: { timeCost: 0, statChange: { development: 1 } }
                }
            },
            {
                location: "leverandør",
                stepDescription: "Vælg en virtualiseringsplatform.",
                stepContext: "Overvej VMware, Hyper-V eller open source-alternativer.",
                choiceA: {
                    label: "Markedsledende platform",
                    text: "+2 udvikling, -2 tid",
                    recommended: true,
                    applyEffect: { timeCost: 2, statChange: { development: 2 } }
                },
                choiceB: {
                    label: "Budgetvenlig platform",
                    text: "+1 udvikling, 0 tid",
                    recommended: false,
                    applyEffect: { timeCost: 0, statChange: { development: 1 } }
                }
            },
            {
                location: "infrastruktur",
                stepDescription: "Migrer servere til den virtuelle platform.",
                stepContext: "Udfør migreringen i etaper for at minimere nedetid.",
                choiceA: {
                    label: "Fuld migrering",
                    text: "+3 udvikling, -2 tid",
                    recommended: true,
                    applyEffect: { timeCost: 2, statChange: { development: 3 } }
                },
                choiceB: {
                    label: "Trinvis migrering",
                    text: "+1 udvikling, 0 tid",
                    recommended: false,
                    applyEffect: { timeCost: 0, statChange: { development: 1 } }
                }
            }
        ]
    },
      {
        title: "Netværkssegmentering",
