-- Suppression du compte créé pour valider l'envoi SMTP via Resend.
--
-- Ce compte a servi à prouver qu'une adresse hors équipe Supabase recevait
-- bien son email de confirmation — ce qui échouait avec le service intégré.
-- Il n'a plus d'utilité et ne doit pas rester dans la base.
--
-- Idempotente : le `where` ne cible qu'une adresse précise, un rejeu sur une
-- base où le compte n'existe plus ne fait rien. Les données liées (profiles,
-- academy_quiz_results, user_progress) partent par les `on delete cascade`
-- déjà en place.
delete from auth.users
 where email = 'booster-smtp-test-1790066490@yopmail.com';
