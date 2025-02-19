// hospitalTasks.js

window.hospitalTasks = [
  // 1) Opgradering af LIMS-database (3 trin)
  {
    title: "Opgradering af LIMS-database",
    shortDesc: "Modernisér selve databasen bag laboratorieinformationssystemet.",
    narrativeIntro: "Databasen bag LIMS er ved at være forældet. En opgradering kan øge ydeevnen og forhindre fejl i patient- og laboratoriedata.",
    riskProfile: 3,
    focus: "udvikling",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Analyser den nuværende databasestruktur for flaskehalse.",
        stepContext: "Find ud af, hvor I mangler performance i håndteringen af laboratorieprøver og patientjournaler.",
        choiceA: {
          label: "Dybtgående analyse",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Test databaseopgraderingen med fokus på laboratoriernes arbejdsgange.",
        stepContext: "Sørg for, at alt fra blodprøvesvar til histologiske analyser kan håndteres hurtigt og korrekt.",
        choiceA: {
          label: "Omfattende test",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Standard test",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater dokumentationen og rutinerne for brug af den nye database.",
        stepContext: "Laboratoriemedarbejderne skal kende den nye struktur, så de ved, hvordan de slår op i data eller retter fejl.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Kort dokumentation",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      }
    ]
  },

  // 2) Automatisering af laboratorieprocesser (4 trin)
  {
    title: "Automatisering af laboratorieprocesser",
    shortDesc: "Implementér robot-/automationsløsninger, der optimerer prøvehåndtering.",
    narrativeIntro: "Laboratoriets workflow kan lettes ved automationsrobotter, der håndterer prøver, pipetterer og registrerer data automatisk i LIMS.",
    riskProfile: 3,
    focus: "udvikling",
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg de mest tidskrævende manuelle trin i laboratoriet.",
        stepContext: "Fx pipettering, prøveopsætning, centrifugering – find flaskehalse!",
        choiceA: {
          label: "Detaljeret kortlægning",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Overfladisk kortlægning",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Forhandle med robot-leverandører om automationsudstyr.",
        stepContext: "Få de bedste priser og serviceaftaler, så sygehuset ikke er nedprioriteret ved fejl.",
        choiceA: {
          label: "Dybtgående forhandling",
          text: "+3 udvikling, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Hurtig forhandling",
          text: "+1 udvikling, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for sikker dataoverførsel mellem robotter og LIMS.",
        stepContext: "Robotterne skal sende data til systemet uden risiko for hacking eller datatab.",
        choiceA: {
          label: "Avanceret sikring",
          text: "+2 udvikling, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Basis sikring",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater personalemanual og SOP’er (Standard Operating Procedures) for den nye automatisering.",
        stepContext: "Alle skal vide, hvordan man bruger og vedligeholder automationsudstyret.",
        choiceA: {
          label: "Omfattende opdatering",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Enkel opdatering",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      }
    ]
  },

  // 3) Integrér analyseredskaber med LIMS (3 trin)
  {
    title: "Integrér analyseredskaber med LIMS",
    shortDesc: "Få laboratoriets analyseapparater til at uploade resultater direkte i LIMS.",
    narrativeIntro: "Når apparater som spektrofotometre eller PCR-maskiner sender data direkte til LIMS, mindsker vi manuelle fejl og sparer tid.",
    riskProfile: 2,
    focus: "udvikling",
    steps: [
      {
        location: "hospital",
        stepDescription: "Prioritér hvilke analyseredskaber der først skal kobles på LIMS.",
        stepContext: "Start evt. med de mest brugte (fx blod- og urinprøvemaskiner) for størst effekt.",
        choiceA: {
          label: "Grundig prioritering",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Hurtig prioritering",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Installer kompatible interface-moduler til apparaterne.",
        stepContext: "Sørg for kabler, protokoller og netværk, så data kan flyde fejlfrit.",
        choiceA: {
          label: "Omfattende installation",
          text: "+2 udvikling, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Standard installation",
          text: "+1 udvikling, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér opkoblingsproceduren og fejlfindingsguides for personalet.",
        stepContext: "Ved nedbrud eller omkalibrering skal alle vide, hvad de skal gøre.",
        choiceA: {
          label: "Grundig vejledning",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Kort vejledning",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      }
    ]
  },

  // 4) Patientnær test (POCT) integration (4 trin)
  {
    title: "Patientnær test (POCT) integration",
    shortDesc: "Udvid LIMS til også at inkludere patientnær testing, fx i skadestuen.",
    narrativeIntro: "POCT-enheder (blodsukkermålere, hurtigtest) kan levere svar på stedet og bør logges direkte i LIMS. Det letter personalet og øger patientsikkerheden.",
    riskProfile: 3,
    focus: "udvikling",
    steps: [
      {
        location: "hospital",
        stepDescription: "Identificér hvilke POCT-enheder, der er i brug rundt omkring (skadestue, klinikker).",
        stepContext: "Mange afdelinger har hver sin fremgangsmåde – skab overblik!",
        choiceA: {
          label: "Omfattende kortlægning",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Simpel kortlægning",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "it‑jura",
        stepDescription: "Afklar juridiske aspekter ved at koble POCT-data direkte i patientjournalen.",
        stepContext: "Der kan være særregler om databeskyttelse og entydig autorisation.",
        choiceA: {
          label: "Grundig jura-gennemgang",
          text: "+3 udvikling, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Kort juridisk check",
          text: "+1 udvikling, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre krypteret transmission fra POCT-enheder til LIMS.",
        stepContext: "Undgå at en nemt hacket wifi-forbindelse udstiller følsomme data.",
        choiceA: {
          label: "Avanceret kryptering",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Basis kryptering",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater LIMS-manualen med POCT-integration og fejlsøgningsrutiner.",
        stepContext: "Hurtige tests kræver også klare vejledninger, især i pressede situationer (fx i skadestuen).",
        choiceA: {
          label: "Detaljeret vejledning",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Overordnet vejledning",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      }
    ]
  },

  // 5) Avanceret dataanalyse i LIMS (4 trin)
  {
    title: "Avanceret dataanalyse i LIMS",
    shortDesc: "Tilføj algoritmer for at opdage mønstre i laboratoriedata (f.eks. resistensmønstre).",
    narrativeIntro: "Hvis LIMS automatisk kan analysere store datamængder, kan man bedre opdage udbrud, resistens eller sjældne sygdomsmønstre.",
    riskProfile: 4,
    focus: "udvikling",
    steps: [
      {
        location: "hospital",
        stepDescription: "Definér de vigtigste analyser (resistensmodeller, trend-alarmer, osv.).",
        stepContext: "Læger og specialister skal fortælle, hvilke data og mønstre er mest kritiske at overvåge.",
        choiceA: {
          label: "Omfattende kravspec",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Rough kravspec",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Sikre, at systemet kan håndtere “big data” fra mange prøver og hospitaler.",
        stepContext: "Nogle analyser kræver stor regnekraft og masser af lagerplads.",
        choiceA: {
          label: "Storskala infrastruktur",
          text: "+3 udvikling, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Minimal infrastruktur",
          text: "+1 udvikling, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Indfør anonymiserings- og pseudonymiseringslag i dataanalysen.",
        stepContext: "Patientdata skal beskyttes, så man ikke kan spore følsomme oplysninger unødigt.",
        choiceA: {
          label: "Streng datasikkerhed",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Grundlæggende datasikkerhed",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater LIMS-håndbøgerne med, hvordan og hvornår avancerede analyser udføres.",
        stepContext: "Personalet skal vide, hvordan man starter og forstår resultaterne af disse analyser.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 udvikling, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Kort dokumentation",
          text: "+1 udvikling, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      }
    ]
  },

  // 6) Overvågning af lab-udstyr (3 trin)
  {
    title: "Overvågning af laboratorieudstyr",
    shortDesc: "Implementér realtidsmonitorering af centrifuger, inkubatorer m.m.",
    narrativeIntro: "Ingen vil have en defekt inkubator, der ødelægger prøver i flere dage, før det opdages. Realtidsmonitorering kan give alarmer ved temperatur- eller strømproblemer.",
    riskProfile: 2,
    focus: "udvikling",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Integrer sensorer og overvågningssoftware med LIMS-infrastrukturen.",
        stepContext: "Sensorerne skal kunne sende status og alarmer til central system.",
        choiceA: {
          label: "Fuldt integreret løsning",
          text: "+3 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 3 } }
        },
        choiceB: {
          label: "Delvis integration",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Pilottest i det store centrallaboratorium.",
        stepContext: "Sørg for at måle parametre (temperatur, fugt, strøm) i fx 14 dage for at sikre stabil drift.",
        choiceA: {
          label: "Omfattende pilot",
          text: "+2 udvikling, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Kort pilot",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Uddan personalet i at reagere på alarmer og bruge monitoreringsinterface.",
        stepContext: "Hvis folk ikke ved, hvad de skal gøre ved en alarm, er systemet nyttesløst.",
        choiceA: {
          label: "Detaljeret træning",
          text: "+2 udvikling, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { development: 2 } }
        },
        choiceB: {
          label: "Kort træning",
          text: "+1 udvikling, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { development: 1 } }
        }
      }
    ]
  }

];
