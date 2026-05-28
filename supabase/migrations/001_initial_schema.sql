create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

do $$ begin create type user_role as enum ('student', 'teacher', 'parent'); exception when duplicate_object then null; end $$;
do $$ begin create type session_type as enum ('home', 'online', 'group'); exception when duplicate_object then null; end $$;
do $$ begin create type booking_status as enum ('pending','confirmed','completed','cancelled','no_show'); exception when duplicate_object then null; end $$;
do $$ begin create type payment_status as enum ('pending','success','failed','refunded'); exception when duplicate_object then null; end $$;
do $$ begin create type alert_level as enum ('good','watch','urgent'); exception when duplicate_object then null; end $$;
do $$ begin create type verification_status as enum ('pending','verified','rejected'); exception when duplicate_object then null; end $$;

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  phone varchar(15) unique not null,
  name varchar(100) not null,
  role user_role not null,
  avatar_url text,
  email varchar(255),
  location_lat decimal(10,8),
  location_lng decimal(11,8),
  locality varchar(100),
  city varchar(100),
  state varchar(100),
  pincode varchar(10),
  is_active boolean default true,
  fcm_token text,
  whatsapp_opted_in boolean default false,
  referral_code varchar(10) unique,
  referred_by uuid references users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists teacher_profiles (
  id uuid primary key references users(id) on delete cascade,
  bio text,
  tagline varchar(200),
  experience_years integer default 0,
  qualification varchar(200),
  subjects text[] not null default '{}',
  classes_taught text[] not null default '{}',
  session_types session_type[] default '{online}',
  price_home integer,
  price_online integer,
  price_group integer,
  service_radius_km decimal(5,2) default 5.0,
  location geography(point,4326),
  total_students integer default 0,
  total_classes integer default 0,
  rating decimal(3,2) default 0.0,
  total_reviews integer default 0,
  is_verified boolean default false,
  aadhaar_verified boolean default false,
  background_checked boolean default false,
  verification_status verification_status default 'pending',
  free_demo_count integer default 3,
  is_available boolean default true,
  is_featured boolean default false,
  intro_video_url text,
  demo_video_url text,
  bank_account_number varchar(20),
  bank_ifsc varchar(15),
  bank_account_name varchar(100),
  razorpay_contact_id text,
  razorpay_fund_account_id text,
  earnings_total integer default 0,
  earnings_pending integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists student_profiles (
  id uuid primary key references users(id) on delete cascade,
  class_grade varchar(20),
  board varchar(50),
  school_name varchar(200),
  parent_id uuid references users(id),
  target_exam varchar(100),
  weak_subjects text[] default '{}',
  strong_subjects text[] default '{}',
  learning_style varchar(50),
  preferred_timing varchar(50),
  free_demos_remaining integer default 3,
  vidya_points integer default 0,
  streak_days integer default 0,
  last_active timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists teacher_availability (
  id uuid primary key default uuid_generate_v4(),
  teacher_id uuid not null references users(id) on delete cascade,
  day_of_week integer not null check (day_of_week between 0 and 6),
  start_time time not null,
  end_time time not null,
  session_type session_type default 'online',
  is_active boolean default true,
  unique(teacher_id, day_of_week, start_time)
);

create table if not exists bookings (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references users(id),
  teacher_id uuid not null references users(id),
  subject varchar(100) not null,
  class_grade varchar(20),
  session_type session_type not null,
  scheduled_at timestamptz not null,
  duration_minutes integer default 60,
  status booking_status default 'pending',
  is_free_trial boolean default false,
  amount integer default 0,
  platform_fee integer default 0,
  teacher_earning integer default 0,
  payment_status payment_status default 'pending',
  razorpay_order_id text,
  razorpay_payment_id text,
  meeting_link text,
  agora_channel text,
  notes text,
  cancellation_reason text,
  cancelled_by uuid references users(id),
  is_rated boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists student_progress (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references users(id),
  teacher_id uuid not null references users(id),
  booking_id uuid references bookings(id),
  subject varchar(100) not null,
  topic varchar(200),
  score_percentage decimal(5,2),
  homework_submitted boolean default false,
  attendance boolean default true,
  teacher_notes text,
  ai_alert text,
  alert_level alert_level default 'good',
  recorded_at timestamptz default now()
);

create table if not exists reviews (
  id uuid primary key default uuid_generate_v4(),
  booking_id uuid not null references bookings(id),
  student_id uuid not null references users(id),
  teacher_id uuid not null references users(id),
  rating integer not null check (rating between 1 and 5),
  review_text text,
  is_verified boolean default true,
  is_featured boolean default false,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  sender_id uuid not null references users(id),
  receiver_id uuid not null references users(id),
  booking_id uuid references bookings(id),
  content text not null,
  message_type varchar(20) default 'text',
  media_url text,
  is_read boolean default false,
  sent_at timestamptz default now()
);

create table if not exists ai_reports (
  id uuid primary key default uuid_generate_v4(),
  student_id uuid not null references users(id),
  parent_id uuid references users(id),
  week_start date not null,
  week_end date not null,
  overall_score decimal(5,2),
  attendance_percentage decimal(5,2),
  summary_text text,
  subject_scores jsonb default '{}',
  recommendations jsonb default '[]',
  alerts jsonb default '[]',
  learning_dna jsonb default '{}',
  generated_at timestamptz default now(),
  is_sent boolean default false,
  unique(student_id, week_start)
);

create table if not exists payments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id),
  booking_id uuid references bookings(id),
  amount integer not null,
  currency varchar(5) default 'INR',
  type varchar(50) not null,
  razorpay_order_id text unique,
  razorpay_payment_id text unique,
  razorpay_signature text,
  status payment_status default 'pending',
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create table if not exists colony_groups (
  id uuid primary key default uuid_generate_v4(),
  name varchar(200) not null,
  locality varchar(100) not null,
  city varchar(100) not null,
  created_by uuid not null references users(id),
  teacher_id uuid references users(id),
  subject varchar(100),
  class_grade varchar(20),
  max_students integer default 10,
  current_students integer default 0,
  price_per_student integer,
  status varchar(20) default 'forming',
  scheduled_at timestamptz,
  invite_code varchar(10) unique,
  created_at timestamptz default now()
);

create table if not exists colony_group_members (
  id uuid primary key default uuid_generate_v4(),
  group_id uuid not null references colony_groups(id),
  student_id uuid not null references users(id),
  parent_id uuid references users(id),
  joined_at timestamptz default now(),
  payment_status payment_status default 'pending',
  unique(group_id, student_id)
);

create table if not exists notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id),
  title varchar(200) not null,
  body text not null,
  type varchar(50),
  data jsonb default '{}',
  is_read boolean default false,
  created_at timestamptz default now()
);

create table if not exists teacher_documents (
  id uuid primary key default uuid_generate_v4(),
  teacher_id uuid not null references users(id),
  document_type varchar(50) not null,
  document_url text not null,
  verification_status verification_status default 'pending',
  verified_at timestamptz,
  created_at timestamptz default now()
);

create index if not exists idx_teacher_profiles_location on teacher_profiles using gist(location);
create index if not exists idx_bookings_student on bookings(student_id);
create index if not exists idx_bookings_teacher on bookings(teacher_id);
create index if not exists idx_bookings_scheduled on bookings(scheduled_at);
create index if not exists idx_messages_sender on messages(sender_id);
create index if not exists idx_messages_receiver on messages(receiver_id);
create index if not exists idx_progress_student on student_progress(student_id);
create index if not exists idx_notifications_user on notifications(user_id, is_read);

create or replace function update_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists update_users_updated_at on users;
create trigger update_users_updated_at before update on users for each row execute function update_updated_at();
drop trigger if exists update_teacher_profiles_updated_at on teacher_profiles;
create trigger update_teacher_profiles_updated_at before update on teacher_profiles for each row execute function update_updated_at();

alter table users enable row level security;
alter table teacher_profiles enable row level security;
alter table student_profiles enable row level security;
alter table bookings enable row level security;
alter table teacher_availability enable row level security;
alter table messages enable row level security;
alter table student_progress enable row level security;
alter table payments enable row level security;
alter table ai_reports enable row level security;
alter table notifications enable row level security;
alter table reviews enable row level security;
alter table colony_groups enable row level security;
alter table colony_group_members enable row level security;
alter table teacher_documents enable row level security;

create policy "public_teacher_profiles" on teacher_profiles for select using (true);
create policy "users_own_profile" on users for all using (auth.uid() = id);
create policy "students_own_data" on student_profiles for all using (auth.uid() = id or auth.uid() = parent_id);
create policy "bookings_participants" on bookings for all using (auth.uid() = student_id or auth.uid() = teacher_id);
create policy "messages_participants" on messages for all using (auth.uid() = sender_id or auth.uid() = receiver_id);
create policy "progress_participants" on student_progress for all using (auth.uid() = student_id or auth.uid() = teacher_id);
create policy "notifications_own" on notifications for all using (auth.uid() = user_id);
create policy "ai_reports_family" on ai_reports for select using (auth.uid() = student_id or auth.uid() = parent_id);
create policy "payments_own" on payments for select using (auth.uid() = user_id);
