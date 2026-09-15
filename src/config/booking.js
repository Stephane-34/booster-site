/* Lien de prise de RDV HubSpot (portail EU).
   Source unique de vérité : importé par BookingCTA et la page Investir. */

/* Page HubSpot complète, pour une ouverture dans un nouvel onglet
   (fallback quand les cookies tiers sont refusés). */
export const HUBSPOT_CALENDAR_URL =
  'https://meetings-eu1.hubspot.com/edouard-boulbet';

/* Variante à embarquer dans une iframe : `embed=true` retire l'en-tête
   HubSpot et adapte la mise en page au conteneur parent. */
export const HUBSPOT_CALENDAR_EMBED_URL = `${HUBSPOT_CALENDAR_URL}?embed=true`;
