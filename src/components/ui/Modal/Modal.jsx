import { useEffect, useRef, useId } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

/* Sélecteur des éléments naturellement atteignables au clavier. `:not([disabled])`
   et l'exclusion des tabindex négatifs évitent de piéger le focus sur un élément
   inerte. */
const FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled])',
  'select:not([disabled])', 'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

/**
 * Modale accessible : focus déplacé à l'ouverture puis confiné dans la boîte de
 * dialogue, restauré sur l'élément déclencheur à la fermeture, fermeture via
 * Escape ou clic sur le fond, scroll de la page verrouillé.
 */
export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const modalRef = useRef(null);
  /* Élément qui avait le focus avant l'ouverture, pour le lui rendre ensuite. */
  const triggerRef = useRef(null);
  /* Identifiant unique par instance : deux modales montées en même temps ne
     doivent pas exposer le même id à aria-labelledby. */
  const titleId = useId();

  /* Escape + confinement du focus + verrouillage du scroll */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      /* Focus trap : on recalcule la liste à chaque Tab plutôt qu'une seule fois
         à l'ouverture, car le contenu de la modale est souvent dynamique
         (AuthForm change de champs selon l'onglet actif). */
      const items = modalRef.current?.querySelectorAll(FOCUSABLE);
      if (!items?.length) return;

      const first = items[0];
      const last  = items[items.length - 1];
      const active = document.activeElement;

      /* On boucle manuellement aux deux extrémités. Le cas `!contains` couvre
         le focus encore posé sur le conteneur lui-même (tabIndex -1). */
      if (e.shiftKey && (active === first || !modalRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  /* Mémorise le déclencheur, donne le focus à la modale, puis le restitue. */
  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement;
    modalRef.current?.focus();

    return () => {
      /* Le déclencheur peut avoir disparu du DOM entre-temps (menu mobile
         refermé, par exemple) - d'où le test sur isConnected. */
      const trigger = triggerRef.current;
      if (trigger?.isConnected) trigger.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      /* Sans titre, aria-labelledby pointerait vers un id inexistant : on bascule
         alors sur un libellé générique. */
      {...(title ? { 'aria-labelledby': titleId } : { 'aria-label': 'Boîte de dialogue' })}
    >
      <div
        ref={modalRef}
        className={[styles.modal, styles[size]].join(' ')}
        tabIndex={-1}
      >
        <div className={styles.header}>
          {title && (
            <h2 id={titleId} className={styles.title}>{title}</h2>
          )}
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
