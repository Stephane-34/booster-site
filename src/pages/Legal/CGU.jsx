import styles from './Legal.module.css';

export default function CGU() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.tag}>Légal</span>
          <h1 className={styles.title}>Conditions générales d'utilisation</h1>
          <p className={styles.date}>Version en vigueur au 1er janvier 2026</p>
        </header>

        <article className={styles.body}>
          <h2>1. Objet</h2>
          <p>
            Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et
            l'utilisation de la plateforme Booster, accessible à l'adresse{' '}
            <a href="https://booster.lu">booster.lu</a>, exploitée par Booster S.A.,
            société anonyme de droit luxembourgeois (RCS Luxembourg B 123456).
          </p>
          <p>
            En créant un compte ou en utilisant les services Booster, vous acceptez
            sans réserve les présentes CGU. Si vous n'acceptez pas ces conditions, veuillez
            cesser immédiatement d'utiliser le service.
          </p>

          <h2>2. Description du service</h2>
          <p>Booster est une plateforme fintech/EdTech qui propose :</p>
          <ul>
            <li>
              Un <strong>module éducatif</strong> (Académie Booster) composé de parcours
              thématiques sur la finance personnelle, avec des QCM et un système de progression.
            </li>
            <li>
              Un <strong>simulateur d'investissement</strong> permettant de projeter
              l'évolution d'un capital selon différents paramètres.
            </li>
            <li>
              Une <strong>mise en relation</strong> avec des conseillers en gestion de
              patrimoine pour l'ouverture et le suivi de contrats d'assurance-vie luxembourgeois.
            </li>
            <li>
              Un <strong>dashboard</strong> personnel permettant de suivre ses investissements.
            </li>
          </ul>

          <div className={styles.infoBox}>
            <p>
              <strong>Important :</strong> Booster est un intermédiaire en assurance. Le service
              ne constitue pas un conseil en investissement au sens de la directive MIF II.
              Toute décision d'investissement vous appartient et doit être prise en tenant
              compte de votre situation personnelle.
            </p>
          </div>

          <h2>3. Inscription et compte utilisateur</h2>
          <h3>3.1 Éligibilité</h3>
          <p>
            L'accès au service est réservé aux personnes physiques majeures (18 ans et plus)
            disposant de la capacité juridique de contracter. En vous inscrivant, vous
            garantissez remplir ces conditions.
          </p>
          <h3>3.2 Création du compte</h3>
          <p>
            L'inscription nécessite la fourniture d'une adresse e-mail valide et la création
            d'un mot de passe sécurisé. Vous êtes seul responsable de la confidentialité
            de vos identifiants et de toute activité effectuée depuis votre compte.
          </p>
          <h3>3.3 Exactitude des informations</h3>
          <p>
            Vous vous engagez à fournir des informations exactes, complètes et à les maintenir
            à jour. Booster S.A. se réserve le droit de suspendre tout compte pour lequel
            des informations fausses ou frauduleuses auraient été communiquées.
          </p>

          <h2>4. Plans tarifaires</h2>
          <p>Booster propose deux niveaux d'accès :</p>
          <table>
            <thead>
              <tr>
                <th>Fonctionnalité</th>
                <th>Starter (gratuit)</th>
                <th>Booster (40 €/an)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Académie — modules de base</td>
                <td>3 modules</td>
                <td>6 thèmes complets</td>
              </tr>
              <tr>
                <td>Quiz du jour</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Simulateur</td>
                <td>Basique</td>
                <td>Avancé</td>
              </tr>
              <tr>
                <td>Dashboard</td>
                <td>Limité</td>
                <td>Complet</td>
              </tr>
              <tr>
                <td>Accès prioritaire conseillers</td>
                <td>—</td>
                <td>✓</td>
              </tr>
            </tbody>
          </table>
          <p>
            Les tarifs sont indiqués TTC. Booster S.A. se réserve le droit de modifier
            ses tarifs avec un préavis de 30 jours notifié par e-mail.
          </p>

          <h2>5. Obligations de l'utilisateur</h2>
          <p>Vous vous engagez à :</p>
          <ul>
            <li>Utiliser le service conformément à sa destination et aux lois applicables.</li>
            <li>Ne pas tenter d'accéder aux données d'autres utilisateurs.</li>
            <li>Ne pas soumettre de contenus illicites, diffamatoires ou trompeurs.</li>
            <li>Ne pas utiliser de robots, scrapers ou tout moyen automatisé non autorisé.</li>
            <li>Ne pas porter atteinte à l'intégrité ou à la disponibilité du service.</li>
          </ul>

          <h2>6. Propriété intellectuelle</h2>
          <p>
            La plateforme Booster, son interface, ses contenus pédagogiques (textes, quiz,
            vidéos, illustrations) et son code source sont la propriété exclusive de
            Booster S.A. et sont protégés par le droit de la propriété intellectuelle.
          </p>
          <p>
            Booster S.A. vous accorde une licence personnelle, non exclusive, non transférable
            et révocable d'utilisation du service dans le cadre des présentes CGU. Toute
            autre utilisation est strictement interdite.
          </p>

          <h2>7. Limitation de responsabilité</h2>
          <p>
            Le simulateur et les contenus éducatifs de Booster sont fournis à titre indicatif.
            Ils ne constituent pas un conseil en investissement personnalisé. Booster S.A.
            ne saurait être tenu responsable des décisions d'investissement prises sur la
            base de ces informations.
          </p>
          <p>
            Booster S.A. s'efforce d'assurer la disponibilité continue du service mais ne
            garantit pas une disponibilité ininterrompue. En cas d'interruption pour
            maintenance ou incident technique, aucune compensation ne sera due.
          </p>

          <h2>8. Résiliation</h2>
          <p>
            Vous pouvez résilier votre compte à tout moment depuis les paramètres de votre
            espace personnel ou en contactant <a href="mailto:contact@booster.lu">contact@booster.lu</a>.
          </p>
          <p>
            Booster S.A. se réserve le droit de suspendre ou supprimer tout compte en cas
            de violation des présentes CGU, sans préavis ni remboursement.
          </p>

          <h2>9. Modification des CGU</h2>
          <p>
            Booster S.A. peut modifier les présentes CGU à tout moment. Les modifications
            entrent en vigueur 30 jours après leur notification par e-mail. La poursuite
            de l'utilisation du service après cette période vaut acceptation des nouvelles conditions.
          </p>

          <h2>10. Droit applicable et juridiction</h2>
          <p>
            Les présentes CGU sont soumises au droit luxembourgeois. Tout litige relatif
            à leur interprétation ou exécution sera soumis à la compétence exclusive des
            tribunaux de Luxembourg-Ville, sauf disposition impérative contraire applicable
            aux consommateurs résidant dans un État membre de l'Union européenne.
          </p>

          <h2>Contact</h2>
          <p>
            Pour toute question relative aux présentes CGU :{' '}
            <a href="mailto:legal@booster.lu">legal@booster.lu</a>
          </p>
        </article>
      </div>
    </div>
  );
}
