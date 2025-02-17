// scripts/tasks/cybersikkerhedTasks.js

window.cybersikkerhedTasks = [
  {
    title: "Styrk netværkssikkerhed",
    shortDesc: "Implementér avancerede sikkerhedsprotokoller for at beskytte netværket.",
    narrativeIntro: "Forbedring af netværkssikkerheden reducerer risikoen for databrud og cyberangreb.",
    riskProfile: 4,
    focus: "sikkerhed", // Consistent lowercase
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Gennemfør en sårbarhedsvurdering af netværket.",
        stepContext: "Identificér potentielle svagheder ved hjælp af avancerede værktøjer.",
        choiceA: {
          label: "Detaljeret vurdering",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Overfladisk vurdering",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgrader firewall- og IDS-systemer.",
        stepContext: "En opgradering sikrer bedre overvågning og afvisning af uautoriseret trafik.",
        choiceA: {
          label: "Omfattende opgradering",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Standard opgradering",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater netværkssikkerhedspolitikker.",
        stepContext: "Sørg for, at alle medarbejdere er opdateret med de nye politikker.",
        choiceA: {
          label: "Detaljeret opdatering",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Kort opdatering",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      }
    ]
  },
  {
    title: "Sikkerhedsopdatering af software",
    shortDesc: "Installer de seneste sikkerhedsopdateringer på alle systemer.",
    narrativeIntro: "Regelmæssige opdateringer forhindrer udnyttelse af kendte sårbarheder og øger systemets robusthed.",
    riskProfile: 3,
    focus: "sikkerhed",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér kritiske opdateringer for centrale systemer.",
        stepContext: "Sørg for, at alle opdateringer er kompatible med nuværende infrastruktur.",
        choiceA: {
          label: "Detaljeret gennemgang",
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
        location: "infrastruktur",
        stepDescription: "Implementer opdateringerne og test systemets stabilitet.",
        stepContext: "Test er afgørende for at sikre, at opdateringer ikke forstyrrer driften.",
        choiceA: {
          label: "Omfattende test",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Kort test",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér opdateringsprocessen og resultaterne.",
        stepContext: "En klar dokumentation sikrer, at processen kan gentages korrekt.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Sammenfattet dokumentation",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      }
    ]
  },
    {
    title: "Phishing Awareness Kampagne",
    shortDesc: "Gennemfør en kampagne for at øge medarbejdernes opmærksomhed på phishing.",
    narrativeIntro: "Øget medarbejderbevidsthed kan reducere risikoen for phishing-angreb markant.",
    riskProfile: 2,
    focus: "sikkerhed",
    steps: [
      {
        location: "hospital",
        stepDescription: "Planlæg kampagnens omfang og målgruppe.",
        stepContext: "Vurder, hvor i organisationen phishing-truslen er størst.",
        choiceA: {
          label: "Grundig planlægning",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Simpel planlægning",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Indgå samarbejde med ekstern partner for kampagnemateriale.",
        stepContext: "Partneren leverer materiale, der beskriver phishing og forebyggelse.",
        choiceA: {
          label: "Detaljeret materiale",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Kort info",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Afhold en træningssession for medarbejderne.",
        stepContext: "Interaktiv træning øger bevidstheden om phishing og mulige svindelmetoder.",
        choiceA: {
          label: "Interaktiv session",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Kort præsentation",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Evaluer kampagnens effekt og juster procedurerne.",
        stepContext: "Mål ændringer i medarbejdernes respons på phishing-forsøg.",
        choiceA: {
          label: "Detaljeret evaluering",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig evaluering",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      }
    ]
  },
    {
    title: "Implementering af to-faktor autentifikation",
    shortDesc: "Sikr systemadgangen med to-faktor autentifikation.",
    narrativeIntro: "To-faktor autentifikation reducerer markant risikoen for uautoriseret adgang.",
    riskProfile: 3,
    focus: "sikkerhed",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vurder eksisterende adgangskontroller og identificer svagheder.",
        stepContext: "En grundig vurdering afgør, hvor to-faktor bør implementeres.",
        choiceA: {
          label: "Detaljeret vurdering",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Overfladisk vurdering",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Integrer to-faktor løsningen med eksisterende systemer.",
        stepContext: "Sørg for en gnidningsløs integration uden at forstyrre driften.",
        choiceA: {
          label: "Omfattende integration",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Standard integration",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater adgangspolitikker med de nye procedurer.",
        stepContext: "Retningslinjerne skal tydeligt beskrive to-faktor autentifikation.",
        choiceA: {
          label: "Detaljeret dokumentation",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Kort dokumentation",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      }
    ]
  },
     {
        title: "Sikkerhedstræning for ansatte",
        shortDesc: "Afhold obligatorisk sikkerhedstræning for alle ansatte.",
        narrativeIntro: "Regelmæssig træning øger medarbejdernes bevidsthed om cybersikkerhed.",
        riskProfile: 2,
        focus: "sikkerhed",
        steps: [
            {
                location: "cybersikkerhed",
                stepDescription: "Udarbejd træningsplan for cybersikkerhed.",
                stepContext: "Planen skal dække relevante emner som phishing og password-sikkerhed.",
                choiceA: {
                    label: "Omfattende plan",
                    text: "+3 sikkerhed, -2 tid",
                    recommended: true,
                    applyEffect: {timeCost: 2, statChange: {security: 3}}
                },
                choiceB: {
                    label: "Grundlæggende plan",
                    text: "+1 sikkerhed, 0 tid",
                    recommended: false,
                    applyEffect: {timeCost: 0, statChange: {security: 1}}
                }
            },
            {
                location: "hospital",
                stepDescription: "Afhold træningssession for medarbejderne.",
                stepContext: "Gennemfør træningen i mindre grupper for bedre interaktion.",
                choiceA: {
                   label: "Interaktiv workshop",
                    text: "+2 sikkerhed, -2 tid",
                    recommended: true,
                    applyEffect: {timeCost: 2, statChange: {security: 2}}
                },
                choiceB: {
                    label: "Online kursus",
                    text: "+1 sikkerhed, 0 tid",
                    recommended: false,
                    applyEffect: {timeCost: 0, statChange: {security: 1}}
                }
            },
             {
                location: "dokumentation",
                stepDescription: "Opdater medarbejderhåndbogen med sikkerhedspolitikker.",
                stepContext: "Sørg for, at alle har adgang til opdateret information.",
                choiceA: {
                   label: "Detaljeret håndbog",
                    text: "+2 sikkerhed, -2 tid",
                    recommended: true,
                    applyEffect: {timeCost: 2, statChange: {security: 2}}
                },
                choiceB: {
                    label: "Kort opsummering",
                    text: "+1 sikkerhed, 0 tid",
                    recommended: false,
                    applyEffect: {timeCost: 0, statChange: {security: 1}}
                }
            },
             {
                location: "leverandør",
                stepDescription: "Evaluer og opdater træningsprogrammet.",
                stepContext: "Sørg for, at alle har adgang til opdateret information.",
                choiceA: {
                   label: "Detaljeret feedback",
                    text: "+3 sikkerhed, -2 tid",
                    recommended: true,
                    applyEffect: {timeCost: 2, statChange: {security: 3}}
                },
                choiceB: {
                    label: "Kort evaluering",
                    text: "+1 sikkerhed, 0 tid",
                    recommended: false,
                    applyEffect: {timeCost: 0, statChange: {security: 1}}
                }
            }
        ]
    },
    {
    title: "Incident Response Plan",
    shortDesc: "Udarbejd en plan for håndtering af cyberangreb.",
    narrativeIntro: "En effektiv incident response plan minimerer skader og forbedrer genopretningstiden.",
    riskProfile: 3,
    focus: "sikkerhed",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Definér roller og ansvar i tilfælde af et angreb.",
        stepContext: "Klare retningslinjer sikrer hurtig og koordineret respons.",
        choiceA: {
          label: "Detaljerede roller",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Generelle roller",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "it‑jura",
        stepDescription: "Udarbejd juridiske retningslinjer for datahåndtering.",
        stepContext: "Overholdelse af lovgivning er afgørende under en krise.",
        choiceA: {
          label: "Fuld juridisk gennemgang",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Standard retningslinjer",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Test og øv incident response planen.",
        stepContext: "Regelmæssige øvelser sikrer, at planen er effektiv.",
        choiceA: {
          label: "Fuld simulation",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
