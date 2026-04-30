import styles from './Legal.module.css';

export default function MentionsLegales() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.tag}>Légal</span>
          <h1 className={styles.title}>Mentions légales</h1>
          <p className={styles.date}>Dernière mise à jour : 1er janvier 2026</p>
        </header>

        <article className={styles.body}>
          <h2>Éditeur du site</h2>
          <p>
            <strong>Booster S.A.</strong><br />
            Société anonyme de droit luxembourgeois<br />
            Capital social : 100 000 €<br />
            Siège social : 2, Rue du Fort Bourbon, L-1249 Luxembourg<br />
            Registre de Commerce et des Sociétés (RCS Luxembourg) : B 123456<br />
            Numéro TVA intracommunautaire : LU12345678
          </p>
          <p>
            <strong>Directeur de la publication :</strong> Édouard Martin<br />
            <strong>Contact :</strong>{' '}
            <a href="mailto:contact@booster.lu">contact@booster.lu</a>
          </p>

          <h2>Hébergement</h2>
          <p>
            <strong>Vercel Inc.</strong><br />
            340 Pine Street, Suite 401<br />
            San Francisco, California 94104 — États-Unis<br />
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
              vercel.com
            </a>
          </p>

          <h2>Activité réglementée</h2>
          <p>
            Booster S.A. est un intermédiaire en assurance agréé (IAS) sous la supervision
            de la <strong>Commission de Surveillance du Secteur Financier (CSSF)</strong>,
            283, route d'Arlon, L-1150 Luxembourg.
          </p>
          <p>
            Les produits d'investissement présentés sur ce site sont des contrats
            d'assurance-vie de droit luxembourgeois distribués par des compagnies d'assurance
            soumises à la réglementation luxembourgeoise et au régime du « triangle de sécurité »
            (protection renforcée des avoirs).
          </p>

          <div className={styles.infoBox}>
            <p>
              <strong>Avertissement sur les risques :</strong> Investir comporte des risques,
              notamment de perte en capital. La valeur de votre investissement peut fluctuer
              à la hausse comme à la baisse. Les performances passées ne préjugent pas des
              performances futures. Vous pouvez ne pas récupérer l'intégralité du capital investi.
            </p>
          </div>

          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus du présent site (textes, images, graphiques, interface
            utilisateur, code source) est la propriété exclusive de Booster S.A. ou de ses
            partenaires et est protégé par les lois en vigueur relatives à la propriété
            intellectuelle.
          </p>
          <p>
            Toute reproduction, représentation, modification, publication ou adaptation,
            totale ou partielle, des éléments du site, quel que soit le moyen ou le procédé
            utilisé, est interdite sans l'autorisation écrite préalable de Booster S.A.
          </p>

          <h2>Liens hypertextes</h2>
          <p>
            Booster S.A. ne saurait être tenu responsable du contenu des sites tiers vers
            lesquels des liens sont proposés. Ces liens sont fournis à titre informatif uniquement.
          </p>

          <h2>Droit applicable</h2>
          <p>
            Le présent site est soumis au droit luxembourgeois. Tout litige relatif à
            son utilisation sera soumis à la compétence exclusive des tribunaux de Luxembourg-Ville.
          </p>
        </article>
      </div>
    </div>
  );
}
