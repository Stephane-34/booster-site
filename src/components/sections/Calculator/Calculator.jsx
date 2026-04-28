import { useState, useMemo } from 'react';
import { TrendingUp, Info } from 'lucide-react';
import clsx from 'clsx';
import Badge from '../../ui/Badge/Badge';
import Button from '../../ui/Button/Button';
import { formatCurrency } from '../../../utils/formatters';
import { computeFutureValue } from '../../../utils/calculators';
import styles from './Calculator.module.css';

const HORIZONS = [5, 10, 15, 20, 30];
const DEFAULT_MONTHLY = 100;
const DEFAULT_HORIZON = 15;
/* Taux annuel moyen hypothétique pour les UC — affiché en disclaimer */
const DEFAULT_RATE = 5.5;
const LIVRET_A_RATE = 0.03;

export default function Calculator({ onCTAClick }) {
  const [monthly, setMonthly] = useState(DEFAULT_MONTHLY);
  const [horizon, setHorizon] = useState(DEFAULT_HORIZON);

  /* Tous les calculs dérivés dans un seul useMemo — une seule dépendance sur monthly/horizon */
  const simulation = useMemo(() => {
    const months = horizon * 12;
    const totalInvested = monthly * 12 * horizon;
    const boosterValue = computeFutureValue(monthly, DEFAULT_RATE / 100, months);
    const livretAValue = computeFutureValue(monthly, LIVRET_A_RATE, months);
    const gains = boosterValue - totalInvested;
    const gainPct = (gains / totalInvested) * 100;
    return { totalInvested, boosterValue, livretAValue, gains, gainPct };
  }, [monthly, horizon]);

  return (
    <section id="simulateur" className={styles.section}>
      <div className={`container ${styles.inner}`}>
        {/* Texte */}
        <div className={styles.content}>
          <Badge variant="primary">Simulateur</Badge>
          <h2 className={styles.title}>
            Vois ton argent{' '}
            <span className="gradient-text">travailler pour toi</span>
          </h2>
          <p className={styles.desc}>
            Combine épargne régulière et rendement composé — l'arme secrète
            des investisseurs. Ajuste les paramètres pour simuler ton futur capital.
          </p>

          {/* Résultat principal */}
          <div className={styles.resultCard}>
            <div className={styles.resultMain}>
              <span className={styles.resultLabel}>Capital estimé dans {horizon} ans</span>
              <span className={styles.resultValue}>{formatCurrency(simulation.boosterValue)}</span>
              <span className={styles.resultGain}>
                dont +{formatCurrency(simulation.gains)} de gains
                <span className={styles.resultPct}>+{simulation.gainPct.toFixed(0)} %</span>
              </span>
            </div>
            <div className={styles.resultBar}>
              <div
                className={styles.resultBarInvested}
                style={{ width: `${(simulation.totalInvested / simulation.boosterValue) * 100}%` }}
              />
              <div className={styles.resultBarGains} />
            </div>
            <div className={styles.barLegend}>
              <span><span className={styles.dotInvested} />Capital versé — {formatCurrency(simulation.totalInvested)}</span>
              <span><span className={styles.dotGains} />Gains — {formatCurrency(simulation.gains)}</span>
            </div>
          </div>

          <Button variant="accent" size="lg" onClick={onCTAClick}>
            <TrendingUp size={18} />
            Commencer à investir
          </Button>

          <p className={styles.disclaimer}>
            <Info size={12} />
            Simulation indicative à {DEFAULT_RATE} % brut/an. Ne constitue pas un conseil en investissement.
          </p>
        </div>

        {/* Contrôles */}
        <div className={styles.controls}>
          {/* Versement mensuel */}
          <div className={styles.sliderGroup}>
            <div className={styles.sliderHeader}>
              <label htmlFor="calc-monthly">Versement mensuel</label>
              <span className={styles.sliderValue}>{formatCurrency(monthly)}</span>
            </div>
            <input
              id="calc-monthly"
              type="range"
              min={50}
              max={2000}
              step={50}
              value={monthly}
              onChange={(e) => setMonthly(Number(e.target.value))}
              className={styles.slider}
            />
            <div className={styles.sliderScale}>
              <span>50 €</span>
              <span>1 000 €</span>
              <span>2 000 €</span>
            </div>
          </div>

          {/* Horizon */}
          <div className={styles.sliderGroup}>
            <div className={styles.sliderHeader}>
              <label>Horizon de placement</label>
              <span className={styles.sliderValue}>{horizon} ans</span>
            </div>
            <div className={styles.horizonPills}>
              {HORIZONS.map((horizon_option) => (
                <button
                  key={horizon_option}
                  className={clsx(styles.horizonPill, horizon === horizon_option && styles.horizonPillActive)}
                  onClick={() => setHorizon(horizon_option)}
                  aria-pressed={horizon === horizon_option}
                >
                  {horizon_option} ans
                </button>
              ))}
            </div>
          </div>

          {/* Comparaison avec le Livret A — valeurs issues du useMemo, aucun recalcul ici */}
          <div className={styles.comparison}>
            <p className={styles.compLabel}>Comparé à un Livret A (3 %)</p>
            <div className={styles.compRow}>
              <span>Livret A</span>
              <span className={styles.compValueLow}>{formatCurrency(simulation.livretAValue)}</span>
            </div>
            <div className={styles.compRow}>
              <span>Booster ({DEFAULT_RATE} %)</span>
              <span className={styles.compValueHigh}>{formatCurrency(simulation.boosterValue)}</span>
            </div>
            <div className={styles.compDiff}>
              +{formatCurrency(simulation.boosterValue - simulation.livretAValue)} de plus
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
