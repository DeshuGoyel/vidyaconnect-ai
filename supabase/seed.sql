insert into users (id, phone, name, role, locality, city, state, referral_code)
values
  ('11111111-1111-4111-8111-111111111111', '9000000001', 'Ananya Sharma', 'teacher', 'Indiranagar', 'Bengaluru', 'Karnataka', 'ANANYA01'),
  ('55555555-5555-4555-8555-555555555555', '9000000002', 'Rohan Singh', 'student', 'Indiranagar', 'Bengaluru', 'Karnataka', 'ROHAN01')
on conflict (id) do nothing;

insert into teacher_profiles (id, bio, tagline, experience_years, qualification, subjects, classes_taught, session_types, price_home, price_online, price_group, rating, total_reviews, is_verified, aadhaar_verified, background_checked, verification_status)
values
  ('11111111-1111-4111-8111-111111111111', 'CBSE and ICSE math specialist.', 'Maths ko simple banaane wali mentor', 8, 'M.Sc Mathematics', '{"Mathematics","Science"}', '{"Class 8","Class 9"}', '{"home","online"}', 800, 550, 320, 4.9, 184, true, true, true, 'verified')
on conflict (id) do nothing;
