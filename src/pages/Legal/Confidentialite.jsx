import styles from './Legal.module.css';

export default function Confidentialite() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.tag}>Légal</span>
          <h1 className={styles.title}>Politique de confidentialité</h1>
          <p className={styles.date}>Dernière mise à jour : 5 août 2026</p>
        </header>

        <article className={styles.body}>
          <div className={styles.infoBox}>
            <p>
              Booster S.A. s'engage à protéger vos données personnelles conformément au
              Règlement Général sur la Protection des Données (RGPD - Règlement UE 2016/679)
              et à la législation luxembourgeoise applicable.
            </p>
          </div>

          <h2>1. Responsable du traitement</h2>
          <p>
            <strong>Booster S.A.</strong><br />
            2, Rue du Fort Bourbon, L-1249 Luxembourg<br />
            RCS Luxembourg : B 123456<br />
            Contact DPO : <a href="mailto:privacy@booster.lu">privacy@booster.lu</a>
          </p>

          <h2>2. Données collectées</h2>
          <h3>2.1 Données que vous nous fournissez</h3>
          <ul>
            <li>
              <strong>Compte & identité :</strong> civilité (M./Mme), prénom, nom,
              date de naissance, adresse e-mail, numéro de téléphone, mot de passe (haché).
            </li>
            <li>
              <strong>Préférence marketing :</strong> opt-in newsletter (facultatif,
              non nécessaire pour utiliser le service).
            </li>
            <li>
              <strong>Profil investisseur :</strong> situation financière, objectifs
              d'investissement, appétit au risque (collectés lors de la prise de RDV
              avec un conseiller).
            </li>
            <li>
              <strong>Communications :</strong> messages échangés avec nos conseillers.
            </li>
          </ul>
          <h3>2.2 Données collectées automatiquement</h3>
          <ul>
            <li>
              <strong>Données de navigation :</strong> adresse IP, type de navigateur,
              pages visitées, durée des sessions (via l'hébergeur Vercel).
            </li>
            <li>
              <strong>Progression Académie :</strong> résultats de vos quiz quotidiens
              (score, questions, date de complétion), utilisés pour afficher votre
              progression et le classement.
            </li>
            <li>
              <strong>Cookies :</strong> voir section 7 ci-dessous.
            </li>
          </ul>
          <h3>2.3 Âge minimum</h3>
          <p>
            La création d'un compte est ouverte aux utilisateurs âgés d'au moins
            <strong> 15 ans</strong> (art. 8 du RGPD, en application en France).
            En dessous de cet âge, le consentement d'un titulaire de l'autorité
            parentale est requis - merci de nous contacter avant toute inscription.
          </p>

          <h2>3. Finalités et bases légales</h2>
          <table>
            <thead>
              <tr>
                <th>Finalité</th>
                <th>Base légale</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fourniture et gestion du service</td>
                <td>Exécution du contrat</td>
              </tr>
              <tr>
                <td>Personnalisation de l'expérience</td>
                <td>Intérêt légitime</td>
              </tr>
              <tr>
                <td>Mise en relation avec un conseiller</td>
                <td>Exécution du contrat / Consentement</td>
              </tr>
              <tr>
                <td>Envoi de communications marketing</td>
                <td>Consentement</td>
              </tr>
              <tr>
                <td>Obligations légales et réglementaires</td>
                <td>Obligation légale</td>
              </tr>
              <tr>
                <td>Amélioration du produit</td>
                <td>Intérêt légitime</td>
              </tr>
            </tbody>
          </table>

          <h2>4. Durée de conservation</h2>
          <ul>
            <li>
              <strong>Données de compte :</strong> durée de la relation contractuelle +
              3 ans après fermeture du compte.
            </li>
            <li>
              <strong>Données financières :</strong> 10 ans (obligation légale KYC/AML).
            </li>
            <li>
              <strong>Logs de connexion :</strong> 12 mois.
            </li>
            <li>
              <strong>Données marketing :</strong> jusqu'au retrait du consentement.
            </li>
          </ul>

          <h2>5. Destinataires des données</h2>
          <p>
            Vos données peuvent être partagées avec les catégories de destinataires suivantes :
          </p>
          <ul>
            <li>
              <strong>Prestataires techniques :</strong> Supabase (base de données, authentification),
              Vercel (hébergement), HubSpot (CRM et prise de RDV).
            </li>
            <li>
              <strong>Partenaires financiers :</strong> compagnies d'assurance luxembourgeoises
              dans le cadre de l'ouverture de contrats.
            </li>
            <li>
              <strong>Autorités compétentes :</strong> en cas d'obligation légale (CSSF, autorités fiscales).
            </li>
          </ul>
          <p>
            Certains de ces prestataires sont situés en dehors de l'Union européenne.
            Les transferts sont encadrés par des garanties appropriées (clauses contractuelles
            types de la Commission européenne ou décision d'adéquation).
          </p>

          <h2>6. Vos droits</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès</strong> - obtenir une copie de vos données personnelles.</li>
            <li><strong>Droit de rectification</strong> - corriger des données inexactes.</li>
            <li><strong>Droit à l'effacement</strong> - obtenir la suppression dans les cas prévus par le RGPD.</li>
            <li><strong>Droit à la limitation</strong> - restreindre le traitement dans certains cas.</li>
            <li><strong>Droit à la portabilité</strong> - recevoir vos données dans un format structuré.</li>
            <li><strong>Droit d'opposition</strong> - vous opposer au traitement fondé sur l'intérêt légitime.</li>
            <li><strong>Retrait du consentement</strong> - à tout moment pour les traitements fondés sur le consentement.</li>
          </ul>
          <p>
            <strong>En pratique :</strong> depuis votre page{' '}
            <a href="/profil">Mon profil</a>, vous pouvez à tout moment :
          </p>
          <ul>
            <li>modifier vos informations personnelles (rectification) ;</li>
            <li>
              exporter l'intégralité de vos données au format JSON, en un clic
              (portabilité) ;
            </li>
            <li>
              supprimer définitivement votre compte et toutes les données associées
              (droit à l'effacement).
            </li>
          </ul>
          <p>
            Pour tout autre exercice de vos droits, contactez notre DPO :{' '}
            <a href="mailto:privacy@booster.lu">privacy@booster.lu</a>. Nous répondrons
            dans un délai d'un mois. En cas de réponse insatisfaisante, vous pouvez
            introduire une réclamation auprès de la{' '}
            <strong>Commission Nationale pour la Protection des Données (CNPD)</strong>{' '}
            au Luxembourg ou de la <strong>CNIL</strong> en France.
          </p>

          <h2>7. Cookies</h2>
          <h3>Cookies essentiels</h3>
          <p>
            Ces cookies sont nécessaires au fonctionnement du service (maintien de session
            Supabase, sécurité, mémorisation de vos choix de consentement). Ils ne peuvent
            pas être désactivés sans dégrader le service.
          </p>
          <h3>Cookies tiers</h3>
          <p>
            Le calendrier de prise de rendez-vous, propulsé par <strong>HubSpot</strong>,
            peut déposer des cookies tiers lorsque vous consultez la page{' '}
            <a href="/investir">Investir</a>. Ces cookies ne sont chargés{' '}
            <strong>qu'après votre consentement explicite</strong> via la bannière qui
            apparaît lors de votre première visite.
          </p>
          <h3>Gestion des cookies</h3>
          <p>
            Vous pouvez changer d'avis à tout moment en vidant les cookies de votre
            navigateur pour ce site : la bannière de consentement réapparaîtra à la
            visite suivante. Vous pouvez aussi nous contacter à{' '}
            <a href="mailto:privacy@booster.lu">privacy@booster.lu</a>.
          </p>

          <h2>8. Sécurité</h2>
          <p>
            Booster S.A. met en œuvre des mesures techniques et organisationnelles adaptées
            pour protéger vos données : chiffrement en transit (TLS 1.3), chiffrement
            au repos, accès restreint aux données personnelles, surveillance des accès.
          </p>

          <h2>9. Modifications</h2>
          <p>
            La présente politique peut être modifiée pour refléter des évolutions légales
            ou de service. En cas de modification substantielle, vous serez informé par
            e-mail au moins 30 jours avant l'entrée en vigueur.
          </p>
        </article>
      </div>
    </div>
  );
}
