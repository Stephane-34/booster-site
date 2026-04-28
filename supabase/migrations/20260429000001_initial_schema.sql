-- Schéma initial Booster
-- Auth géré nativement par Supabase (auth.users)

-- ─── Profils utilisateurs ────────────────────────────────────────────────────
-- Créé automatiquement à l'inscription via trigger
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  plan        text not null default 'starter' check (plan in ('starter', 'booster')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Activer RLS
alter table public.profiles enable row level security;

-- Un utilisateur ne voit et ne modifie que son propre profil
create policy "Lecture profil personnel"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Modification profil personnel"
  on public.profiles for update
  using (auth.uid() = id);

-- ─── Questions QCM ───────────────────────────────────────────────────────────
create table if not exists public.quiz_questions (
  id          uuid primary key default gen_random_uuid(),
  theme       text not null,
  question    text not null,
  options     jsonb not null,   -- [{ id, text }]
  correct     text not null,    -- id de la bonne réponse
  explanation text not null,
  difficulty  int not null default 1 check (difficulty between 1 and 3),
  created_at  timestamptz not null default now()
);

-- Les questions sont publiques en lecture
alter table public.quiz_questions enable row level security;

create policy "Questions publiques en lecture"
  on public.quiz_questions for select
  using (true);

-- ─── Réponses aux QCM ────────────────────────────────────────────────────────
create table if not exists public.quiz_answers (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  question_id uuid not null references public.quiz_questions(id) on delete cascade,
  is_correct  boolean not null,
  answered_at timestamptz not null default now(),
  unique (user_id, question_id)   -- une seule réponse par question par user
);

alter table public.quiz_answers enable row level security;

create policy "Lecture réponses personnelles"
  on public.quiz_answers for select
  using (auth.uid() = user_id);

create policy "Insertion réponses personnelles"
  on public.quiz_answers for insert
  with check (auth.uid() = user_id);

-- ─── Progression utilisateur ─────────────────────────────────────────────────
create table if not exists public.user_progress (
  user_id           uuid primary key references auth.users(id) on delete cascade,
  global_grade      text not null default 'D',
  correct_answers   int not null default 0,
  total_answers     int not null default 0,
  updated_at        timestamptz not null default now()
);

alter table public.user_progress enable row level security;

create policy "Lecture progression personnelle"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Modification progression personnelle"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- ─── Trigger : création automatique du profil à l'inscription ────────────────
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );

  insert into public.user_progress (user_id)
  values (new.id);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Données de démo : questions QCM ─────────────────────────────────────────
insert into public.quiz_questions (theme, question, options, correct, explanation, difficulty)
values
  (
    'Enrichissement',
    'Qu''est-ce que le Dollar-Cost Averaging (DCA) ?',
    '[{"id":"a","text":"Acheter une seule fois une grande quantité d''actifs"},{"id":"b","text":"Investir un montant fixe régulièrement, quelle que soit la valeur"},{"id":"c","text":"Vendre ses actifs quand le marché baisse"},{"id":"d","text":"Diversifier uniquement dans des obligations"}]',
    'b',
    'Le DCA consiste à investir un montant fixe à intervalles réguliers (ex: 100€/mois). Cela réduit l''impact de la volatilité et évite le biais de market timing.',
    1
  ),
  (
    'Fiscalité',
    'Quel est le taux du Prélèvement Forfaitaire Unique (PFU) appliqué sur les plus-values mobilières ?',
    '[{"id":"a","text":"17,2 %"},{"id":"b","text":"30 %"},{"id":"c","text":"33 %"},{"id":"d","text":"45 %"}]',
    'b',
    'Le PFU (ou "flat tax") = 12,8 % d''impôt sur le revenu + 17,2 % de prélèvements sociaux = 30 % total.',
    2
  ),
  (
    'Immobilier',
    'Qu''est-ce qu''une SCPI ?',
    '[{"id":"a","text":"Une société qui vend des appartements"},{"id":"b","text":"Un fonds qui investit dans l''immobilier et distribue des loyers"},{"id":"c","text":"Un prêt immobilier à taux variable"},{"id":"d","text":"Une assurance habitation collective"}]',
    'b',
    'La SCPI (Société Civile de Placement Immobilier) te permet d''investir dans la pierre dès quelques centaines d''euros et de percevoir des loyers proportionnels à ta part.',
    1
  ),
  (
    'Retraite',
    'Quel avantage fiscal principal offre le PER (Plan Épargne Retraite) ?',
    '[{"id":"a","text":"Exonération totale d''impôt sur les plus-values"},{"id":"b","text":"Déduction des versements du revenu imposable"},{"id":"c","text":"Aucune fiscalité à la sortie"},{"id":"d","text":"Taux réduit de prélèvements sociaux"}]',
    'b',
    'Les versements sur un PER individuel sont déductibles du revenu imposable, dans la limite de 10 % des revenus professionnels. L''avantage fiscal est donc immédiat.',
    2
  ),
  (
    'Enrichissement',
    'Quelle est la règle des 72 ?',
    '[{"id":"a","text":"Un portefeuille doit contenir au moins 72 valeurs"},{"id":"b","text":"On divise 72 par le taux de rendement pour obtenir le nombre d''années pour doubler son capital"},{"id":"c","text":"Le rendement maximal légal en Europe est de 7,2 %"},{"id":"d","text":"Il faut épargner 72 % de ses revenus"}]',
    'b',
    'La règle des 72 permet d''estimer rapidement le temps de doublement : à 8 %/an, 72/8 = 9 ans. C''est une approximation utile pour comparer des placements.',
    1
  ),
  (
    'Fiscalité',
    'Après combien d''années les gains sur une assurance-vie bénéficient-ils de l''abattement fiscal ?',
    '[{"id":"a","text":"3 ans"},{"id":"b","text":"5 ans"},{"id":"c","text":"8 ans"},{"id":"d","text":"10 ans"}]',
    'c',
    'Après 8 ans de détention, les rachats bénéficient d''un abattement annuel de 4 600 € (personne seule) ou 9 200 € (couple) sur les gains. C''est l''un des avantages majeurs de l''assurance-vie.',
    2
  )
on conflict do nothing;
