import styles from './Button.module.css';

/**
 * Bouton polymorphe - supporte variant, size, et rendu via `as`
 * (ex: <Button as="a" href="/..."> pour les liens)
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  className = '',
  loading = false,
  disabled = false,
  ...props
}) {
  const isDisabled = loading || disabled;

  /* `disabled` n'existe pas sur <a> : posé sur un lien, l'attribut est ignoré par
     le navigateur et le lien reste activable au clavier malgré son apparence
     désactivée. On traduit donc l'état en ARIA et on neutralise la navigation
     (le CSS coupe déjà les pointer-events, mais pas la touche Entrée). */
  const stateProps = Tag === 'button'
    ? { disabled: isDisabled }
    : isDisabled
      ? { 'aria-disabled': true, tabIndex: -1, onClick: (e) => e.preventDefault() }
      : {};

  return (
    <Tag
      className={[
        styles.button,
        styles[variant],
        styles[size],
        loading ? styles.loading : '',
        className,
      ].join(' ')}
      {...props}
      {...stateProps}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={styles.content}>{children}</span>
    </Tag>
  );
}
