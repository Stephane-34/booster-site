-- RGPD - l'âge minimum passe de 13 à 15 ans (art. 8 RGPD tel qu'appliqué
-- en droit français : le consentement d'un mineur au traitement de ses
-- données est valide à partir de 15 ans, en-dessous il faut le
-- consentement du titulaire de l'autorité parentale).
--
-- On ne casse pas les comptes existants qui pourraient avoir age < 15
-- (créés avant cette migration) : on ne fait qu'ajuster la CHECK pour les
-- nouvelles inscriptions.

alter table public.profiles
  drop constraint if exists profiles_age_check;

alter table public.profiles
  add constraint profiles_age_check
    check (age is null or (age between 15 and 120));
