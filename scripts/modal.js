// scripts/modal.js

// Vi forudsætter, at GSAP er loadet globalt (fx fra CDN) eller importeret
// import { gsap } from 'gsap';

/**
 * Åbner modal-vinduet med angivet body- og footer-indhold.
 * @param {string} bodyContent - HTML-indhold til modal-body.
 * @param {string} footerContent - HTML-indhold til modal-footer.
 * @param {Function} [callback] - Eventuel callback-funktion, der kaldes EFTER modal åbnes & animation er slut.
 */
export function openModal(bodyContent, footerContent, callback) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalFooter = document.getElementById('modalFooter');

  // Indsæt HTML-indhold
  modalBody.innerHTML = bodyContent;
  modalFooter.innerHTML = footerContent;

  // Vis modal (fjern .hidden), men sæt dens opacity 0, så vi kan animere den ind
  modal.classList.remove('hidden');
  modal.style.opacity = '0';
  // Hvis du har en .modal-content, kan du også style den, fx `transform: translateY(-20px)`

  // GSAP-ANIMATION (fade + slide)
  gsap.to(modal, {
    duration: 0.4,
    opacity: 1,
    ease: 'power2.out',
    onComplete: () => {
      // Valgfri callback EFTER modal er åben og animation er færdig
      if (typeof callback === 'function') {
        callback();
      }
    }
  });
}

/**
 * Lukker modal-vinduet med en fade-out animation og kalder evt. callback bagefter.
 * @param {Function} [callback] - Callback-funktion, der kaldes EFTER modal er lukket.
 */
export function closeModal(callback) {
  const modal = document.getElementById('modal');

  // Fade out med GSAP
  gsap.to(modal, {
    duration: 0.3,
    opacity: 0,
    ease: 'power2.in',
    onComplete: () => {
      // Efter animation: tilføj .hidden, og nulstil styling
      modal.classList.add('hidden');
      modal.style.opacity = '';
      if (typeof callback === 'function') {
        callback();
      }
    }
  });
}

// Mulighed for luk ved klik på X (i modal-content):
const modalCloseIcon = document.getElementById('modalClose');
if (modalCloseIcon) {
  modalCloseIcon.addEventListener('click', () => closeModal());
}

// (VALGFRIT) Luk modal, hvis man klikker på den mørke baggrund
const modal = document.getElementById('modal');
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      // Hvis man klikker direkte på selve baggrundslaget (dvs. ikke modal-content),
      // så lukker vi
      closeModal();
    }
  });
}
