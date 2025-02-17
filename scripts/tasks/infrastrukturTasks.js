// scripts/tasks/infrastrukturTasks.js

window.infrastrukturTasks = [
  // ... (resten af din kode) ...
    {
        title: "Netværkssegmentering",
        shortDesc: "Opdel netværket i mindre segmenter for at forbedre sikkerheden.",
        narrativeIntro: "Netværkssegmentering begrænser skaden ved et eventuelt angreb.",
        riskProfile: 3,
        focus: "sikkerhed",
        steps: [
          {
            location: "infrastruktur",
            stepDescription: "Planlæg netværkssegmenteringen.",
            stepContext: "Identificer kritiske systemer og data.",
            choiceA: {
              label: "Detaljeret plan",
              text: "+3 sikkerhed, -2 tid",
              recommended: true,
              applyEffect: { timeCost: 2, statChange: { security: 3 } }
            },
            choiceB: {
              label: "Grundlæggende plan",
              text: "+1 sikkerhed, 0 tid",
              recommended: false,
              applyEffect: { timeCost: 0, statChange: { security: 1 } }
            }
          },
          {
            location: "cybersikkerhed",
            stepDescription: "Implementer VLANs og firewalls.",
            stepContext: "Konfigurer netværksenheder til at håndtere segmenteringen.",
            choiceA: {
              label: "Strenge regler",
              text: "+2 sikkerhed, -2 tid",
              recommended: true,
              applyEffect: { timeCost: 2, statChange: { security: 2 } }
            },
            choiceB: {
              label: "Standard regler",
              text: "+1 sikkerhed, 0 tid",
              recommended: false,
              applyEffect: { timeCost: 0, statChange: { security: 1 } }
            }
          },
          {
            location: "dokumentation",
            stepDescription: "Dokumenter netværkssegmenteringen.",
            stepContext: "Opret diagrammer og beskrivelser.",
            choiceA: {
              label: "Fuld dokumentation",
              text: "+2 sikkerhed, -2 tid",
              recommended: true,
              applyEffect: { timeCost: 2, statChange: { security: 2 } }
            },
            choiceB: {
              label: "Simpel oversigt",
              text: "+1 sikkerhed, 0 tid",
              recommended: false,
              applyEffect: { timeCost: 0, statChange: { security: 1 } }
            }
          }
        ]
      }
]; // <--- Tilføjet manglende afsluttende parenteser
