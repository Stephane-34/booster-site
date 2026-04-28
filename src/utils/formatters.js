/* Instances Intl mises en cache au niveau module — évite de les recréer à chaque appel.
   Intl.NumberFormat est coûteux à instancier, pas à utiliser. */
const currencyFormatter = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

/* Les formateurs de pourcentage varient selon `digits`, on les cache par clé. */
const percentFormatterCache = new Map();

function getPercentFormatter(digits) {
  if (!percentFormatterCache.has(digits)) {
    percentFormatterCache.set(
      digits,
      new Intl.NumberFormat('fr-FR', {
        style: 'percent',
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
      })
    );
  }
  return percentFormatterCache.get(digits);
}

/**
 * Formate un nombre en devise EUR avec le séparateur français.
 * @param {number} amount
 * @returns {string} ex: "12 840 €"
 */
export function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}

/**
 * Formate un pourcentage.
 * @param {number} value  - Valeur entre 0 et 100
 * @param {number} digits - Décimales (défaut 1)
 * @returns {string}
 */
export function formatPercent(value, digits = 1) {
  return getPercentFormatter(digits).format(value / 100);
}

/**
 * Tronque un texte à une longueur donnée.
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
export function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}
