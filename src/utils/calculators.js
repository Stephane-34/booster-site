/**
 * Calcule la valeur future d'un investissement mensuel avec capitalisation composée.
 * Formule : FV = PMT × [(1 + r)^n - 1] / r
 *
 * @param {number} monthlyPayment - Versement mensuel en €
 * @param {number} annualRate     - Taux annuel brut (ex: 0.055 pour 5,5 %)
 * @param {number} months         - Durée en mois
 * @returns {number} Valeur future arrondie à 2 décimales
 */
export function computeFutureValue(monthlyPayment, annualRate, months) {
  const monthlyRate = annualRate / 12;

  if (monthlyRate === 0) {
    return monthlyPayment * months;
  }

  const fv = monthlyPayment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  return Math.round(fv * 100) / 100;
}

/**
 * Applique la règle des 72 : nombre d'années pour doubler un capital.
 * @param {number} annualRatePercent - Taux en % (ex: 8 pour 8 %)
 * @returns {number}
 */
export function yearsToDouble(annualRatePercent) {
  return 72 / annualRatePercent;
}

/**
 * Calcule le versement mensuel nécessaire pour atteindre un capital cible.
 * Formule inverse de FV : PMT = FV × r / [(1 + r)^n - 1]
 *
 * @param {number} targetAmount - Capital cible en €
 * @param {number} annualRate   - Taux annuel brut (ex: 0.055)
 * @param {number} months       - Durée en mois
 * @returns {number}
 */
export function computeRequiredMonthly(targetAmount, annualRate, months) {
  const r = annualRate / 12;
  if (r === 0) return Math.ceil(targetAmount / months);
  const pmt = (targetAmount * r) / (Math.pow(1 + r, months) - 1);
  return Math.round(pmt * 100) / 100;
}

/**
 * Calcule le nombre de mois pour atteindre un capital cible avec des versements mensuels.
 * Formule : n = log(1 + FV × r / PMT) / log(1 + r)
 *
 * @param {number} targetAmount    - Capital cible en €
 * @param {number} monthlyPayment  - Versement mensuel en €
 * @param {number} annualRate      - Taux annuel brut (ex: 0.055)
 * @returns {number} Nombre de mois (arrondi au supérieur)
 */
export function computeMonthsToGoal(targetAmount, monthlyPayment, annualRate) {
  const r = annualRate / 12;
  if (r === 0) return Math.ceil(targetAmount / monthlyPayment);
  if (monthlyPayment <= 0) return Infinity;
  const n = Math.log(1 + (targetAmount * r) / monthlyPayment) / Math.log(1 + r);
  return Math.ceil(n);
}
