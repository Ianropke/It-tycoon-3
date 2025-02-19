// scripts/events.js
import { openModal, closeModal } from './modal.js';

/**
 * eventsList
 * 
 * Her har vi 8 events, der hver condition(...) enten:
 * - Checker om en bestemt opgave fra "infrastrukturTasks" eller "cybersikkerhedTasks"
 *   er løst "quick" (=> meltdown/angreb),
 * - Eller checker om "cumulativeSecurityDebt" er høj/lav,
 * - Eller kombinerer begge faktorer (fx meltdown hvis quick-løsning + gæld > X).
 *
 * Du kan udvide med flere, hvis du har flere specifikke opgaver, du vil koble hændelser til.
 */

const eventsList = [
  // 1) HPC meltdown
  {
    name: "💥 HPC meltdown",
    condition: (gameState) => {
      // HPC meltdown trigges, hvis opgaven "HPC-klynge til laboratorieanalyser"
      // blev løst med quick-løsning (quick: true), OG securityDebt er relativt høj
      const hpc = gameState.taskOutcomes["HPC-klynge til laboratorieanalyser"];
      if (!hpc) return false; // HPC-opgaven er ikke gennemført => ingen meltdown
      if (!hpc.quick) return false; // HPC løst avanceret => meltdown forhindret
      // Krav om en vis gæld for meltdown
      return (gameState.cumulativeSecurityDebt >= 3);
    },
    message: "Din HPC-klynge, konfigureret på en hurtig måde, går nu ned! Du mister 3 Tid på brand-slukning \u{1F525}",
    effect: (gameState) => {
      gameState.time -= 3;
      if (gameState.time < 0) gameState.time = 0;
    }
  },

  // 2) Container meltdown
  {
    name: "🛑 Container meltdown",
    condition: (gameState) => {
      // "Containerisering af hospitalets services" opgave
      const cont = gameState.taskOutcomes["Containerisering af hospitalets services"];
      if (!cont) return false;
      // Hvis cont.quick == true => meltdown
      // Evt. kun hvis securityDebt er ret høj
      return cont.quick && gameState.cumulativeSecurityDebt >= 2;
    },
    message: "Din container-orkestrering var sat op med for løse ender. Pludselig bryder en kritisk service sammen! -2 Tid.",
    effect: (gameState) => {
      gameState.time -= 2;
      if (gameState.time < 0) gameState.time = 0;
    }
  },

  // 3) LIMS data leak
  {
    name: "🔓 LIMS data leak",
    condition: (gameState) => {
      // "Kryptering af LIMS-data" fra cybersikkerhedTasks
      const lims = gameState.taskOutcomes["Kryptering af LIMS-data"];
      if (!lims) return false;
      // Læk sker kun, hvis man valgte en minimal (quick) kryptering
      // OG cumulativeSecurityDebt er stor
      return lims.quick && gameState.cumulativeSecurityDebt >= 4;
    },
    message: "Din minimal kryptering af LIMS-data har ført til et datalæk! Du mister 4 Tid på krisehåndtering \u{1F4C5}",
    effect: (gameState) => {
      gameState.time -= 4;
      if (gameState.time < 0) gameState.time = 0;
    }
  },

  // 4) Telemed meltdown
  {
    name: "📉 Telemed meltdown",
    condition: (gameState) => {
      // "Implementering af telemedicin" fra hospitalTasks
      const tele = gameState.taskOutcomes["Implementering af telemedicin"];
      if (!tele) return false;
      // meltdown, hvis quick-løsning og securityDebt >= 3
      return tele.quick && gameState.cumulativeSecurityDebt >= 3;
    },
    message: "Din telemedicin-løsning var sårbar – pludselig kan patienter ikke tilgå videokonsultation! -3 Tid.",
    effect: (gameState) => {
      gameState.time -= 3;
      if (gameState.time < 0) gameState.time = 0;
    }
  },

  // 5) EHR meltdown
  {
    name: "💥 EHR meltdown",
    condition: (gameState) => {
      // "Opgradering af EHR" i hospitalTasks
      const ehr = gameState.taskOutcomes["Opgradering af EHR"];
      if (!ehr) return false;
      // meltdown ved quick-løsning + stor debt
      return ehr.quick && gameState.cumulativeSecurityDebt >= 2;
    },
    message: "Dit EHR-system oplever kritisk nedbrud grundet halvfærdig opgradering! -2 Tid.",
    effect: (gameState) => {
      gameState.time -= 2;
      if (gameState.time < 0) gameState.time = 0;
    }
  },

  // 6) AI meltdown
  {
    name: "🤖 AI meltdown",
    condition: (gameState) => {
      // "Implementering af AI-diagnoseværktøj" i hospitalTasks
      const ai = gameState.taskOutcomes["Implementering af AI-diagnoseværktøj"];
      if (!ai) return false;
      // meltdown ved quick-løsning + stor debt
      return ai.quick && gameState.cumulativeSecurityDebt >= 3;
    },
    message: "Dit AI-diagnoseværktøj går amok pga. mangelfuld opsætning – fejldiagnoser spreder panik! -3 Tid.",
    effect: (gameState) => {
      gameState.time -= 3;
      if (gameState.time < 0) gameState.time = 0;
    }
  },

  // 7) Generisk Hacker Infiltration pga. stor sikkerhedsgæld
  {
    name: "👾 Hacker infiltration",
    condition: (gameState) => {
      // Ingen bestemt opgave, men trigges hvis cumulativeSecurityDebt >= 6
      return gameState.cumulativeSecurityDebt >= 6;
    },
    message: "En hackergruppe udnytter dine mange 'huller'! Du mister 5 Tid på nødlukning og rework \u{1F4A5}",
    effect: (gameState) => {
      gameState.time -= 5;
      if (gameState.time < 0) gameState.time = 0;
    }
  },

  // 8) Positiv hændelse ved lav sikkerhedsgæld
  {
    name: "🛡️ Sikkerhedsteam roser indsatsen",
    condition: (gameState) => {
      // Kun trigges, hvis man har holdt cumulativeSecurityDebt nede
      return gameState.cumulativeSecurityDebt <= 1;
    },
    message: "Du har holdt sikkerhedsgælden på et minimum – teamet roser dig! +1 i Sikkerhed \u{1F4AA}",
    effect: (gameState) => {
      gameState.security += 1;
    }
  }
];

/**
 * triggerRandomEvent(gameState)
 * 
 * Udløser én af ovenstående events baseret på:
 * - Grund-sandsynlighed (0.5 * 0.65 = 0.325),
 * - plus en stigning ift. 'cumulativeSecurityDebt' (f.eks. + 2% pr. point).
 * 
 * Vi tjekker eventsList.filter(...) for at finde events,
 * der har condition(...) = true.
 * 
 * Der kan maksimalt komme 2 events pr. PI (gameState.eventsTriggeredThisPI < 2).
 */
export function triggerRandomEvent(gameState) {
  // Spilleren skal have løst mindst 2 opgaver
  if (gameState.tasksCompleted < 2) return;
  
  // Maksimalt 2 hændelser pr. PI
  if (gameState.eventsTriggeredThisPI >= 2) return;

  // Start-chance
  let eventChance = 0.5 * 0.65; // ~0.325

  // Forøg chancen baseret på sikkerhedsgæld
  // Her +2% pr. "point" i cumulativeSecurityDebt. Justér selv tallet.
  eventChance += 0.02 * gameState.cumulativeSecurityDebt;

  // Hvis tilstanden for en event er 0.4, men random = 0.7 => ingen event
  if (Math.random() > eventChance) return;

  // Filtrer events, hvor condition(...) = true
  const possibleEvents = eventsList.filter(ev => ev.condition(gameState));
  if (possibleEvents.length === 0) return;

  // Vælg én tilfældig event
  const chosenEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
  
  // Øg event-tælleren for denne PI
  gameState.eventsTriggeredThisPI++;

  // Anvend eventens effekt
  chosenEvent.effect(gameState);

  // Vis event i modal
  openModal(
    `<h2>Hændelse!</h2><p>${chosenEvent.message}</p>`,
    `<button id="eventOk" class="modern-btn">OK</button>`
  );

  // Gør modal markant
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
