type ModalElements = {
  modal: HTMLElement;
  backdrop: HTMLElement;
  closeBtn: HTMLButtonElement;
};

let activeModal: ModalElements | null = null;
let lastFocused: HTMLElement | null = null;

function trapFocus(modal: HTMLElement, event: KeyboardEvent) {
  const focusable = modal.querySelectorAll<HTMLElement>(
    'button, a, input, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function onKeyDown(event: KeyboardEvent) {
  if (!activeModal) return;
  if (event.key === 'Escape') {
    closeActiveModal();
  } else if (event.key === 'Tab') {
    trapFocus(activeModal.modal, event);
  }
}

export function openModal(id: string) {
  const modal = document.getElementById(id);
  if (!modal) return;
  const backdrop = modal.querySelector<HTMLElement>('.modal-backdrop');
  const closeBtn = modal.querySelector<HTMLButtonElement>('.modal-close');
  const container = modal.querySelector<HTMLElement>('.modal-container');
  if (!backdrop || !closeBtn) return;

  lastFocused = document.activeElement as HTMLElement;
  modal.removeAttribute('hidden');

  // Pause Lenis: its body-level transform breaks position:fixed on the modal.
  window.__lenis?.stop();
  document.body.style.overflow = 'hidden';

  // Reset internal scroll so the modal always opens at the top of its content.
  if (container) container.scrollTop = 0;

  requestAnimationFrame(() => modal.classList.add('open'));

  activeModal = { modal, backdrop, closeBtn };
  closeBtn.focus();

  document.addEventListener('keydown', onKeyDown);
  backdrop.addEventListener('click', closeActiveModal, { once: true });
  closeBtn.addEventListener('click', closeActiveModal, { once: true });
}

export function closeActiveModal() {
  if (!activeModal) return;
  const { modal } = activeModal;
  modal.classList.remove('open');
  setTimeout(() => {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    window.__lenis?.start();
    if (lastFocused) lastFocused.focus();
  }, 200);
  document.removeEventListener('keydown', onKeyDown);
  activeModal = null;
}

export function initModalTriggers() {
  document.querySelectorAll<HTMLButtonElement>('[data-project]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-project');
      if (slug) openModal(`project-${slug}`);
    });
  });
  document.querySelectorAll<HTMLButtonElement>('[data-cert]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-cert');
      if (slug) openModal(`cert-${slug}`);
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModalTriggers);
  } else {
    initModalTriggers();
  }
}
