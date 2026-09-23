/* Formulaire de contact — fonction serverless Vercel.
 *
 * Le site est statique : sans code serveur, la clé Resend devrait vivre dans
 * le navigateur, où n'importe qui pourrait la récupérer et envoyer des mails
 * au nom du domaine. Elle reste donc ici, côté serveur.
 *
 * Variables d'environnement attendues :
 *   RESEND_API_KEY  clé d'envoi Resend
 *   CONTACT_EMAIL   destinataire des messages
 */

const MAX = { name: 100, email: 150, message: 4000 };

/* Limitation par IP, en mémoire. Les instances Vercel étant réutilisées entre
 * requêtes (Fluid Compute), ce compteur survit d'un appel à l'autre — sans
 * être partagé entre instances. Cela suffit à freiner un robot ; ce n'est pas
 * une protection absolue, et ce n'est pas son rôle : le honeypot fait le gros
 * du travail. */
const derniers = new Map();
const FENETRE = 60_000;   // 1 minute
const MAX_PAR_FENETRE = 3;

function tropDeRequetes(ip) {
  const maintenant = Date.now();
  const envois = (derniers.get(ip) ?? []).filter((t) => maintenant - t < FENETRE);
  if (envois.length >= MAX_PAR_FENETRE) return true;
  envois.push(maintenant);
  derniers.set(ip, envois);
  /* Purge opportuniste : sans elle, la Map grossirait indéfiniment sur une
     instance longue durée. */
  if (derniers.size > 500) {
    for (const [cle, valeurs] of derniers) {
      if (valeurs.every((t) => maintenant - t >= FENETRE)) derniers.delete(cle);
    }
  }
  return false;
}

const echapper = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { name = '', email = '', message = '', website = '' } = req.body ?? {};

  /* Honeypot : `website` est un champ masqué en CSS, invisible pour un humain.
     Un robot qui remplit tout le formulaire le remplit aussi. On répond 200
     pour ne pas lui signaler qu'il a été détecté. */
  if (website) return res.status(200).json({ ok: true });

  const ip = (req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || 'inconnue';
  if (tropDeRequetes(ip)) {
    return res.status(429).json({ error: 'Trop de messages envoyés. Réessaie dans une minute.' });
  }

  const nom = String(name).trim();
  const mail = String(email).trim();
  const texte = String(message).trim();

  if (!nom || !mail || !texte) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }
  if (nom.length > MAX.name || mail.length > MAX.email || texte.length > MAX.message) {
    return res.status(400).json({ error: 'Un des champs dépasse la longueur autorisée.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) {
    return res.status(400).json({ error: 'Adresse email invalide.' });
  }

  const cle = process.env.RESEND_API_KEY;
  const destinataire = process.env.CONTACT_EMAIL;
  if (!cle || !destinataire) {
    console.error('[contact] RESEND_API_KEY ou CONTACT_EMAIL manquante');
    return res.status(500).json({ error: "L'envoi est momentanément indisponible." });
  }

  try {
    const reponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${cle}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        /* Expéditeur sur le domaine authentifié chez Resend. Envoyer depuis
           l'adresse du visiteur ferait échouer SPF et DKIM : son domaine ne
           nous autorise pas à écrire en son nom. Elle va en reply_to, ce qui
           permet de répondre directement. */
        from: 'Booster <noreply@boosterfintech.com>',
        to: [destinataire],
        reply_to: mail,
        subject: `Contact site — ${nom}`,
        html:
          `<p><strong>De :</strong> ${echapper(nom)} &lt;${echapper(mail)}&gt;</p>` +
          `<p><strong>Message :</strong></p>` +
          `<p style="white-space:pre-wrap">${echapper(texte)}</p>`,
      }),
    });

    if (!reponse.ok) {
      const detail = await reponse.text();
      console.error('[contact] Resend a refusé :', reponse.status, detail);
      return res.status(502).json({ error: "Le message n'a pas pu être envoyé. Réessaie plus tard." });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[contact] échec réseau :', err);
    return res.status(502).json({ error: "Le message n'a pas pu être envoyé. Réessaie plus tard." });
  }
}
