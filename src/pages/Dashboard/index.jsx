import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp, PiggyBank, Calendar, BookOpen,
  ArrowUpRight, Trophy, ChevronRight
} from 'lucide-react';
import Badge from '../../components/ui/Badge/Badge';
import Button from '../../components/ui/Button/Button';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../utils/formatters';
import styles from './Dashboard.module.css';

/* Données de démo — en prod, viennent de Supabase */
const DEMO_PORTFOLIO = {
  value: 12840,
  invested: 10200,
  performance: 8.2,
  dividends: 124,
};

const DEMO_TRANSACTIONS = [
  { id: 'tx-apr-28', date: '28 avr.', type: 'Versement', amount: 100 },
  { id: 'tx-apr-01', date: '01 avr.', type: 'Versement', amount: 100 },
  { id: 'tx-mar-01', date: '01 mars', type: 'Versement', amount: 100 },
  { id: 'tx-feb-28', date: '28 fév.', type: 'Dividende reçu', amount: 41.2 },
];

export default function Dashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  /* Redirection si non connecté */
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner} />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'toi';
  const gains = DEMO_PORTFOLIO.value - DEMO_PORTFOLIO.invested;

  return (
    <div className={styles.page}>
      {/* En-tête */}
      <div className={styles.header}>
        <div className="container">
          <div className={styles.headerInner}>
            <div>
              <h1 className={styles.greeting}>
                Bonjour {userName} 👋
              </h1>
              <p className={styles.subgreeting}>
                Voici un résumé de ton espace investissement
              </p>
            </div>
            <Button variant="primary" size="sm" as="a" href="#rdv">
              <Calendar size={14} />
              Prendre RDV
            </Button>
          </div>
        </div>
      </div>

      <div className={`container ${styles.grid}`}>
        {/* Colonne principale */}
        <main className={styles.main}>
          {/* KPIs */}
          <div className={styles.kpiGrid}>
            <KpiCard
              icon={TrendingUp}
              label="Valeur du portefeuille"
              value={formatCurrency(DEMO_PORTFOLIO.value)}
              delta={`+${formatCurrency(gains)} depuis le début`}
              positive
              accent="primary"
            />
            <KpiCard
              icon={PiggyBank}
              label="Capital investi"
              value={formatCurrency(DEMO_PORTFOLIO.invested)}
              delta="Versements cumulés"
              accent="neutral"
            />
            <KpiCard
              icon={ArrowUpRight}
              label="Performance"
              value={`+${DEMO_PORTFOLIO.performance} %`}
              delta="Sur l'ensemble du contrat"
              positive
              accent="accent"
            />
            <KpiCard
              icon={BookOpen}
              label="Dividendes reçus"
              value={formatCurrency(DEMO_PORTFOLIO.dividends)}
              delta="Depuis le début"
              positive
              accent="accent"
            />
          </div>

          {/* Graphique simulé */}
          <div className={styles.chartCard}>
            <div className={styles.chartHeader}>
              <h2 className={styles.chartTitle}>Évolution du portefeuille</h2>
              <div className={styles.chartPeriods}>
                {['1M', '3M', '6M', 'YTD', '1A', 'MAX'].map((p) => (
                  <button
                    key={p}
                    className={[styles.period, p === 'YTD' ? styles.periodActive : ''].join(' ')}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            {/* Graphique simulé SVG */}
            <div className={styles.chartSvgWrapper}>
              <svg viewBox="0 0 600 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.chartSvg}>
                <defs>
                  <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Lignes de grille */}
                {[30, 75, 120].map((y) => (
                  <line key={y} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                ))}
                {/* Courbe */}
                <path
                  d="M0 130 C60 125, 100 110, 150 100 S220 80, 270 70 S340 50, 380 40 S460 25, 500 20 S560 10, 600 8"
                  stroke="#a855f7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Zone sous la courbe */}
                <path
                  d="M0 130 C60 125, 100 110, 150 100 S220 80, 270 70 S340 50, 380 40 S460 25, 500 20 S560 10, 600 8 L600 150 L0 150 Z"
                  fill="url(#dashGrad)"
                />
                {/* Point actuel */}
                <circle cx="600" cy="8" r="5" fill="#a855f7" />
                <circle cx="600" cy="8" r="9" fill="rgba(168,85,247,0.3)" />
              </svg>
              {/* Labels axes */}
              <div className={styles.chartXLabels}>
                {['Janv.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.'].map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Historique */}
          <div className={styles.tableCard}>
            <h2 className={styles.tableTitle}>Dernières opérations</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Montant</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {DEMO_TRANSACTIONS.map((tx) => (
                  <tr key={tx.id}>
                    <td className={styles.tdDate}>{tx.date}</td>
                    <td>{tx.type}</td>
                    <td className={styles.tdAmount}>+{formatCurrency(tx.amount)}</td>
                    <td>
                      <Badge variant="accent">Effectué</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Sidebar */}
        <aside className={styles.sidebar}>
          {/* Répartition */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Répartition</h3>
            <div className={styles.allocationBar}>
              <div className={styles.allocFonds} style={{ width: '40%' }} />
              <div className={styles.allocUC} style={{ width: '60%' }} />
            </div>
            <div className={styles.allocLegend}>
              <span><span className={styles.dotFonds} />Fonds € — 40 %</span>
              <span><span className={styles.dotUC} />UC — 60 %</span>
            </div>
          </div>

          {/* Académie */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardHeader}>
              <h3 className={styles.sideTitle}>
                <Trophy size={16} />
                Académie
              </h3>
              <Badge variant="primary">B+</Badge>
            </div>
            <div className={styles.progressRow}>
              <span className={styles.progressLabel}>Note globale</span>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '65%' }} />
              </div>
              <span className={styles.progressPct}>65 %</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              as="a"
              href="/academie"
              className={styles.academyBtn}
            >
              Continuer l'apprentissage
              <ChevronRight size={14} />
            </Button>
          </div>

          {/* Prochain RDV */}
          <div className={styles.sideCard}>
            <h3 className={styles.sideTitle}>Prochain contact</h3>
            <p className={styles.rdvText}>
              Aucun rendez-vous planifié.
            </p>
            <Button variant="outline" size="sm" as="a" href="#rdv" className={styles.rdvBtn}>
              <Calendar size={14} />
              Prendre RDV
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ─── KPI Card ────────────────────────────────────────────── */
function KpiCard({ icon: Icon, label, value, delta, positive, accent }) {
  return (
    <div className={[styles.kpiCard, styles[`kpi-${accent}`]].join(' ')}>
      <div className={styles.kpiIcon}>
        <Icon size={18} />
      </div>
      <div>
        <p className={styles.kpiLabel}>{label}</p>
        <p className={styles.kpiValue}>{value}</p>
        {delta && (
          <p className={[styles.kpiDelta, positive ? styles.positive : ''].join(' ')}>
            {delta}
          </p>
        )}
      </div>
    </div>
  );
}
