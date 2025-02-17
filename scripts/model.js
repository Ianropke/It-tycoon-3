// scripts/modal.js
/**
 * Åbner modal-vinduet med angivet body- og footer-indhold.
 * @param {string} bodyContent - HTML-indhold til modal-body.
 * @param {string} footerContent - HTML-indhold til modal-footer.
 * @param {Function} [callback] - Eventuel callback-funktion.
 */
function openModal(bodyContent, footerContent, callback) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalFooter = document.getElementById('modalFooter');

  // Error Handling: Check if elements exist
  if (!modal || !modalBody || !modalFooter) {
    console.error("Modal elements not found!");
    return; // Exit the function if elements are missing
  }

  modalBody.innerHTML = bodyContent;
  modalFooter.innerHTML = footerContent;
  modal.style.display = 'flex'; // Use display: flex for modal, not class removal

  if (callback && typeof callback === 'function') {
    callback();
  }
}

/**
 * Lukker modal-vinduet og kalder evt. en callback.
 * @param {Function} [callback] - Callback-funktion.
 */
function closeModal(callback) {
  const modal = document.getElementById('modal');

  if (!modal) {
    console.error("Modal element not found!");
    return;
  }

  modal.style.display = 'none'; // Use display: none to hide

  if (callback && typeof callback === 'function') {
    callback();
  }
}

// Event listener for close button (using event delegation for efficiency)
document.addEventListener('click', (event) => {
  if (event.target.id === 'modalClose') {
    closeModal();
  }
});

export { openModal, closeModal };
