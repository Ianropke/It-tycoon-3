};

    let cATxt = step.choiceA.text.replace(
        /-?\d+\s*tid/,
        "<span style='color:#f44336; font-weight:bold;'>-2 tid</span>"
    );
    let cBTxt = step.choiceB.text.replace(
        /-?\d+\s*tid/,
        "<span style='color:#43A047; font-weight:bold;'>0 tid</span>"
    );

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

    document.getElementById('choiceA').addEventListener('click', () => choiceHandler(step.choiceA, true));
    document.getElementById('choiceB').addEventListener('click', () => choiceHandler(step.choiceB, false));
}
function finishCurrentTask() {
  highlightCorrectLocation(null);
  gameState.currentStepIndex = gameState.currentTask.steps.length;
  closeModal(() => cabApproval());
}

function applyChoice(choice) {
  gameState.time -= choice.applyEffect.timeCost;
  if (gameState.time < 0) gameState.time = 0;
  if (choice.applyEffect.statChange.security) {
    gameState.security += choice.applyEffect.statChange.security;
  }
  if (choice.applyEffect.statChange.development) {
    gameState.development += choice.applyEffect.statChange.development;
  }
  updateDashboard();
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
    // Forsøg at udløse event – men kun hvis vi ikke har nået 2 events i denne PI
    if (gameState.eventsTriggeredThisPI < 2) {
      triggerRandomEvent(gameState);
    }
  } else {
    cabApproval();
  }
}

function checkGameOverCondition() {
    if (gameState.time <= 0) {
        let message = "Tiden er opbrugt!";
        const totalPoints = gameState.security + gameState.development;

        if (totalPoints > gameState.highscore) {
            gameState.highscore = totalPoints;
            // Save highscore to localStorage
            localStorage.setItem('highscore', gameState.highscore);
            message += `<br>Ny highscore: ${gameState.highscore}!`;
        } else {
          message += `<br>Samlet score: ${totalPoints}<br>Highscore: ${gameState.highscore}`;
        }

        openModal(`<h2>Spillet er slut</h2><p>${message}</p>`, "");
        setTimeout(() => location.reload(), 4000); // Reload after 4 seconds

    } else if (gameState.tasksCompleted >= 5) {
        showPIFeedback();
    }
}

function cabApproval() {
  closeModal(() => {
    const t = gameState.currentTask;
    let focusKPI = (t.focus === 'udvikling') ? gameState.development : gameState.security;

    // 1) Straf for skipHastende
    let skipHastendePenalty = "";
    if (gameState.skipHastendeFlag) {
      focusKPI = Math.max(0, focusKPI - 3);
      skipHastendePenalty = "<p style='color:red;'>Du sprang en hastende opgave over – straf: -3 point!</p>";
      gameState.skipHastendeFlag = false; // Reset the flag
    }

    // 2) Straf for let løsning i en hastende opgave
    let penaltyNote = "";
    if (t.isHastende && gameState.choiceHistory.some(ch => ch && ch.advanced === false)) {
      focusKPI = Math.max(0, focusKPI - 5);
      penaltyNote = `<p style="color:red;">Du har fået 5 point i straf for at vælge den lette løsning på en hastende opgave.</p>`;
    }

    const allAdvanced = gameState.choiceHistory.every(ch => ch && ch.advanced);
    let chance = allAdvanced ? 1 : Math.min(1, focusKPI / 22);

    let extraNote = skipHastendePenalty + penaltyNote;

    if (t.isHastende) {
      chance -= 0.1;
      if (chance < 0) chance = 0;
      extraNote += `<p style="color:red;">Hastende opgave: +10% ekstra risiko, +4 bonus ved succes.</p>`;
    }

    if (gameState.extraCABRiskThisPI > 0) {
      chance -= gameState.extraCABRiskThisPI;
      if (chance < 0) chance = 0;
      extraNote += `<p style='color:red;'>Ekstra risiko fra forrige PI: +${Math.round(gameState.extraCABRiskThisPI * 100)}%.</p>`;
    }

    const approvalPct = Math.floor(chance * 100);
    const riskPct = 100 - approvalPct;

    const cabHTML = `
      <h2>CAB</h2>
      ${extraNote}
      <p>Godkendelsesprocent: ${approvalPct}%</p>
      <p>Risiko for afvisning: ${riskPct}%</p>
    `;
    let footHTML = `<button id="evaluateCAB" class="modern-btn">Evaluér nu</button>`;
    if (!allAdvanced) {
      footHTML += ` <button id="goBackCAB" class="modern-btn">Gå tilbage</button>`;
    }

    openModal(cabHTML, footHTML);

    document.getElementById('evaluateCAB').addEventListener('click', () => {
      if (Math.random() < chance) {
        showTaskSummary();
      } else {
        openModal("<h2>CAB Afvisning</h2><p>Rework er påkrævet, og du mister 1 Tid.</p>", `<button id="reworkBtn" class="modern-btn">OK</button>`);
        document.getElementById('reworkBtn').addEventListener('click', () => {
          gameState.time -= 1;
          if (gameState.time < 0) gameState.time = 0; // Ensure time doesn't go negative
          updateDashboard();
          closeModal(() => cabApproval());
        });
      }
    });

    if (!allAdvanced) {
      document.getElementById('goBackCAB').addEventListener('click', () => showRevisionOptions());
    }
  });
}
function showRevisionOptions() {
    let revisableIndices = [];
    for (let i = 0; i < gameState.choiceHistory.length; i++) {
        if (gameState.choiceHistory[i] && !gameState.choiceHistory[i].advanced && gameState.revisionCount[i] < 1) {
            revisableIndices.push(i);
        }
    }

    if (revisableIndices.length === 0) {
        openModal("<h2>Ingen revidérbare trin</h2><p>Alle trin er enten avancerede eller allerede revideret.</p>", `<button id="noRev" class="modern-btn">OK</button>`);
        document.getElementById('noRev').addEventListener('click', () => closeModal(() => cabApproval()));
        return;
    }

    let listHTML = "<h2>Vælg et trin at revidere</h2><ul>";
    revisableIndices.forEach(idx => {
        let stDesc = gameState.currentTask.steps[idx].stepDescription;
        listHTML += `<li><button class="revisionBtn modern-btn" data-idx="${idx}">Trin ${idx + 1}: ${stDesc}</button></li>`;
    });
    listHTML += "</ul>";
    openModal(listHTML, "");

    document.querySelectorAll('.revisionBtn').forEach(b => {
        b.addEventListener('click', (e) => {
            let chosenIdx = parseInt(e.target.getAttribute('data-idx'));
            gameState.revisionCount[chosenIdx]++;
            gameState.revisionMode = true; // Set revision mode
            closeModal(() => {
                gameState.currentStepIndex = chosenIdx;
                showStepChoices(gameState.currentTask.steps[chosenIdx]);
            });
        });
    });
}

function showTaskSummary() {
    let bonusNote = "";
    if (gameState.currentTask.isHastende) {
        if (gameState.currentTask.focus === "udvikling") {
            gameState.development += 4;
            bonusNote = `<p style="color:green;">Hastende bonus: +4 Udvikling!</p>`;
        } else {
            gameState.security += 4;
            bonusNote = `<p style="color:green;">Hastende bonus: +4 Sikkerhed!</p>`;
        }
        updateDashboard();
    }

    let summaryHTML = "<h2>Opsummering</h2><ul>";
    gameState.choiceHistory.forEach((ch, i) => {
        if (ch) {
            summaryHTML += `<li>Trin ${i + 1}: ${ch.title}</li>`;
        }
    });
    summaryHTML += "</ul>" + bonusNote;

    openModal(summaryHTML, `<button id="afterSummary" class="modern-btn">Fortsæt</button>`);
    document.getElementById('afterSummary').addEventListener('click', () => closeModal(() => finishTask()));
}
function finishTask() {
    highlightCorrectLocation(null); // Clear any highlights
    gameState.tasksCompleted++;
    updateTaskProgress();

    openModal("<h2>Info</h2><p>Opgaven er fuldført!</p>", `<button id="taskDone" class="modern-btn">OK</button>`);
    document.getElementById('taskDone').addEventListener('click', () => {
        closeModal(() => {
            // Remove the completed task
            gameState.tasks = gameState.tasks.filter(t => t !== gameState.currentTask);
            const newOnes = gameState.allTasks.splice(0, 2);
            assignHastendeFlag(newOnes); // Correctly assign hastende flag to new tasks
            gameState.tasks = gameState.tasks.concat(newOnes);


            document.getElementById('activeTask').innerHTML = '<h2>Aktiv Opgave</h2>';
            gameState.currentTask = null;
            gameState.currentStepIndex = 0;

            // Trigger event between tasks (if under 2 events)
            if (gameState.eventsTriggeredThisPI < 2) {
                triggerRandomEvent(gameState);
            }
            checkGameOverCondition(); // Check for game over or PI completion
        });
    });
}

function showPIFeedback() {
    const totalPoints = gameState.security + gameState.development;

    if (totalPoints > gameState.highscore) {
        gameState.highscore = totalPoints;
        // Save highscore to localStorage
        localStorage.setItem('highscore', gameState.highscore);
    }

     // Evt. event her (begrænset til 2 pr. PI)
    if (gameState.eventsTriggeredThisPI < 2) {
        triggerRandomEvent(gameState);
    }

    let feedbackHTML = `
    <h2>PI Feedback</h2>
    <p>Fantastisk arbejde! Du har gennemført 5 opgaver.</p>
    <p>Din score i dette PI: <strong>${totalPoints}</strong></p>
    <p>Din højeste score: <strong>${gameState.highscore}</strong></p>
    <p>Din Tid, Sikkerhed og Udvikling nulstilles nu, og et nyt PI starter.</p>
  `;

    openModal(feedbackHTML, `<button id="continuePI" class="modern-btn">Start Næste PI</button>`);
    document.getElementById('continuePI').addEventListener('click', () => {
        closeModal(() => {
            gameState.tasksCompleted = 0; // Reset completed tasks
            let newTime = 40;
            if(gameState.timePenaltyNextPI > 0){
                newTime -= gameState.timePenaltyNextPI;
                if(newTime < 0) newTime = 0;
                gameState.timePenaltyNextPI = 0;
            }
             if(gameState.timeBonusNextPI > 0){
                newTime += gameState.timeBonusNextPI;
                gameState.timeBonusNextPI = 0;
            }

            gameState.time = newTime;
            gameState.security = 0; // Reset security
            gameState.development = 0; // Reset development
            gameState.totalSecurityChoices = 0;
            gameState.totalDevelopmentChoices = 0;
            gameState.extraCABRiskThisPI = 0; //Carry over risk
            gameState.extraCABRiskNextPI = 0;
            gameState.quickChoicesThisPI = 0;
            gameState.skipHastendeFlag = false;
            gameState.eventsTriggeredThisPI = 0; // Reset event counter

            updateDashboard();
            updateTaskProgress();
            document.getElementById('activeTask').innerHTML = '<h2>Aktiv Opgave</h2>';
            gameState.currentTask = null;
            gameState.currentStepIndex = 0;

            if (gameState.firstPI) {
                gameState.firstPI = false; // No longer the first PI
            }
        });
    });
}


// --- Initialization ---
gameState.allTasks = [].concat(
  window.hospitalTasks,
  window.infrastrukturTasks,
  window.cybersikkerhedTasks
);
shuffleArray(gameState.allTasks);
gameState.tasks = gameState.allTasks.splice(0, 7);
assignHastendeFlag(gameState.tasks);

function assignHastendeFlag(taskArr) {
    taskArr.forEach(t => {
        t.isHastende = (Math.random() < 0.1);
    });
}

const ctx = document.getElementById('kpiChart').getContext('2d');
const kpiChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Tid', 'Score'], // Initial labels
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
        plugins: {
            legend: { display: true }
        }
    }
});

// --- Event Listeners ---

document.getElementById('helpButton').addEventListener('click', showHelp);
document.getElementById('newTaskBtn').addEventListener('click', openTaskSelectionModal);


// --- Initial Setup ---

renderLocations();
updateDashboard(); // Initial dashboard update
updateTaskProgress(); // Initial task progress
if (gameState.firstPI) {
    showIntro();
}

export { gameState, updateDashboard, openModal, closeModal };
