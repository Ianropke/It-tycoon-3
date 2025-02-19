// infrastrukturTasks.js

window.infrastrukturTasks = [
  // 1) HPC-klynge til laboratorieanalyser (4 trin)
  {
    title: "HPC-klynge til laboratorieanalyser",
    shortDesc: "Implementér en HPC (High-Performance Computing) infrastruktur til avancerede analyser.",
    narrativeIntro: "For at håndtere store datamængder (genomforskning, epidemiologiske undersøgelser osv.) kan en HPC-klynge aflaste LIMS og give hurtigere svar.",
    riskProfile: 4,
    focus: "sikkerhed",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Planlæg HPC-arkitekturen (noder, storage, netværk).",
        stepContext: "Overvej redundans, cluster management software og forbindelse til eksisterende datacenter.",
        choiceA: {
          label: "Dybtgående plan",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Hurtig plan",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "leverandør",
        stepDescription: "Forhandle om HPC-hardware og supportaftaler.",
        stepContext: "Grafikkort, CPU-cluster og kablingsløsninger – HPC er dyrt, men kritisk for store analyser.",
        choiceA: {
          label: "Detaljeret forhandling",
          text: "+3 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Hurtig forhandling",
          text: "+1 sikkerhed, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sikre HPC-klyngen mod uautoriseret adgang og data-sniffing.",
        stepContext: "HPC kan potentielt tiltrække angribere, der vil udnytte regnekraften – eller stjæle forskningsdata.",
        choiceA: {
          label: "Avanceret sikkerhedslag",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Standard sikkerhed",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Udarbejd driftsmanual for HPC, inkl. failover-procedurer og brugsvejledninger.",
        stepContext: "Specialister og lab-personale skal vide, hvornår HPC bruges, og hvordan man rapporterer problemer.",
        choiceA: {
          label: "Detaljeret manual",
          text: "+2 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Kort manual",
          text: "+1 sikkerhed, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      }
    ]
  },

  // 2) Containerisering af hospitalets services (3 trin)
  {
    title: "Containerisering af hospitalets services",
    shortDesc: "Migrér centrale services til Docker/Kubernetes for bedre drift og sikkerhed.",
    narrativeIntro: "Containerisering gør det lettere at opdatere, teste og sikre applikationer – men kræver omhyggelig opsætning.",
    riskProfile: 4,
    focus: "sikkerhed",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Vælg container-orkestrering (Kubernetes, Docker Swarm el.l.) og opsæt cluster.",
        stepContext: "Overvej, hvor kritiske services kører. LIMS, patientbooking, rapportering ... alt kræver stabilitet.",
        choiceA: {
          label: "Omfattende cluster-setup",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basis cluster-setup",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Hardening af container-images, netværksadskillelse og secrets-håndtering.",
        stepContext: "Et kompromitteret container-image kan åbne hele clusteret for angribere.",
        choiceA: {
          label: "Avanceret container-sikkerhed",
          text: "+3 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Standard container-sikkerhed",
          text: "+1 sikkerhed, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér deployments, rollback-strategier og opskaleringsprocedurer.",
        stepContext: "DevOps-teamet og driftspersonale skal kunne håndtere nye containerudrulninger uden downtime.",
        choiceA: {
          label: "Omfattende dokumentation",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Enkel dokumentation",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      }
    ]
  },

  // 3) DataCenter High Availability (4 trin)
  {
    title: "DataCenter High Availability",
    shortDesc: "Sikre nær-0 nedetid for kritiske systemer med HA-løsninger.",
    narrativeIntro: "Hospitalets IT skal køre døgnet rundt. Nedbrud på LIMS eller booking kan skabe kaos, så redundans og failover er afgørende.",
    riskProfile: 3,
    focus: "sikkerhed",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Implementér redundante servere/netværk for kritiske systemer.",
        stepContext: "Minimer single-points-of-failure (fx en enkelt switch, et RAID-setup uden backup, etc.).",
        choiceA: {
          label: "Omfattende redundans",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Delvis redundans",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Planlæg failover-tests i roligt tidsrum (mindre patientflow).",
        stepContext: "Ingen får gavn af redundans, hvis failover ikke er afprøvet i praksis.",
        choiceA: {
          label: "Hyppige failover-tests",
          text: "+2 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Sjældne tests",
          text: "+1 sikkerhed, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "it‑jura",
        stepDescription: "Sørg for, at alle HA-aftaler overholder lovkrav (logs, ansvar, datasikkerhed).",
        stepContext: "Hvis eksterne leverandører er involveret, bør kontrakter matche compliance og SLA’er.",
        choiceA: {
          label: "Juridisk grundig review",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Kort review",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater driftsvejledningerne, så personalet forstår HA‑processen.",
        stepContext: "Fejlretning i et HA-setup kræver, at alle ved, hvor/hvordan man omdirigerer trafik, skifter noder m.m.",
        choiceA: {
          label: "Udførlig vejledning",
          text: "+2 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Grundlæggende vejledning",
          text: "+1 sikkerhed, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      }
    ]
  },

  // 4) IoT-styret overvågning af medicinsk udstyr (4 trin)
  {
    title: "IoT-styret overvågning af medicinsk udstyr",
    shortDesc: "Opsæt sensorer og gateway-løsninger, så hospitalet kan overvåge udstyr digitalt.",
    narrativeIntro: "Fra automatiske “bleepers” i respiratorer, IV-pumper eller køleskabe til vacciner: IoT giver både nye muligheder og nye sikkerhedstrusler.",
    riskProfile: 3,
    focus: "sikkerhed",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Vælg en IoT-gateway-løsning, der kan administrere tusindvis af sensorer.",
        stepContext: "Tænk på netværksoverbelastning, standardprotokoller (MQTT, CoAP) og båndbredde.",
        choiceA: {
          label: "Skalerbar gateway",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Mindre gateway",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Indfør streng autentificering mellem IoT-enheder og server.",
        stepContext: "Hvis angribere kan emulere eller hijacke IoT-enheder, kan de potentielt sende falske målinger eller få adgang til netværket.",
        choiceA: {
          label: "Avanceret IoT-sikkerhed",
          text: "+3 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Basis IoT-sikkerhed",
          text: "+1 sikkerhed, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "hospital",
        stepDescription: "Test systemet i mindre afdelinger, fx dialyse eller kardiologi, før fuld udrulning.",
        stepContext: "Undgå at oversvømme hele hospitalet med utestet IoT-løsning fra dag 1.",
        choiceA: {
          label: "Pilotafdeling test",
          text: "+2 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Minimal test",
          text: "+1 sikkerhed, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Dokumentér opsætning, alarmer og vedligeholdelsesrutiner for IoT-enhederne.",
        stepContext: "Sørg for, at teknisk personale ved, hvordan man udskifter defekte sensorer, og hvornår man opdaterer firmware.",
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

  // 5) Infrastruktur as Code (IaC) (3 trin)
  {
    title: "Infrastruktur as Code (IaC)",
    shortDesc: "Indfør Infrastructure as Code for at styre hospitalets IT-miljøer mere kontrolleret.",
    narrativeIntro: "Ved at beskrive al infrastruktur i kode (Terraform, Ansible, etc.) kan ændringer versioneres, trackes og implementeres reproducerbart – men det kræver disciplin og sikkerhed.",
    riskProfile: 2,
    focus: "sikkerhed",
    steps: [
      {
        location: "infrastruktur",
        stepDescription: "Vælg IaC-værktøj og definer standarder for netværk, VM’er, storage osv.",
        stepContext: "Hold hospitalets miljøer ensartede – undgå ‘snowflake servers’, der er konfigureret tilfældigt.",
        choiceA: {
          label: "Omfattende IaC-opsætning",
          text: "+3 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 3 } }
        },
        choiceB: {
          label: "Begrænset IaC-opsætning",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "cybersikkerhed",
        stepDescription: "Sørg for versionskontrol, access-kontrol og secure secrets i IaC-laget.",
        stepContext: "Ingen burde kunne tjekke git-repo’er med passwords i klartekst – det sker overraskende tit!",
        choiceA: {
          label: "Streng IaC-sikkerhed",
          text: "+2 sikkerhed, -2 tid",
          recommended: true,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Basis IaC-sikkerhed",
          text: "+1 sikkerhed, 0 tid",
          recommended: false,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      },
      {
        location: "dokumentation",
        stepDescription: "Opdater driftsmanual og dev-guides, så alle følger IaC-principper.",
        stepContext: "Fremtidige ændringer i infrastruktur bør ske via pull requests og code reviews, ikke manuelle hacks.",
        choiceA: {
          label: "Fuld revidering",
          text: "+2 sikkerhed, -2 tid",
          recommended: false,
          applyEffect: { timeCost: 2, statChange: { security: 2 } }
        },
        choiceB: {
          label: "Hurtig revidering",
          text: "+1 sikkerhed, 0 tid",
          recommended: true,
          applyEffect: { timeCost: 0, statChange: { security: 1 } }
        }
      }
    ]
  }
];
