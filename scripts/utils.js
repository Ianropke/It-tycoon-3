// scripts/utils.js

/**
 * shuffleArray
 * Fisher‑Yates-algoritmen:
 * Bland en array in-place, så elementerne ligger i en tilfældig rækkefølge.
 */
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * getIcon
 * Returnér en emoji baseret på et lokationsnavn.
 * Her kan du udvide med flere “location” => emoji-oversættelser.
 */
export function getIcon(location) {
  const icons = {
    'hospital': '🏥',
    'dokumentation': '📄',
    'leverandør': '📦',
    'infrastruktur': '🔧',
    'it‑jura': '⚖️',
    'cybersikkerhed': '💻'
  };
  return icons[location.toLowerCase()] || '❓';
}

/**
 * randomRange
 * Returnér et tilfældigt heltal mellem min og max (inklusive begge).
 */
export function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * formatTime
 * Hjælpefunktion til evt. at formatere tid, hvis man ønsker “mm:ss”.
 * Hvis du har behov for at vise TID i spillet på en flot måde,
 * kan du fx bruge denne – men det afhænger af dit design.
 */
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0'+secs : secs}`;
}
