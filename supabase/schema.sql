create extension if not exists "uuid-ossp";

do $$ begin
  create type user_role as enum ('student', 'teacher', 'parent');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type session_type as enum ('home', 'online', 'group');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type booking_status as enum ('pending', 'confirmed', 'completed', 'cancelled');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type payment_status as enum ('pending', 'paid', 'refunded');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type payment_type as enum ('booking', 'wallet_topup', 'payout');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type razorpay_status as enum ('pending', 'success', 'failed');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type alert_level as enum ('good', 'watch', 'urgent');
exception when duplicate_object then null;
end $$;

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  phone text unique,
  name text not null,
  role user_role not null,
  avatar_url text,
  location_lat double precision,
  location_lng double precision,
  locality text,
  city text,
  created_at timestamptz not null default now()
);

create table if not exists public.teacher_profiles (
  id uuid primary key references public.users(id) on delete cascade,
  bio text,
  experience_years int not null default 0,
  subjects text[] not null default '{}',
  classes_taught text[] not null default '{}',
  session_types text[] not null default '{}',
  price_per_month int not null default 0,
  service_radius_km double precision not null default 3,
  is_verified boolean not null default false,
  aadhaar_verified boolean not null default false,
  rating double precision not null default 0,
  total_reviews int not null default 0,
  total_students int not null default 0,
  is_available boolean not null default true
);

create table if not exists public.student_profiles (
  id uuid primary key references public.users(id) on delete cascade,
  class_grade text,
  parent_id uuid references public.users(id) on delete set null,
  vidya_points int not null default 0,
  free_demos_remaining int not null default 3
);

create table if not exists public.bookings (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.users(id) on delete cascade,
  teacher_id uuid not null references public.users(id) on delete cascade,
  subject text not null,
  session_type session_type not null,
  scheduled_at timestamptz not null,
  duration_minutes int not null default 60,
  status booking_status not null default 'pending',
  is_free_trial boolean not null default false,
  amount int not null default 0,
  payment_status payment_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.teacher_availability (
  id uuid primary key default uuid_generate_v4(),
  teacher_id uuid not null references public.users(id) on delete cascade,
  day_of_week int not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  is_active boolean not null default true
);

create table if not exists public.student_progress (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.users(id) on delete cascade,
  teacher_id uuid not null references public.users(id) on delete cascade,
  subject text not null,
  topic text not null,
  score_percentage double precision not null check (score_percentage between 0 and 100),
  recorded_at timestamptz not null default now(),
  ai_alert text,
  alert_level alert_level not null default 'good'
);

create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  sender_id uuid not null references public.users(id) on delete cascade,
  receiver_id uuid not null references public.users(id) on delete cascade,
  content text not null,
  sent_at timestamptz not null default now(),
  is_read boolean not null default false
);

create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  student_id uuid not null references public.users(id) on delete cascade,
  teacher_id uuid not null references public.users(id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  review_text text,
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  amount int not null,
  type payment_type not null,
  razorpay_order_id text,
  razorpay_payment_id text,
  status razorpay_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists public.ai_reports (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references public.users(id) on delete cascade,
  parent_id uuid not null references public.users(id) on delete cascade,
  week_start date not null,
  summary_text text not null,
  recommendations jsonb not null default '[]'::jsonb,
  overall_score double precision not null check (overall_score between 0 and 100),
  generated_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.teacher_profiles enable row level security;
alter table public.student_profiles enable row level security;
alter table public.bookings enable row level security;
alter table public.teacher_availability enable row level security;
alter table public.student_progress enable row level security;
alter table public.messages enable row level security;
alter table public.reviews enable row level security;
alter table public.payments enable row level security;
alter table public.ai_reports enable row level security;

drop policy if exists "Users read own profile" on public.users;
create policy "Users read own profile" on public.users
  for select using (auth.uid() = id);

drop policy if exists "Users update own profile" on public.users;
create policy "Users update own profile" on public.users
  for update using (auth.uid() = id);

drop policy if exists "Public teacher profiles" on public.teacher_profiles;
create policy "Public teacher profiles" on public.teacher_profiles
  for select using (true);

drop policy if exists "Teachers manage own profile" on public.teacher_profiles;
create policy "Teachers manage own profile" on public.teacher_profiles
  for all using (auth.uid() = id);

drop policy if exists "Students own data" on public.student_profiles;
create policy "Students own data" on public.student_profiles
  for all using (auth.uid() = id);

drop policy if exists "Parent sees child data" on public.student_profiles;
create policy "Parent sees child data" on public.student_profiles
  for select using (parent_id = auth.uid() or id = auth.uid());

drop policy if exists "Booking participants access" on public.bookings;
create policy "Booking participants access" on public.bookings
  for all using (student_id = auth.uid() or teacher_id = auth.uid());

drop policy if exists "Teachers manage availability" on public.teacher_availability;
create policy "Teachers manage availability" on public.teacher_availability
  for all using (teacher_id = auth.uid());

drop policy if exists "Availability is discoverable" on public.teacher_availability;
create policy "Availability is discoverable" on public.teacher_availability
  for select using (is_active = true);

drop policy if exists "Teacher sees booked students" on public.student_progress;
create policy "Teacher sees booked students" on public.student_progress
  for select using (teacher_id = auth.uid() or student_id = auth.uid());

drop policy if exists "Message participants access" on public.messages;
create policy "Message participants access" on public.messages
  for all using (sender_id = auth.uid() or receiver_id = auth.uid());

drop policy if exists "Review participants access" on public.reviews;
create policy "Review participants access" on public.reviews
  for all using (student_id = auth.uid() or teacher_id = auth.uid());

drop policy if exists "Users see own payments" on public.payments;
create policy "Users see own payments" on public.payments
  for select using (user_id = auth.uid());

drop policy if exists "Parents and students see reports" on public.ai_reports;
create policy "Parents and students see reports" on public.ai_reports
  for select using (student_id = auth.uid() or parent_id = auth.uid());

alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.bookings;
alter publication supabase_realtime add table public.teacher_availability;
