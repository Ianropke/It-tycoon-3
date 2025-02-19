// cybersikkerhedTasks.js

window.cybersikkerhedTasks = [
  // 1) Netværksbeskyttelse for LIMS (3 trin)
  {
    title: "Netværksbeskyttelse for LIMS",
    shortDesc: "Styrk firewall- og IDS-regler, så LIMS-trafik er ekstra beskyttet.",
    narrativeIntro: "LIMS indeholder kritiske laboratoriedata. Et målrettet angreb mod LIMS kan få alvorlige konsekvenser, hvis netværket ikke er forsvarligt sikret.",
    riskProfile: 3,
    focus: "cybersikkerhed",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Review firewall-regler med fokus på LIMS-portaler og applikationer.",
        stepContext: "Tjek at kun legitime tjenester og IP-adresser har adgang til LIMS. Overvej whitelisting.",
        choiceA: {
          label: "Omfattende firewall-oprydning",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Hurtig gennemgang",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Opgradér IDS/IPS-løsningen til at overvåge laboratorie-trafik i realtid.",
        stepContext: "Identificér mistænkelig aktivitet, f.eks. usædvanlige data-uploads eller scanninger mod LIMS-serveren.",
        choiceA: {
          label: "Avanceret opsætning",
          text: "+3 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Standardopsætning",
          text: "+1 sikkerhed, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater netværksdokumentationen med nye firewall- og IDS-regler.",
        stepContext: "Sikre, at personale og fremtidige IT-administratorer kender til de nye policy-ændringer.",
        choiceA: {
          label: "Omfattende dokumentation",
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

  // 2) Kryptering af LIMS-data (3 trin)
  {
    title: "Kryptering af LIMS-data",
    shortDesc: "Implementér ende-til-ende kryptering af kritiske laboratoriedata.",
    narrativeIntro: "Når patient- og laboratoriedata ligger i ro eller sendes mellem systemer, bør de være krypteret for at undgå data-læk.",
    riskProfile: 4,
    focus: "cybersikkerhed",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Vælg en krypteringsmetode (f.eks. AES-256) og politik for nøglehåndtering.",
        stepContext: "Tag hensyn til præstation, skalerbarhed og at nøglerne skal være tilstrækkeligt beskyttede.",
        choiceA: {
          label: "Streng kryptering",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Minimal kryptering",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Test brugervenligheden for laboranter og klinisk personale.",
        stepContext: "De skal kunne tilgå data uden store forsinkelser, men alligevel bevare sikkerhedsniveauet.",
        choiceA: {
          label: "Omfattende brugertest",
          text: "+2 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Simpel brugertest",
          text: "+1 sikkerhed, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater retningslinjer for håndtering af krypterede data og nøgle-cyklus.",
        stepContext: "Personalet skal vide, hvordan de fornyr og beskytter nøgler, og hvordan de rapporterer mistanke om databrud.",
        choiceA: {
          label: "Dybtgående dokumentation",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Kortfattet dokumentation",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      }
    ]
  },

  // 3) Beredskabsplan mod cyberangreb (4 trin)
  {
    title: "Beredskabsplan mod cyberangreb",
    shortDesc: "Udarbejd en plan for, hvordan I håndterer hackerangreb eller større it-incidenter.",
    narrativeIntro: "Hvis LIMS eller andre kritiske systemer rammes af ransomware eller DoS-angreb, er en klar responsplan afgørende for at minimere skaderne.",
    riskProfile: 3,
    focus: "cybersikkerhed",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Identificér typiske angrebsscenarier (ransomware, phishing, DoS).",
        stepContext: "Overvej, hvor sårbar LIMS er over for disse, og planlæg forsvar.",
        choiceA: {
          label: "Detajleret trusselsanalyse",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Overfladisk analyse",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "it‑jura",
        stepDescription: "Overholdelse af GDPR og databeskyttelseskrav i hændelseshåndteringen.",
        stepContext: "Ved angreb kan patientdata være eksponeret – der skal indberettes lovpligtigt.",
        choiceA: {
          label: "Grundig juridisk plan",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Minimal juridisk check",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Træn personalet i realistiske angrebssimulationer.",
        stepContext: "Hvis systemet pludselig lukkes ned, hvordan fortsætter man kritiske procedurer i laboratoriet?",
        choiceA: {
          label: "Interaktive øvelser",
          text: "+2 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Enkel teori",
          text: "+1 sikkerhed, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Nedskriv en officiel beredskabsplan – hvem kontakter hvem, hvornår?",
        stepContext: "Alle skal vide præcis, hvad de skal gøre ved mistanke om et angreb.",
        choiceA: {
          label: "Udførlig beredskabsplan",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Basisplan",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      }
    ]
  },

  // 4) Overvågning af LIMS-logins (3 trin)
  {
    title: "Overvågning af LIMS-logins",
    shortDesc: "Implementér monitorering og adfærdsanalyse på login-aktiviteter i LIMS.",
    narrativeIntro: "Uautoriserede logins eller mistænkelig adfærd kan indikere insider-trusler eller stjålne konti. Tidlig detektion er nøglen.",
    riskProfile: 2,
    focus: "cybersikkerhed",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Konfigurer et SIEM (Security Information and Event Management) for LIMS-logins.",
        stepContext: "Opsaml loginforsøg, tidspunkter, IP-adresser, og sæt advarsler ved usædvanlige mønstre.",
        choiceA: {
          label: "Dybtgående konfiguration",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Standard konfiguration",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Sørg for, at SIEM kan skalere, hvis logmængden stiger markant.",
        stepContext: "Hvis alt i laboratoriet bliver mere automatiseret, kan logmængden eksplodere.",
        choiceA: {
          label: "Skalerbar opsætning",
          text: "+2 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Basis opsætning",
          text: "+1 sikkerhed, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udfærdig retningslinjer for review af loginalarmer og evt. eskalering.",
        stepContext: "Definér, hvem der skal underrettes ved mistænkelig adfærd, og hvordan man reagerer.",
        choiceA: {
          label: "Omfattende retningslinjer",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Enkel retningslinje",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      }
    ]
  },

  // 5) Hardening af lab-arbejdsstationer (4 trin)
  {
    title: "Hardening af lab-arbejdsstationer",
    shortDesc: "Sikr, at de PC’er i laboratorierne er opdaterede og begrænset mod cybertrusler.",
    narrativeIntro: "Mange laboratorier har special-udstyr og PC’er med gammel software. En kompromitteret PC kan være bagdør til hele LIMS-netværket.",
    riskProfile: 3,
    focus: "cybersikkerhed",
    steps: [
      {
        location: "hospital",
        stepDescription: "Kortlæg alle eksisterende laboratorie-PC’er og deres softwareversioner.",
        stepContext: "Ofte kører der Windows-versioner eller instrumentsoftware, som ikke er blevet patchet i årevis.",
        choiceA: {
          label: "Omfattende inventarliste",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Overordnet liste",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Implementér baseline-hardening (fx begrænsede brugerrettigheder).",
        stepContext: "Fjern unødvendige tjenester, lav streng passwordpolitik, whitelist programmer m.m.",
        choiceA: {
          label: "Avanceret hardening",
          text: "+3 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basis hardening",
          text: "+1 sikkerhed, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "infrastruktur",
        stepDescription: "Rul OS-opdateringer og kritiske patches ud til alle lab-PC’er.",
        stepContext: "Sørg for minimal forstyrrelse i laboratoriets drift – planlæg evt. uden for spidsbelastning.",
        choiceA: {
          label: "Koordineret patching",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Løbende patching",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater procedurer for vedligehold, så PC’erne ikke falder bagud fremover.",
        stepContext: "En fast rutine sikrer, at nye patchrunder kører løbende, uden at laboratoriet overraskes.",
        choiceA: {
          label: "Struktureret vedligeholdelsesplan",
          text: "+2 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Simpel plan",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      }
    ]
  },

  // 6) Kontinuerlig pentest af LIMS (4 trin)
  {
    title: "Kontinuerlig pentest af LIMS",
    shortDesc: "Få et team til løbende at udføre penetrationstest på LIMS, så huller lukkes proaktivt.",
    narrativeIntro: "I stedet for at vente på et årligt sikkerhedstjek, kan løbende pentest fange sårbarheder løbende, fx efter nye features eller opdateringer.",
    riskProfile: 4,
    focus: "cybersikkerhed",
    steps: [
      {
        location: "cybersikkerhed",
        stepDescription: "Aftal scope for pentests – ingen afdelinger må være helt ‘off-limits’.",
        stepContext: "Sørg for, at man også tester integrationer til f.eks. POCT-enheder eller eksterne labs.",
        choiceA: {
          label: "Omfattende scope",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Begrænset scope",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Indgå aftale med et eksternt sikkerhedsfirma om løbende pentests.",
        stepContext: "Få klaret kontrakten: Overvågning, rapportering og ansvar ved eventuelle utilsigtede nedbrud.",
        choiceA: {
          label: "Grundig forhandling",
          text: "+3 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Hurtig aftale",
          text: "+1 sikkerhed, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Planlæg testvinduer, så laboratoriet og klinikerne ikke forstyrres unødigt.",
        stepContext: "En pentest kan risikere at stresse systemer – aftal tidspunkter udenfor spidsbelastning.",
        choiceA: {
          label: "Koordineret testplan",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Mindre koordination",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opsæt løbende rapportering og feedback-loop til dev-teamet.",
        stepContext: "Når huller opdages, skal de hurtigt fikses, og læring deles med hele holdet.",
        choiceA: {
          label: "Struktureret rapportering",
          text: "+2 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Simpel rapportering",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      }
    ]
  }
];
