// scripts/main.js
import { openModal, closeModal } from './modal.js';
import { shuffleArray, getIcon } from './utils.js';
import { triggerRandomEvent } from './events.js';

/**
 * Global game state (encapsulated within a module-level object)
 */
const gameState = {
    time: 45,
    security: 0,
    development: 0,
    currentTask: null,
    currentStepIndex: 0,
    tasksCompleted: 0,
    missionGoals: { security: 22, development: 22 },
    allTasks: [],
    tasks: [],
    choiceHistory: [],
    revisionCount: [],
    revisionMode: false,
    highscore: 0, // Initialize highscore
    quickChoicesThisPI: 0,
    extraCABRiskNextPI: 0,
    extraCABRiskThisPI: 0,
    totalSecurityChoices: 0,
    totalDevelopmentChoices: 0,
    timePenaltyNextPI: 0,
    timeBonusNextPI: 0,
    firstPI: true,
    skipHastendeFlag: false,
    eventsTriggeredThisPI: 0
};

// For debugging purposes ONLY.  Remove in production.
window.gameState = gameState;

const locationList = [
    "hospital",
    "dokumentation",
    "leverandør",
    "infrastruktur",
    "it‑jura",
    "cybersikkerhed"
];

// Load highscore from localStorage (if it exists)
gameState.highscore = parseInt(localStorage.getItem('highscore')) || 0;

// --- Helper Functions ---

function updateDashboard() {
    if (gameState.time < 0) gameState.time = 0;

    // Update Chart.js data.  Assumes kpiChart is defined globally (see later).
    kpiChart.data.datasets[0].data = [gameState.time, 0];
    kpiChart.data.datasets[1].data = [0, gameState.security];
    kpiChart.data.datasets[2].data = [0, gameState.development];
    kpiChart.data.labels = ['Tid', 'Score']; // Update labels.
    kpiChart.update();

    updateNarrative();
}

function updateTaskProgress() {
    const progressEl = document.getElementById('taskProgress');
    if (progressEl) { // Check if the element exists
        progressEl.textContent = `Opgave ${gameState.tasksCompleted} / 5`;
    }
    updateNarrative(); // Update narrative after task progress
}

function renderLocations() {
    const locDiv = document.getElementById('locations');
    if (!locDiv) {
        console.error("Locations element not found!");
        return;  // Exit if the element doesn't exist
    }
    locDiv.innerHTML = ""; // Clear any existing content
    locationList.forEach(loc => {
        const btn = document.createElement('button');
        btn.className = 'location-button';
        btn.innerHTML = `${loc.toUpperCase()} ${getIcon(loc)}`;
        btn.title = `Info om ${loc}`;
        btn.addEventListener('click', () => handleLocationClick(loc));
        locDiv.appendChild(btn);
    });
}

function highlightCorrectLocation(correctLocation) {
    const buttons = document.querySelectorAll('.location-button');
    if (!buttons || buttons.length === 0) {
        console.warn("No location buttons found"); // Warn, don't stop execution
        return;
    }
    // Only highlight if there's a current task and we're in a valid step
    if (!correctLocation || !gameState.currentTask || gameState.currentStepIndex >= gameState.currentTask.steps.length) {
        buttons.forEach(btn => btn.classList.remove('highlight'));
        return;
    }
    buttons.forEach(btn => {
        // Use textContent for comparison, and trim to handle extra spaces
        if (btn.textContent.trim().toLowerCase().includes(correctLocation.toLowerCase())) {
            btn.classList.add('highlight');
        } else {
            btn.classList.remove('highlight');
        }
    });
}

function updateNarrative() {
    const narrativeEl = document.getElementById('narrativeUpdate');
    if (!narrativeEl) return; // Exit if element not found

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

    narrativeEl.innerHTML = text;
}

function showHelp() {
    const helpHTML = `
    <h2>Få Hjælp</h2>
    <p><strong>Din Rolle som IT-forvalter</strong><br>
    Du skal navigere komplekse IT-systemer i en digital tidsalder. Balancer mellem <em>Udvikling</em> og <em>Sikkerhed</em>,
    mens du holder øje med din <em>Tid</em>. </p>
    <ul style="text-align:left; margin:0 auto; max-width:500px; line-height:1.5;">
      <li>⏳ <strong>Tid:</strong> Du starter en PI med 45 Tid; hver opgave koster 2 Tid. Rework kan koste ekstra.</li>
      <li>⚖️ <strong>Balance:</strong> Hvis du vælger >65% udvikling eller <35% udvikling, kan du opleve negative hændelser (hackerangreb eller ineffektiv drift).</li>
      <li>🚀 <strong>Hastende Opgaver:</strong> +4 bonus, men +10% risiko for CAB-afvisning. Vælger du en let løsning på en hastende opgave, får du -5 point i straf. Ignorerer du den helt, får du -3 point i næste CAB.</li>
      <li>💥 <strong>Events:</strong> Der kan maksimalt udløses 2 hændelser pr. PI. Hændelser kan være positive, negative eller neutrale. Sandsynlighed stiger ved ekstrem fordeling eller lav tid.</li>
      <li>🔍 <strong>CAB:</strong> Change Advisory Board evaluerer dine valg. Ved afvisning mister du 1 Tid (rework). Ved godkendelse får du en opsummering af dine valg.</li>
      <li>🎯 <strong>Slut på PI:</strong> Når du har gennemført 5 opgaver, sluttes PI med en opsummering. Din Tid, Sikkerhed og Udvikling nulstilles ved næste PI – dog kan særlige straffe eller bonusser overføres.</li>
    </ul>
  `;
    openModal(helpHTML, `<button id="closeHelp" class="modern-btn">Luk</button>`);
    document.getElementById('closeHelp').addEventListener('click', () => closeModal());
}

function showIntro() {
    const introText = `
    <h2>Velkommen til IT‑Tycoon!</h2>
    <ul style="text-align:left; margin:0 auto; max-width:550px; line-height:1.6;">
      <li>🚀 <strong>Mission:</strong> Du er IT‑forvalter og skal styre komplekse systemer i en digital tidsalder.</li>
      <li>⏱️ <strong>Tidspres:</strong> Hver beslutning koster Tid – vær opmærksom på ikke at løbe tør.</li>
      <li>⚖️ <strong>Balancér:</strong> Fokusér på både Udvikling og Sikkerhed for at undgå negative konsekvenser.</li>
      <li>🚨 <strong>Hastende opgaver:</strong> Giver ekstra bonus, men indeholder større risici.</li>
      <li>🔎 <strong>CAB-godkendelse:</strong> Dine ændringer vurderes efter hver opgave, og rework kan koste dig yderligere tid.</li>
    </ul>
    <p style="margin-top:1rem;">Er du klar til at forme fremtidens IT-løsninger?</p>
  `;
    openModal(introText, `<button id="continueIntro" class="modern-btn">Fortsæt</button>`);
    document.getElementById('continueIntro').addEventListener('click', () => closeModal(() => showTutorial()));
}

function showTutorial() {
    const tutText = `
    <h2>Tutorial</h2>
    <ul style="text-align:left; margin:0 auto; max-width:550px; line-height:1.6;">
      <li>1️⃣ Klik på “Vælg ny opgave” for at åbne opgavelisten.</li>
      <li>2️⃣ Hver opgave koster 2 Tid. Vælg trin ved at klikke på korrekt lokation.</li>
      <li>3️⃣ <strong>Udvikling</strong> eller <strong>Sikkerhed</strong> påvirkes af dine valg.
          Ekstreme valg kan udløse <em>events</em> (fx hackerangreb).</li>
      <li>4️⃣ <strong>Hastende Opgaver</strong> giver +4 bonus, men +10% risiko for afvisning.
          Vælger du let løsning, -5 point. Ignorerer du en hastende opgave helt, -3 point i næste CAB.</li>
      <li>5️⃣ <strong>Max 2 events pr. PI</strong>. Hver event kan være positiv, negativ eller neutral.</li>
      <li>6️⃣ <strong>Slut:</strong> Efter 5 opgaver viser en opsummering din score,
          hvorefter en ny PI starter.</li>
    </ul>
    <p style="margin-top:1rem;">Held og lykke – og husk at holde balancen!</p>
  `;
    openModal(tutText, `<button id="closeTut" class="modern-btn">Luk</button>`);
    document.getElementById('closeTut').addEventListener('click', () => closeModal());
}

// --- Task Management ---

function openTaskSelectionModal() {
    if (gameState.currentTask) {
        openModal("<h2>Advarsel</h2><p>Du har allerede en aktiv opgave!</p>", `<button id="activeWarn" class="modern-btn">OK</button>`);
        document.getElementById('activeWarn').addEventListener('click', closeModal);
        return;
    }

    const hastendeExists = gameState.tasks.some(t => t.isHastende);
    let rows = "";

    gameState.tasks.forEach((task, index) => {
        const type = (task.focus === 'udvikling') ? "Udviklingsopgave" : "Sikkerhedsopgave";
        const hast = task.isHastende ? "Ja" : "Nej";
        rows += `
      <tr>
        <td><span class="math-inline">\{task\.title\}</td\>
<td\></span>{type}</td>
        <td><span class="math-inline">\{hast\}</td\>
<td\><button class\="commit\-task\-btn modern\-btn" data\-idx\="</span>{index}">Forpligt</button></td>
      </tr>
    `;
    });

    const hastendeNote = hastendeExists
        ? `<div style="background-color:#ffe9e9; border:1px solid red; padding:0.5rem;">
         <strong>Hastende opgaver!</strong> (+4 bonus, +10% risiko, -5 point hvis let løsning,
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
    document.getElementById('closeTaskModal').addEventListener('click', closeModal);

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
    gameState.choiceHistory = new Array(task.steps.length).fill(null); // Initialize with nulls
    gameState.revisionCount = new Array(task.steps.length).fill(0);
    gameState.revisionMode = false;
    closeModal();
    renderActiveTask(task);
}

function renderActiveTask(task) {
    const activeDiv = document.getElementById('activeTask');
    if (!activeDiv) {
        console.error("Active task container not found");
        return;
    }
    activeDiv.innerHTML = `<h2>Aktiv Opgave</h2>`;
    if (task) {
        activeDiv.innerHTML += `<h3><span class="math-inline">\{task\.title\}</h3\><p\></span>{task.shortDesc}</p>`;
        if (task.narrativeIntro) {
            activeDiv.innerHTML += `<p>${task.narrativeIntro}</p>`;
        }
        if (task.steps && task.steps.length > 0) {
            let stepsHTML = "<p style='text-align:left;'>";
            task.steps.forEach((st, idx) => {
                // Show checkmark if step is completed, otherwise show location
                if (idx < gameState.currentStepIndex) {
                    stepsHTML += `${idx + 1}. ${st.location.toUpperCase()} ${getIcon(st.location)} <span class="done">✔</span><br>`;
                } else {
                    stepsHTML += `${idx + 1}. ${st.location.toUpperCase()} ${getIcon(st.location)}<br>`;
                }
            });
            stepsHTML += "</p>";
            activeDiv.innerHTML += stepsHTML;

            // Show current step information
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
    const currentStep = gameState.currentTask.steps[gameState.currentStepIndex];
    if (!currentStep) {
        console.error("Current step is undefined!"); // Debugging check
        return;
    }

    if (clickedLoc.toLowerCase() === currentStep.location.toLowerCase()) {
        showStepChoices(currentStep);
    } else {
        openModal(
            `<h2>Forkert lokation</h2><p>Du valgte ${clickedLoc.toUpperCase()}, men skal bruge ${currentStep.location.toUpperCase()}.</p>`,
            `<button id="wrongLocBtn" class="modern-btn">OK</button>`
        );
        document.getElementById('wrongLocBtn').addEventListener('click', () => closeModal());
    }
}

function showStepChoices(step) {
    const bodyHTML = `<h2><span class="math-inline">\{step\.stepDescription\}</h2\></span>{step.stepContext || ""}`;

    // Refactored choice handling into a separate function
    const choiceHandler = (choice, isAdvanced) => {
        const appliedChoice = {
            ...choice,
            applyEffect: { ...choice.applyEffect, timeCost: isAdvanced ? 2 : 0 }, // Correct timeCost
