// scripts/tasks/hospitalTasks.js

window.hospitalTasks = [
  // ... Your hospital task objects here ...
    {
        title: "Patientjournal Sikkerhed",
        shortDesc: "Implementer stærkere adgangskontrol til patientjournaler.",
        narrativeIntro: "Forbedret patientsikkerhed og overholdelse af GDPR.",
        riskProfile: 3,
        focus: "sikkerhed", // Corrected: Use lowercase for consistency
        steps: [
            {
                location: "hospital",
                stepDescription: "Vurder nuværende adgangsrettigheder.",
                stepContext: "Identificer medarbejdere, der har unødvendig adgang.",
                choiceA: {
                    label: "Detaljeret revision",
                    text: "+3 sikkerhed, -2 tid",
                    recommended: true,
                    applyEffect: { timeCost: 2, statChange: { security: 3 } }
                },
                choiceB: {
                    label: "Overfladisk revision",
                    text: "+1 sikkerhed, 0 tid",
                    recommended: false,
                    applyEffect: { timeCost: 0, statChange: { security: 1 } }
                }
            },
            {
                location: "it‑jura",
                stepDescription: "Opdater adgangspolitikker i henhold til GDPR.",
                stepContext: "Sikrer overholdelse af lovgivningen om databeskyttelse.",
                choiceA: {
                    label: "Fuld GDPR-tilpasning",
                    text: "+2 sikkerhed, -2 tid",
                    recommended: true,
                    applyEffect: { timeCost: 2, statChange: { security: 2 } }
                },
                choiceB: {
                    label: "Grundlæggende tilpasning",
                    text: "+1 sikkerhed, 0 tid",
                    recommended: false,
                    applyEffect: { timeCost: 0, statChange: { security: 1 } }
                }
            },
             {
                location: "dokumentation",
                stepDescription: "Implementer de nye adgangspolitikker.",
                stepContext: "Opdater systemet og informer medarbejderne.",
                choiceA: {
                    label: "Fuld implementering.",
                    text: "+3 sikkerhed, -2 tid",
                    recommended: true,
                    applyEffect: { timeCost: 2, statChange: { security: 3 } }
                },
                choiceB: {
                    label: "Gradvis implementering.",
                    text: "+1 sikkerhed, 0 tid",
                    recommended: false,
                    applyEffect: { timeCost: 0, statChange: { security: 1 } }
                }
            }
        ]
    },
      {
        title: "Opgrader Medicinsk Udstyr",
        shortDesc: "Opdater softwaren på medicinsk udstyr.",
        narrativeIntro: "Forbedret funktionalitet og patientsikkerhed.",
        riskProfile: 2,
        focus: "udvikling",  // Corrected: Use lowercase for consistency
        steps: [
            {
                location: "hospital",
                stepDescription: "Identificer udstyr, der kræver opdatering.",
                stepContext: "Fokusér på kritisk udstyr først.",
                choiceA: {
                    label: "Fuld opdatering",
                    text: "+3 udvikling, -2 tid",
                    recommended: true,
                    applyEffect: { timeCost: 2, statChange: { development: 3 } }
                },
                choiceB: {
                    label: "Prioriteret opdatering",
                    text: "+1 udvikling, 0 tid",
                    recommended: false,
                    applyEffect: { timeCost: 0, statChange: { development: 1 } }
                }
            },
            {
                location: "leverandør",
                stepDescription: "Indhent opdateringer fra leverandørerne.",
                stepContext: "Sikrer, at du har de nyeste versioner.",
                choiceA: {
                    label: "Direkte kontakt",
                    text: "+2 udvikling, -2 tid",
                    recommended: true,
                    applyEffect: { timeCost: 2, statChange: { development: 2 } }
                },
                choiceB: {
                    label: "Standard support",
                    text: "+1 udvikling, 0 tid",
                    recommended: false,
                    applyEffect: { timeCost: 0, statChange: { development: 1 } }
                }
            },
             {
                location: "infrastruktur",
                stepDescription: "Installer opdateringer.",
                stepContext: "Test udstyret efter opdateringen.",
                choiceA: {
                    label: "Fuld installation.",
                    text: "+3 udvikling, -2 tid",
                    recommended: true,
                    applyEffect: { timeCost: 2, statChange: { development: 3 } }
                },
                choiceB: {
                    label: "Test installation.",
                    text: "+1 udvikling, 0 tid",
                    recommended: false,
                    applyEffect: { timeCost: 0, statChange: { development: 1 } }
                }
            }
        ]
    },
      {
        title: "Trådløs Netværkssikkerhed",
        shortDesc: "Forbedre sikkerheden for det trådløse netværk på hospitalet.",
        narrativeIntro: "Beskytter følsomme data og forhindrer uautoriseret adgang.",
        riskProfile: 4,
        focus: "sikkerhed",
        steps: [
          {
            location: "hospital",
            stepDescription: "Analyser nuværende trådløse netværkskonfiguration.",
            stepContext: "Identificer svagheder i sikkerhedsprotokoller.",
            choiceA: {
              label: "Dybdegående analyse",
              text: "+3 sikkerhed, -2 tid",
              recommended: true,
              applyEffect: { timeCost: 2, statChange: { security: 3 } }
            },
            choiceB: {
              label: "Hurtig scanning",
              text: "+1 sikkerhed, 0 tid",
              recommended: false,
              applyEffect: { timeCost: 0, statChange: { security: 1 } }
            }
          },
          {
            location: "cybersikkerhed",
            stepDescription: "Implementer WPA3-kryptering.",
            stepContext: "Stærkere kryptering beskytter dataoverførsler.",
            choiceA: {
              label: "Fuld WPA3-implementering",
              text: "+3 sikkerhed, -2 tid",
              recommended: true,
              applyEffect: { timeCost: 2, statChange: { security: 3 } }
            },
            choiceB: {
              label: "WPA2/WPA3 hybrid",
              text: "+1 sikkerhed, 0 tid",
              recommended: false,
              applyEffect: { timeCost: 0, statChange: { security: 1 } }
            }
          },
          {
            location: "dokumentation",
            stepDescription: "Opdater netværkspolitikker og informer personale.",
            stepContext: "Sikrer, at alle er bekendt med de nye sikkerhedsforanstaltninger.",
            choiceA: {
              label: "Uddybende information",
              text: "+2 sikkerhed, -2 tid",
              recommended: true,
              applyEffect: { timeCost: 2, statChange: { security: 2 } }
            },
            choiceB: {
              label: "Kort notifikation",
              text: "+1 sikkerhed, 0 tid",
              recommended: false,
              applyEffect: { timeCost: 0, statChange: { security: 1 } }
            }
          }
        ]
      },
        {
        title: "Implementer Nyt E-mail System",
        shortDesc: "Migrer til et nyt, mere sikkert og effektivt e-mail system.",
        narrativeIntro: "Forbedrer kommunikation og reducerer risikoen for phishing.",
        riskProfile: 3,
        focus: "udvikling",
        steps: [
            {
                location: "leverandør",
                stepDescription: "Vælg en passende e-mail platform.",
                stepContext: "Overvej sikkerhed, funktioner og pris.",
                choiceA: {
                    label: "Cloud-baseret løsning",
                    text: "+3 udvikling, -2 tid",
                    recommended: true,
                    applyEffect: { timeCost: 2, statChange: { development: 3 } }
                },
                choiceB: {
                    label: "On-premise løsning",
                    text: "+1 udvikling, 0 tid",
                    recommended: false,
                    applyEffect: { timeCost: 0, statChange: { development: 1 } }
                }
            },
             {
                location: "infrastruktur",
                stepDescription: "Forbered infrastruktur til migrering.",
                stepContext: "Sikrer kompatibilitet og minimal nedetid.",
                choiceA: {
                    label: "Fuld forberedelse",
                    text: "+3 udvikling, -2 tid",
                    recommended: true,
                    applyEffect: { timeCost: 2, statChange: { development: 3 } }
                },
                choiceB: {
                    label: "Grundlæggende forberedelse",
                    text: "+1 udvikling, 0 tid",
                    recommended: false,
                    applyEffect: { timeCost: 0, statChange: { development: 1 } }
                }
            },
            {
                location: "hospital",
                stepDescription: "Migrer data og uddan personale.",
                stepContext: "Sikrer en smidig overgang.",
                choiceA: {
                    label: "Fuld migrering og træning",
                    text: "+2 udvikling, -2 tid",
                    recommended: true,
                    applyEffect: { timeCost: 2, statChange: { development: 2 } }
                },
                choiceB: {
                    label: "Basis migrering",
                    text: "+1 udvikling, 0 tid",
                    recommended: false,
                    applyEffect: { timeCost: 0, statChange: { development: 1 } }
                }
            }
        ]
    },
      {
        title: "Opgrader Operationsstue-Systemer",
        shortDesc: "Opdater software og hardware i operationsstuerne.",
        narrativeIntro: "Forbedrer præcision og effektivitet under operationer.",
        riskProfile: 4,
        focus: "udvikling",
        steps: [
          {
            location: "hospital",
            stepDescription: "Vurder behov for opgraderinger.",
            stepContext: "Identificer forældet udstyr og software.",
            choiceA: {
              label: "Komplet vurdering",
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
            stepDescription: "Indhent tilbud på nyt udstyr og software.",
            stepContext: "Sammenlign priser og funktionalitet.",
            choiceA: {
              label: "Flere tilbud",
              text: "+2 udvikling, -2 tid",
              recommended: true,
              applyEffect: { timeCost: 2, statChange: { development: 2 } }
            },
            choiceB: {
              label: "Enkelt tilbud",
              text: "+1 udvikling, 0 tid",
              recommended: false,
              applyEffect: { timeCost: 0, statChange: { development: 1 } }
            }
          },
           {
            location: "infrastruktur",
            stepDescription: "Installer og test nyt udstyr.",
            stepContext: "Sikrer korrekt integration med eksisterende systemer.",
            choiceA: {
              label: "Fuld integration og test",
              text: "+3 udvikling, -2 tid",
              recommended: true,
              applyEffect: { timeCost: 2, statChange: { development: 3 } }
            },
            choiceB: {
              label: "Grundlæggende installation",
              text: "+1 udvikling, 0 tid",
              recommended: false,
              applyEffect: { timeCost: 0, statChange: { development: 1 } }
            }
          },
          {
            location: "dokumentation",
            stepDescription: "Opdater dokumentation og træningsmaterialer.",
            stepContext: "Sikrer korrekt brug af det nye udstyr.",
            choiceA: {
              label: "Uddybende manualer",
              text: "+2 udvikling, -2 tid",
              recommended: true,
              applyEffect: { timeCost: 2, statChange: { development: 2 } }
            },
            choiceB: {
              label: "Kort oversigt",
              text: "+1 udvikling, 0 tid",
              recommended: false,
              applyEffect: { timeCost: 0, statChange: { development: 1 } }
            }
          }
        ]
      }
];
