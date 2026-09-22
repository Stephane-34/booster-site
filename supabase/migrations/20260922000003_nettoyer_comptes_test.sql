-- Nettoyage de tous les comptes de test SMTP.
--
-- La migration précédente ciblait une adresse exacte ; la vérification qui a
-- suivi — une tentative de réinscription censée confirmer que l'adresse était
-- libre — a recréé le compte. Le motif est donc élargi, pour couvrir aussi
-- bien le compte initial que celui recréé, et tout futur test suivant la même
-- convention de nommage.
--
-- Idempotente : un rejeu sans compte correspondant ne fait rien. Les données
-- liées partent par les `on delete cascade`.
delete from auth.users
 where email like 'booster-smtp-test-%@yopmail.com';
