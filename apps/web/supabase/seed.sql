
-- Create demo user with password: Demo123456!
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  'demo-user-id',
  'authenticated',
  'authenticated',
  'demo@example.com',
  '$2a$10$LTz7pqxpHl1qVqI7E6GE9O3TKJA0F9F0J5QiXI4TrRSZ7UCLmjVxK',
  NOW(),
  NOW(),
  NOW(),
  '{"provider": "email", "providers": ["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Create demo profile
INSERT INTO public.profiles (id, email, display_name, onboarded)
VALUES ('demo-user-id', 'demo@example.com', 'Demo User', true);
