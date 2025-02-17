// scripts/utils.js

/**
 * Blander et array (Fisher-Yates shuffle).
 * @param {Array} array - Arrayet, der skal blandes.
 * @returns {Array} - Det blandede array.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Byt elementer
    }
    return array;
}

/**
 * Henter et Font Awesome-ikon baseret på lokation.
 * @param {string} location - Lokationens navn.
 * @returns {string} - HTML-streng med Font Awesome-ikonet.
 */
function getIcon(location) {
    switch (location) {
        case "hospital": return '<i class="fas fa-hospital"></i>';
        case "dokumentation": return '<i class="fas fa-file-alt"></i>';
        case "leverandør": return '<i class="fas fa-truck"></i>';
        case "infrastruktur": return '<i class="fas fa-server"></i>';
        case "it‑jura": return '<i class="fas fa-gavel"></i>';
        case "cybersikkerhed": return '<i class="fas fa-shield-alt"></i>';
        default: return '<i class="fas fa-question-circle"></i>'; // Default icon
    }
}

export { shuffleArray, getIcon };
