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

  // Double rAF: garante que o browser registrou o estado "from" (display
  // saiu de none) antes da classe .open disparar a transição de entrada.
  requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('open')));

  activeModal = { modal, backdrop, closeBtn };
  closeBtn.focus();

  document.addEventListener('keydown', onKeyDown);
  backdrop.addEventListener('click', closeActiveModal);
  closeBtn.addEventListener('click', closeActiveModal);
}

export function closeActiveModal() {
  if (!activeModal) return;
  const { modal, backdrop, closeBtn } = activeModal;
  activeModal = null;

  modal.classList.remove('open');
  document.removeEventListener('keydown', onKeyDown);
  backdrop.removeEventListener('click', closeActiveModal);
  closeBtn.removeEventListener('click', closeActiveModal);

  setTimeout(() => {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    window.__lenis?.start();
    if (lastFocused) lastFocused.focus();
  }, 200);
}

export function initModalTriggers() {
  // Move os modais pro <body>: position:fixed precisa resolver contra o
  // viewport. O GSAP deixa um transform em cada <section>, e isso viraria
  // o containing block do overlay — modal abriria "dentro" da seção.
  document.querySelectorAll<HTMLElement>('.modal').forEach((modal) => {
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }
  });

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
