// scripts/events.js
import { openModal, closeModal } from './modal.js';

/**
 * eventsList
 * 20 forskellige hændelser (events), hvor condition(...) bestemmer,
 * om hændelsen er relevant for spillerens aktuelle situation.
 * message indeholder en sjov/illustrativ tekst med emojis,
 * effect(...) justerer gameState (fx tid, point).
 */
const eventsList = [
  // 1) POSITIVE & NEUTRALE EVENTS
  {
    name: "⚡ Pludseligt Gennembrud",
    condition: (ratioDev, time) => ratioDev > 0.6 && time > 10,
    message: "Dit udviklingsteam får en lys idé og koder løs hele natten! Du sparer 3 Tid, fordi alt går over al forventning \u{1F680}",
    effect: (gameState) => {
      gameState.time += 3;
    }
  },
  {
    name: "🤝 Sponsor i kulissen",
    condition: (ratioDev, time) => ratioDev > 0.6 && time <= 15,
    message: "En ekstern investor ser dit stærke fokus på udvikling og skyder penge i projektet! +2 udviklingspoint \u{1F4AA}",
    effect: (gameState) => {
      gameState.development += 2;
    }
  },
  {
    name: "🛠️ Sikkerhedsboost",
    condition: (ratioDev, time) => ratioDev <= 0.55 && time > 25,
    message: "Et eksternt konsulentfirma tilbyder en hurtig security-tuneup. Du tjener +2 i Sikkerhed \u{1F512}",
    effect: (gameState) => {
      gameState.security += 2;
    }
  },
  {
    name: "🌱 Grøn It-optimering",
    condition: (ratioDev, time) => ratioDev < 0.5 && time > 10,
    message: "Du finder en bæredygtig måde at afvikle serverne på. +1 Tid \u{1F49A}",
    effect: (gameState) => {
      gameState.time += 1;
    }
  },
  {
    name: "🎉 Mini-messe sejr",
    condition: (ratioDev, time) => ratioDev > 0.35 && ratioDev < 0.65,
    message: "Din balance mellem Udvikling og Sikkerhed bemærkes ved en lokal it-messe – intet dårligt sker \u{1F91D}",
    effect: (gameState) => {
      // Ingen effekt, bare en lille klap på skulderen
    }
  },
  {
    name: "📝 Superb Brugertilfredshed",
    condition: (ratioDev, time) => ratioDev >= 0.5 && time >= 20,
    message: "Brugerne roser jeres nye features i en spørgeskemaundersøgelse. PR-points, men ingen KPI-ændring \u{1F389}",
    effect: (gameState) => {
      // Ingen direkte effekt
    }
  },
  {
    name: "\u{1F468}\u{200D}\u{1F4BB} Arkitekt til Redning",
    condition: (ratioDev, time) => ratioDev > 0.5 && time < 20,
    message: "En flittig systemarkitekt smider alt for at hjælpe dig: +2 Tid \u{1F9E0}",
    effect: (gameState) => {
      gameState.time += 2;
    }
  },

  // 2) NEGATIVE EVENTS
  {
    name: "💥 Hackerintrusion",
    condition: (ratioDev, time) => ratioDev > 0.65,
    message: "BAM! Et hackerteam udnytter dine svage sikkerhedskontroller. Du mister 3 Tid på panik-lukning \u{1F525}",
    effect: (gameState) => {
      gameState.time -= 3;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  {
    name: "🕰️ Papirhelvedet",
    condition: (ratioDev, time) => ratioDev < 0.35,
    message: "Du har sat så lidt fokus på Udvikling, at I stadig bruger en <em>faxmaskine</em> \u{1F4E0}. Du mister 2 Tid på papirarbejde!",
    effect: (gameState) => {
      gameState.time -= 2;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  {
    name: "⚖️ Compliancekoks",
    condition: (ratioDev, time) => ratioDev < 0.4,
    message: "En audit finder alvorlige huller i dokumentationen. Du mister 4 Tid på at rette op \u{1F5C4}",
    effect: (gameState) => {
      gameState.time -= 4;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  {
    name: "📉 Systemkollaps",
    condition: (ratioDev, time) => time < 10,
    message: "Et kritisk system fejler midt i en vigtig demo, og du bruger 5 Tid på brandslukning \u{1F4A5}",
    effect: (gameState) => {
      gameState.time -= 5;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  {
    name: "🚫 Forældede systemer",
    condition: (ratioDev, time) => ratioDev > 0.75,
    message: "Dit store fokus på ny udvikling har efterladt gamle systemer i ruiner – du mister 3 Tid \u{1F630}",
    effect: (gameState) => {
      gameState.time -= 3;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  {
    name: "🔌 Leverandørkatastrofe",
    condition: (ratioDev, time) => ratioDev < 0.35 && time < 20,
    message: "Din leverandør går konkurs uden varsel. Du taber 2 Tid på at skaffe en ny \u{1F6AB}",
    effect: (gameState) => {
      gameState.time -= 2;
      if (gameState.time < 0) gameState.time = 0;
    }
  },

  // 3) FLERE BEGIVENHEDER
  {
    name: "🔒 Sikkerhedsdonation",
    condition: (ratioDev, time) => ratioDev < 0.4,
    message: "En NGO er imponeret over din sikkerhedssans og donerer ekstra udstyr – +2 i Sikkerhed \u{1F512}",
    effect: (gameState) => {
      gameState.security += 2;
    }
  },
  {
    name: "💿 Software-lir",
    condition: (ratioDev, time) => ratioDev >= 0.5,
    message: "En ny softwareversion løser pludselig en masse fejl – +1 Udvikling \u{1F4BD}",
    effect: (gameState) => {
      gameState.development += 1;
    }
  },
  {
    name: "⏳ Dokumentationskaos",
    condition: (ratioDev, time) => ratioDev < 0.3,
    message: "Du overser en gigantisk stak papir, og ender med 3 Tid i spild \u{1F4C3}",
    effect: (gameState) => {
      gameState.time -= 3;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  {
    name: "🖥️ Bonus-feature",
    condition: (ratioDev, time) => ratioDev > 0.7,
    message: "En nørdet udvikler har lanceret en ny killer-feature i smug – +2 Udvikling \u{1F527}",
    effect: (gameState) => {
      gameState.development += 2;
    }
  },
  {
    name: "💻 Server-fnidder",
    condition: (ratioDev, time) => ratioDev > 0.65 && time < 25,
    message: "For mange nye features overbelaster serverne, du bruger 2 Tid på akut opgradering \u{1F5A5}",
    effect: (gameState) => {
      gameState.time -= 2;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  {
    name: "💼 Revisionsbesøg",
    condition: (ratioDev, time) => ratioDev < 0.5 && time > 20,
    message: "En ekstern revision roser din stabilitet – ingen dårlig effekt, flot! \u{1F4C8}",
    effect: (gameState) => {
      // Ingen effekt
    }
  },
  {
    name: "🏛️ Juridisk Benspænd",
    condition: (ratioDev, time) => ratioDev < 0.4,
    message: "Juristerne kræver flere ændringer for at overholde lovkrav – -2 Tid \u{2696}",
    effect: (gameState) => {
      gameState.time -= 2;
      if (gameState.time < 0) gameState.time = 0;
    }
  }
];

/**
 * triggerRandomEvent(gameState)
 * Udløser én af hændelserne, hvis condition(...) er opfyldt,
 * baseret på en sandsynlighed, og viser en event-modal med emojis.
 *
 * Regler:
 * - Spilleren skal have løst mindst 2 opgaver (tasksCompleted >= 2).
 * - Der kan maksimalt komme 2 hændelser (eventsTriggeredThisPI < 2) pr. PI.
 * - Grund-chance: 50% reduceret med 35% (til ca. 32,5%).
 */
export function triggerRandomEvent(gameState) {
  // Sørg for at spilleren har løst mindst 2 opgaver
  if (gameState.tasksCompleted < 2) return;
  
  // Maksimalt 2 hændelser pr. PI
  if (gameState.eventsTriggeredThisPI >= 2) return;
  
  // Oprindelig chance: 50%, reduceret med 35% => 50% * 0.65 = ca. 32,5%
  const eventChance = 0.5 * 0.65;
  if (Math.random() > eventChance) return;

  // Beregn andelen af udviklingsvalg
  const total = gameState.totalDevelopmentChoices + gameState.totalSecurityChoices;
  if (total === 0) return;
  const ratioDev = total > 0 ? (gameState.totalDevelopmentChoices / total) : 0;

  // Filtrér events ud fra deres condition(...)
  const possibleEvents = eventsList.filter(ev => ev.condition(ratioDev, gameState.time));
  if (possibleEvents.length === 0) return;

  // Vælg tilfældigt en event
  const chosenEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
  
  // Øg event-tælleren for denne PI
  gameState.eventsTriggeredThisPI++;

  // Anvend eventens effekt
  chosenEvent.effect(gameState);

  // Vis eventen i en modal
  openModal(
    `<h2>Hændelse!</h2><p>${chosenEvent.message}</p>`,
    `<button id="eventOk" class="modern-btn">OK</button>`
  );
  
  // Gør modal markant (pulserende)  
  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.classList.add('event-modal');
  }
  
  // Luk modal ved klik
  document.getElementById('eventOk').addEventListener('click', () => {
    if (modalContent) {
      modalContent.classList.remove('event-modal');
    }
    closeModal();
  });
}
