// scripts/events.js
import { openModal, closeModal } from './modal.js';

/**
 * 10 meltdown-lignende events:
 * Hver event trigges, hvis opgaven løses "quick" (=> gameState.taskOutcomes[title].quick === true)
 * OG hvis man har en vis 'cumulativeSecurityDebt' (>= X).
 * 
 * Navnene skal matche EXACT de titler, du har i tasks' "title" felt.
 * Justér thresholds og tid-straf, som du vil.
 */
const eventsList = [
  // 1) HPC meltdown (infrastrukturTasks)
  {
    name: "💥 HPC meltdown",
    condition: (gameState) => {
      const key = "HPC-klynge til laboratorieanalyser"; // fra infrastrukturTasks
      const outcome = gameState.taskOutcomes[key];
      if (!outcome) return false;
      return outcome.quick && gameState.cumulativeSecurityDebt >= 3;
    },
    message: "Din HPC-klynge, der blev sat op med en hurtig løsning, går ned! Du mister 3 Tid på brand-slukning.",
    effect: (gameState) => {
      gameState.time -= 3;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  // 2) Container meltdown (infrastrukturTasks)
  {
    name: "🛑 Container meltdown",
    condition: (gameState) => {
      const key = "Containerisering af hospitalets services";
      const outcome = gameState.taskOutcomes[key];
      if (!outcome) return false;
      return outcome.quick && gameState.cumulativeSecurityDebt >= 2;
    },
    message: "Din container-opsætning var ufærdig, og en vigtig service krakelerer pludselig! -2 Tid.",
    effect: (gameState) => {
      gameState.time -= 2;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  // 3) Netværksopgradering meltdown (infrastrukturTasks)
  {
    name: "🕸️ Netværks meltdown",
    condition: (gameState) => {
      const key = "Netværksopgradering"; // Standard i infrastrukturTasks?
      const outcome = gameState.taskOutcomes[key];
      if (!outcome) return false;
      return outcome.quick && gameState.cumulativeSecurityDebt >= 3;
    },
    message: "Netværket fejer pludselig sammen, pga. en halv løsning. Du mister 3 Tid på genstart og fejlfinding.",
    effect: (gameState) => {
      gameState.time -= 3;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  // 4) Sikkerhedsopdatering meltdown (cybersikkerhedTasks)
  {
    name: "💿 Software meltdown",
    condition: (gameState) => {
      const key = "Sikkerhedsopdatering af software";
      const outcome = gameState.taskOutcomes[key];
      if (!outcome) return false;
      return outcome.quick && gameState.cumulativeSecurityDebt >= 3;
    },
    message: "Dine hurtige sikkerhedsopdateringer var utilstrækkelige – en gammel exploit lukker systemet ned! -3 Tid.",
    effect: (gameState) => {
      gameState.time -= 3;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  // 5) 2FA meltdown (cybersikkerhedTasks)
  {
    name: "🔐 2FA meltdown",
    condition: (gameState) => {
      const key = "Implementering af to-faktor autentifikation";
      const outcome = gameState.taskOutcomes[key];
      if (!outcome) return false;
      return outcome.quick && gameState.cumulativeSecurityDebt >= 2;
    },
    message: "Din to-faktor-løsning var sat op uden reelle kontroller. Hackere omgår systemet, du mister 2 Tid.",
    effect: (gameState) => {
      gameState.time -= 2;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  // 6) LIMS meltdown (hospitalTasks)
  {
    name: "🔓 LIMS meltdown",
    condition: (gameState) => {
      const key = "Nyt LIMS"; // fx "Nyt LIMS" i hospitalTasks
      const outcome = gameState.taskOutcomes[key];
      if (!outcome) return false;
      return outcome.quick && gameState.cumulativeSecurityDebt >= 3;
    },
    message: "Det nye LIMS var ikke robust nok – meltdown i systemet! Du mister 3 Tid på at rulle tilbage.",
    effect: (gameState) => {
      gameState.time -= 3;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  // 7) EHR meltdown (hospitalTasks)
  {
    name: "📉 EHR meltdown",
    condition: (gameState) => {
      const key = "Opgradering af EHR";
      const outcome = gameState.taskOutcomes[key];
      if (!outcome) return false;
      return outcome.quick && gameState.cumulativeSecurityDebt >= 2;
    },
    message: "Dit EHR-system går ned pga. overfladisk opgradering. -2 Tid.",
    effect: (gameState) => {
      gameState.time -= 2;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  // 8) AI meltdown (hospitalTasks)
  {
    name: "🤖 AI meltdown",
    condition: (gameState) => {
      const key = "Implementering af AI-diagnoseværktøj";
      const outcome = gameState.taskOutcomes[key];
      if (!outcome) return false;
      return outcome.quick && gameState.cumulativeSecurityDebt >= 3;
    },
    message: "AI-diagnoseværktøjet fejlmelder patienter pga. sløset implementering. -3 Tid.",
    effect: (gameState) => {
      gameState.time -= 3;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  // 9) Telemed meltdown (hospitalTasks)
  {
    name: "📡 Telemed meltdown",
    condition: (gameState) => {
      const key = "Implementering af telemedicin";
      const outcome = gameState.taskOutcomes[key];
      if (!outcome) return false;
      return outcome.quick && gameState.cumulativeSecurityDebt >= 3;
    },
    message: "Telemedicin-løsningen var for hastigt sat op – brud på videoforbindelsen! -3 Tid.",
    effect: (gameState) => {
      gameState.time -= 3;
      if (gameState.time < 0) gameState.time = 0;
    }
  },
  // 10) Generisk hacker infiltration (ingen bestemt opgave, blot stor gæld)
  {
    name: "👾 Hacker infiltration",
    condition: (gameState) => {
      return gameState.cumulativeSecurityDebt >= 6; 
    },
    message: "En hackergruppe udnytter dine mange løse ender – systemer lammes, du mister 5 Tid \u{1F4A5}",
    effect: (gameState) => {
      gameState.time -= 5;
      if (gameState.time < 0) gameState.time = 0;
    }
  }
];

/**
 * triggerRandomEvent(gameState)
 * - Maks 2 events pr. PI
 * - Grundchance ~0.325 + (0.02 * securityDebt)
 * - Vælg tilfældigt én event fra dem, hvor condition(...) = true
 */
export function triggerRandomEvent(gameState) {
  // Mindst 2 opgaver løst, og maks 2 events pr. PI
  if (gameState.tasksCompleted < 2) return;
  if (gameState.eventsTriggeredThisPI >= 2) return;

  // Start-chance
  let eventChance = 0.5 * 0.65; // ~0.325
  // Forøg ift. securityDebt
  eventChance += 0.02 * gameState.cumulativeSecurityDebt;

  if (Math.random() > eventChance) return;

  // Filtrer events, hvis condition er true
  const possibleEvents = eventsList.filter(ev => ev.condition(gameState));
  if (possibleEvents.length === 0) return;

  // Vælg én tilfældig event
  const chosenEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
  
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
