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
