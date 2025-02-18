// scripts/main.js
import { openModal, closeModal } from './modal.js';
import { shuffleArray, getIcon } from './utils.js';
import { triggerRandomEvent } from './events.js';

/**
 * Global game state
 */
const gameState = {
  time: 45,
  security: 0,
  development: 0,
  currentTask: null,
  currentStepIndex: 0,
  tasksCompleted: 0,            
  highscore: 0,

  // Flags og counters
  eventsTriggeredThisPI: 0,
  totalSecurityChoices: 0,
  totalDevelopmentChoices: 0,
  skipHastendeFlag: false,

  // Nye felter til kobling med events
  cumulativeSecurityDebt: 0,
  taskOutcomes: {},  // { "OpgaveTitel": { quick: true/false } }

  // Opgavelister
  allTasks: [],
  tasks: [],
  choiceHistory: [],
  revisionCount: [],
  revisionMode: false,
  quickChoicesThisPI: 0,
  extraCABRiskNextPI: 0,
  extraCABRiskThisPI: 0,
  timePenaltyNextPI: 0,
  timeBonusNextPI: 0
};

window.gameState = gameState; // debugging formål

/** Lokationer */
const locationList = [
  "hospital",
  "dokumentation",
  "leverandør",
  "infrastruktur",
  "it‑jura",
  "cybersikkerhed"
];

/** Saml opgaver fra task-filer */
gameState.allTasks = [].concat(
  window.hospitalTasks,
  window.infrastrukturTasks,
  window.cybersikkerhedTasks
);
shuffleArray(gameState.allTasks);

// Tag fx 7 tilfældige opgaver
gameState.tasks = gameState.allTasks.splice(0, 7);
assignHastendeFlag(gameState.tasks);

function assignHastendeFlag(taskArr) {
  taskArr.forEach(t => {
    t.isHastende = (Math.random() < 0.1);
  });
}

/** Chart.js for Tid, Sikkerhed, Udvikling (stacked) */
const ctx = document.getElementById('kpiChart').getContext('2d');
const kpiChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Tid', 'Score'],
    datasets: [
      { label: 'Tid', data: [gameState.time, 0], backgroundColor: '#f39c12' },
      { label: 'Sikkerhed', data: [0, gameState.security], backgroundColor: '#27ae60' },
      { label: 'Udvikling', data: [0, gameState.development], backgroundColor: '#9b59b6' }
    ]
  },
  options: {
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true }
    },
    plugins: { legend: { display: true } }
  }
});

function updateDashboard() {
  if (gameState.time < 0) gameState.time = 0;
  kpiChart.data.datasets[0].data = [gameState.time, 0];
  kpiChart.data.datasets[1].data = [0, gameState.security];
  kpiChart.data.datasets[2].data = [0, gameState.development];
  kpiChart.update();
  updateNarrative();
}

function updateTaskProgress() {
  const progressEl = document.getElementById('taskProgress');
  if (progressEl) {
    progressEl.textContent = `Opgave ${gameState.tasksCompleted} / 5`;
  }
  updateNarrative();
}
updateTaskProgress();

/** Gør narrativeUpdate-teksten lidt mindre for at undgå klipning */
const narrativeEl = document.getElementById('narrativeUpdate');
if (narrativeEl) {
  narrativeEl.style.fontSize = '0.9rem';
}

/** Render lokationer i venstre spalte */
function renderLocations() {
  const locDiv = document.getElementById('locations');
  locDiv.innerHTML = "";
  locationList.forEach(loc => {
    const btn = document.createElement('button');
    btn.className = 'location-button';
    btn.innerHTML = loc.toUpperCase() + " " + getIcon(loc);
    btn.title = `Info om ${loc}`;
    btn.addEventListener('click', () => handleLocationClick(loc));
    locDiv.appendChild(btn);
  });
}
renderLocations();

/** highlightCorrectLocation */
function highlightCorrectLocation(correctLocation) {
  const buttons = document.querySelectorAll('.location-button');
  if (!correctLocation || !gameState.currentTask || gameState.currentStepIndex >= gameState.currentTask.steps.length) {
    buttons.forEach(btn => btn.classList.remove('highlight'));
    return;
  }
  buttons.forEach(btn => {
    if (btn.textContent.toLowerCase().includes(correctLocation.toLowerCase())) {
      btn.classList.add('highlight');
    } else {
      btn.classList.remove('highlight');
    }
  });
}

/** Tekstlig feedback i bunden (narrativeUpdate) */
function updateNarrative() {
  const narrativeEl = document.getElementById('narrativeUpdate');
  if (!narrativeEl) return;

  let text = "";
  const progress = gameState.tasksCompleted / 5;
  const total = gameState.totalDevelopmentChoices + gameState.totalSecurityChoices;
  const ratioDev = total > 0 ? (gameState.totalDevelopmentChoices / total) : 0;

  if (progress >= 1.0) {
    text += "Du har fuldført alle opgaver i denne PI – flot arbejde!";
  } else if (progress >= 0.8) {
    text += "Du nærmer dig målet for denne PI – fantastisk!";
  } else if (progress >= 0.6) {
    text += "Du er nu 60% af vejen til at gennemføre PI!";
  } else if (progress >= 0.4) {
    text += "Du er næsten halvvejs – fortsæt den gode indsats!";
  } else if (progress > 0) {
    text += "PI er i gang, og du er kommet i gang, men der er stadig en del at nå.";
  } else {
    text += "PI er i gang, vælg en opgave for at starte!";
  }

  if (gameState.time < 10) {
    text += " Pas på! Du er ved at løbe tør for Tid.";
  }
  if (total > 0) {
    if (ratioDev > 0.65) {
      text += " CAB advarer: Overdreven fokus på udvikling øger risikoen for hackerangreb!";
    } else if (ratioDev < 0.35) {
      text += " CAB advarer: For få udviklingsvalg kan føre til ineffektive arbejdsgange!";
    } else {
      text += " CAB bemærker: Din balance mellem udvikling og sikkerhed ser fornuftig ud.";
    }
  }

  narrativeEl.textContent = text;
}

/** Hjælpeknap med grundig tekst */
document.getElementById('helpButton').addEventListener('click', () => {
  const helpHTML = `
    <h2>Få Hjælp</h2>
    <p>Balancér tid, sikkerhed, udvikling – og husk, at quick-løsninger kan skabe sikkerhedsgæld, 
    som giver negative hændelser på sigt.</p>
    <p>Når du vælger en opgave, koster det 2 Tid, og hvert valg kan være “avanceret” (mere sikkert) eller “hurtigt”
    (koster mindre tid, men øger risikoen for meltdown-events).</p>
  `;
  openModal(helpHTML, `<button id="closeHelp" class="modern-btn">Luk</button>`);
  document.getElementById('closeHelp').addEventListener('click', () => closeModal());
});

/** Introduktion med et længere stykke tekst – kun ÉN pop-up ved load */
function showIntro() {
  const introHTML = `
    <h2>Velkommen til IT‑Tycoon</h2>
    <p>Dette er en strategisk simulation, hvor du balancerer 
    <strong>Udvikling</strong> og <strong>Sikkerhed</strong> under tidspres!</p>
    <ul style="text-align:left; margin:1rem auto; max-width:500px; line-height:1.4;">
      <li>Du starter med 45 Tid. Hver opgave koster 2 Tid at påtage sig.</li>
      <li>Hvert trin i opgaven kan vælges som “avanceret” (+mere i Sikkerhed/Dev, men -2 Tid) 
          eller “hurtigt” (+1, 0 Tid, men mulig sikkerhedsrisiko).</li>
      <li>Hvis du vælger for mange hurtige løsninger på sikkerhedsopgaver, 
          opbygger du <em>cumulativeSecurityDebt</em>. Store gæld => meltdown/hackerangreb.</li>
      <li>Fuldfør 5 opgaver for at afslutte en PI (Program Increment). 
          Tid, Sikkerhed og Udvikling nulstilles da, men <em>sikkerhedsgæld</em> bærer du med videre!</li>
    </ul>
    <p>God fornøjelse og husk: <strong>Balance is key!</strong></p>
  `;
  openModal(introHTML, `<button id="introOk" class="modern-btn">Fortsæt</button>`);
  document.getElementById('introOk').addEventListener('click', () => closeModal());
}

// Kald showIntro én gang ved side-load
showIntro();

/** "Vælg ny opgave"-knap */
document.getElementById('newTaskBtn').addEventListener('click', openTaskSelectionModal);
function openTaskSelectionModal() {
  if (gameState.currentTask) {
    openModal("<h2>Advarsel</h2><p>Du har allerede en aktiv opgave!</p>", `<button id="activeWarn" class="modern-btn">OK</button>`);
    document.getElementById('activeWarn').addEventListener('click', () => closeModal());
    return;
  }

  const hastendeExists = gameState.tasks.some(t => t.isHastende);

  let rows = "";
  gameState.tasks.forEach((task, index) => {
    const type = (task.focus === 'udvikling') ? "Udviklingsopgave" : "Sikkerhedsopgave";
    const hast = task.isHastende ? "Ja" : "Nej";
    rows += `
      <tr>
        <td>${task.title}</td>
        <td>${type}</td>
        <td>${hast}</td>
        <td><button class="commit-task-btn modern-btn" data-idx="${index}">Forpligt</button></td>
      </tr>
    `;
  });

  const hastendeNote = hastendeExists
    ? `<div style="background-color:#ffe9e9; border:1px solid red; padding:0.5rem;">
         <strong>Hastende opgaver!</strong> (+4 bonus, men +10% risiko, -5 point ved let løsning, 
         -3 point straf, hvis du ignorerer dem helt)
       </div>`
    : "";

  const modalBody = `
    <h2>Vælg en opgave</h2>
    ${hastendeNote}
    <table class="task-table">
      <thead>
        <tr>
          <th>Titel</th>
          <th>Type</th>
          <th>Haster</th>
          <th>Valg</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
  openModal(modalBody, `<button id="closeTaskModal" class="modern-btn">Luk</button>`);
  document.getElementById('closeTaskModal').addEventListener('click', () => closeModal());

  document.querySelectorAll('.commit-task-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = e.target.getAttribute('data-idx');
      const chosenTask = gameState.tasks[idx];
      if (hastendeExists && chosenTask && !chosenTask.isHastende) {
        gameState.skipHastendeFlag = true;
      }
      if (chosenTask) startTask(chosenTask);
    });
  });
}

function startTask(task) {
  gameState.currentTask = task;
  gameState.currentStepIndex = 0;
  gameState.choiceHistory = new Array(task.steps.length);
  gameState.revisionCount = new Array(task.steps.length).fill(0);
  gameState.revisionMode = false;

  closeModal();
  renderActiveTask(task);
}

function renderActiveTask(task) {
  const activeDiv = document.getElementById('activeTask');
  activeDiv.innerHTML = `<h2>Aktiv Opgave</h2>`;
  if (task) {
    activeDiv.innerHTML += `<h3>${task.title}</h3><p>${task.shortDesc}</p>`;
    if (task.narrativeIntro) {
      activeDiv.innerHTML += `<p>${task.narrativeIntro}</p>`;
    }
    if (task.steps && task.steps.length > 0) {
      let stepsHTML = "<p style='text-align:left;'>";
      task.steps.forEach((st, idx) => {
        if (idx < gameState.currentStepIndex) {
          stepsHTML += `${idx+1}. ${st.location.toUpperCase()} ${getIcon(st.location)} <span class="done">✔</span><br>`;
        } else {
          stepsHTML += `${idx+1}. ${st.location.toUpperCase()} ${getIcon(st.location)}<br>`;
        }
      });
      stepsHTML += "</p>";
      activeDiv.innerHTML += stepsHTML;
      const currentStep = task.steps[gameState.currentStepIndex];
      activeDiv.innerHTML += `
        <p><strong>Vælg lokation:</strong> 
          ${currentStep.location.toUpperCase()} ${getIcon(currentStep.location)}
        </p>
      `;
      highlightCorrectLocation(currentStep.location);
    }
  }
}

function handleLocationClick(clickedLoc) {
  if (!gameState.currentTask) {
    openModal("<h2>Advarsel</h2><p>Du har ikke valgt en opgave endnu!</p>", `<button class="modern-btn">OK</button>`);
    return;
  }
  const st = gameState.currentTask.steps[gameState.currentStepIndex];
  if (clickedLoc.toLowerCase() === st.location.toLowerCase()) {
    showStepChoices(st);
  } else {
    openModal(
      `<h2>Forkert lokation</h2><p>Du valgte ${clickedLoc.toUpperCase()}, men skal bruge ${st.location.toUpperCase()}.</p>`,
      `<button id="wrongLocBtn" class="modern-btn">OK</button>`
    );
    document.getElementById('wrongLocBtn').addEventListener('click', () => closeModal());
  }
}

function showStepChoices(step) {
  const bodyHTML = `<h2>${step.stepDescription}</h2>${step.stepContext || ""}`;
  
  let cATxt = step.choiceA.text;
  let cBTxt = step.choiceB.text;

  let footer = `
    <button id="choiceA" class="modern-btn">${step.choiceA.label} (${cATxt})</button>
    <button id="choiceB" class="modern-btn">${step.choiceB.label} (${cBTxt})</button>
  `;
  if (gameState.revisionCount[gameState.currentStepIndex] < 1) {
    footer += ` <button id="undoChoice" class="modern-btn">Fortryd</button>`;
  }
  openModal(bodyHTML, footer);

  if (document.getElementById('undoChoice')) {
    document.getElementById('undoChoice').addEventListener('click', () => {
      gameState.revisionCount[gameState.currentStepIndex]++;
      gameState.choiceHistory[gameState.currentStepIndex] = undefined;
      gameState.revisionMode = true;
      closeModal(() => showStepChoices(step));
    });
  }

  document.getElementById('choiceA').addEventListener('click', () => {
    applyChoice(step.choiceA, true);
    gameState.choiceHistory[gameState.currentStepIndex] = { title: step.choiceA.label, advanced: true };
    postChoiceLogic();
  });
  document.getElementById('choiceB').addEventListener('click', () => {
    applyChoice(step.choiceB, false);
    gameState.choiceHistory[gameState.currentStepIndex] = { title: step.choiceB.label, advanced: false };
    postChoiceLogic();
  });
}

function postChoiceLogic() {
  if (gameState.currentStepIndex === gameState.currentTask.steps.length - 1) {
    finishCurrentTask();
  } else {
    closeModal(() => {
      if (gameState.revisionMode) {
        gameState.revisionMode = false;
        cabApproval();
      } else {
        proceedToNextStep();
      }
    });
  }
}

function applyChoice(choice, advanced) {
  // Tidsforbrug
  gameState.time -= choice.applyEffect.timeCost;
  if (gameState.time < 0) gameState.time = 0;
  
  // Sikkerhed/udvikling
  const sc = choice.applyEffect.statChange.security || 0;
  const dv = choice.applyEffect.statChange.development || 0;
  gameState.security += sc;
  gameState.development += dv;

  updateDashboard();

  // Øg / sænk securityDebt, hvis det er en sikkerhedsopgave
  if (gameState.currentTask && gameState.currentTask.focus === 'sikkerhed') {
    if (!advanced) {
      gameState.cumulativeSecurityDebt++;
    } else {
      gameState.cumulativeSecurityDebt = Math.max(0, gameState.cumulativeSecurityDebt - 1);
    }
  }

  // Track quick vs advanced for meltdown events
  if (!gameState.taskOutcomes[gameState.currentTask.title]) {
    gameState.taskOutcomes[gameState.currentTask.title] = { quick: false };
  }
  if (!advanced) {
    gameState.taskOutcomes[gameState.currentTask.title].quick = true;
  }
  
  if (gameState.time <= 0) {
    checkGameOverCondition();
  }
}

function proceedToNextStep() {
  const t = gameState.currentTask;
  if (gameState.currentStepIndex < t.steps.length - 1) {
    gameState.currentStepIndex++;
    renderActiveTask(t);
    highlightCorrectLocation(t.steps[gameState.currentStepIndex].location);

    // Prøv at trigge event (hvis <2 events i denne PI)
    if (gameState.eventsTriggeredThisPI < 2) {
      triggerRandomEvent(gameState);
    }
  } else {
    cabApproval();
  }
}

function finishCurrentTask() {
  highlightCorrectLocation(null);
  gameState.currentStepIndex = gameState.currentTask.steps.length;
  closeModal(() => cabApproval());
}

function cabApproval() {
  closeModal(() => {
    // Evt. rework/godkendelse logik – her springer vi direkte
    showTaskSummary();
  });
}

function showTaskSummary() {
  let summaryHTML = "<h2>Opsummering</h2><ul>";
  gameState.choiceHistory.forEach((ch, i) => {
    if (ch) {
      summaryHTML += `<li>Trin ${i+1}: ${ch.title}</li>`;
    }
  });
  summaryHTML += "</ul>";

  // Hastende bonus
  if (gameState.currentTask.isHastende) {
    if (gameState.currentTask.focus === "udvikling") {
      gameState.development += 4;
      summaryHTML += `<p style="color:green;">Hastende bonus: +4 Udvikling!</p>`;
    } else {
      gameState.security += 4;
      summaryHTML += `<p style="color:green;">Hastende bonus: +4 Sikkerhed!</p>`;
    }
    updateDashboard();
  }

  openModal(summaryHTML, `<button id="afterSummary" class="modern-btn">Fortsæt</button>`);
  document.getElementById('afterSummary').addEventListener('click', () => closeModal(() => finishTask()));
}

function finishTask() {
  highlightCorrectLocation(null);
  gameState.tasksCompleted++;
  updateTaskProgress();

  openModal("<h2>Info</h2><p>Opgaven er fuldført!</p>", `<button id="taskDone" class="modern-btn">OK</button>`);
  document.getElementById('taskDone').addEventListener('click', () => {
    closeModal(() => {
      gameState.tasks = gameState.tasks.filter(t => t !== gameState.currentTask);
      const newOnes = gameState.allTasks.splice(0, 2);
      assignHastendeFlag(newOnes);
      gameState.tasks = gameState.tasks.concat(newOnes);

      document.getElementById('activeTask').innerHTML = '<h2>Aktiv Opgave</h2>';
      gameState.currentTask = null;
      gameState.currentStepIndex = 0;

      if (gameState.eventsTriggeredThisPI < 2) {
        triggerRandomEvent(gameState);
      }
      checkGameOverCondition();
    });
  });
}

/** Tjek game over */
function checkGameOverCondition() {
  if (gameState.time <= 0) {
    let message = "Tiden er opbrugt!";
    const totalPoints = gameState.security + gameState.development;
    if (totalPoints > gameState.highscore) {
      gameState.highscore = totalPoints;
    }
    message += `<br>Samlet score: ${totalPoints}<br>Highscore: ${gameState.highscore}`;
    openModal(`<h2>Spillet er slut</h2><p>${message}</p>`, "");
    setTimeout(() => location.reload(), 4000);
  } else if (gameState.tasksCompleted >= 5) {
    showPIFeedback();
  }
}

function showPIFeedback() {
  const totalPoints = gameState.security + gameState.development;
  if (totalPoints > gameState.highscore) {
    gameState.highscore = totalPoints;
  }

  if (gameState.eventsTriggeredThisPI < 2) {
    triggerRandomEvent(gameState);
  }

  let feedbackHTML = `
    <h2>PI Feedback</h2>
    <p>Flot! Du har gennemført 5 opgaver i denne PI.</p>
    <p>Score: <strong>${totalPoints}</strong> &nbsp;|&nbsp; Highscore: <strong>${gameState.highscore}</strong></p>
    <p>Din Tid, Sikkerhed og Udvikling nulstilles nu, men sikkerhedsgælden bærer du videre.</p>
    <p><em>Sikkerhedsgæld: ${gameState.cumulativeSecurityDebt}</em></p>
  `;
  openModal(feedbackHTML, `<button id="continuePI" class="modern-btn">Start næste PI</button>`);
  document.getElementById('continuePI').addEventListener('click', () => {
    closeModal(() => {
      gameState.tasksCompleted = 0;
      gameState.time = 40;
      gameState.security = 0;
      gameState.development = 0;
      gameState.totalSecurityChoices = 0;
      gameState.totalDevelopmentChoices = 0;
      gameState.eventsTriggeredThisPI = 0;
      // Vi bevarer cumulativeSecurityDebt => Bærer konsekvenser videre
      updateDashboard();
      updateTaskProgress();
      document.getElementById('activeTask').innerHTML = '<h2>Aktiv Opgave</h2>';
      gameState.currentTask = null;
      gameState.currentStepIndex = 0;
    });
  });
}
