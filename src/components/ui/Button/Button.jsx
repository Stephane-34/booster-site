import styles from './Button.module.css';

/**
 * Bouton polymorphe — supporte variant, size, et rendu via `as`
 * (ex: <Button as="a" href="/..."> pour les liens)
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  className = '',
  loading = false,
  ...props
}) {
  return (
    <Tag
      className={[
        styles.button,
        styles[variant],
        styles[size],
        loading ? styles.loading : '',
        className,
      ].join(' ')}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      <span className={styles.content}>{children}</span>
    </Tag>
  );
}
