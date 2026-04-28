/**
 * Formate un nombre en devise EUR avec le séparateur français.
 * @param {number} amount
 * @returns {string} ex: "12 840 €"
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formate un pourcentage.
 * @param {number} value  - Valeur entre 0 et 100
 * @param {number} digits - Décimales (défaut 1)
 * @returns {string}
 */
export function formatPercent(value, digits = 1) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'percent',
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value / 100);
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
