-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table
create table public.users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  password text not null, -- Store securely hashed passwords
  company_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security) for Users
alter table public.users enable row level security;

-- Transactions Table
create table public.transactions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.users(id) on delete cascade not null,
  amount numeric not null,
  status text not null, -- e.g., 'APPROVED', 'REVIEW', 'DECLINED'
  timestamp timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Transactions
alter table public.transactions enable row level security;

-- Predictions Table
create table public.predictions (
  id uuid primary key default uuid_generate_v4(),
  transaction_id uuid references public.transactions(id) on delete cascade not null,
  risk_score numeric not null, -- e.g., 0.0 to 1.0 probability
  fraud_status boolean not null, -- true if considered fraud based on threshold
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for Predictions
alter table public.predictions enable row level security;

-- Basic RLS Policies (Users can only see their own data)
create policy "Users can view own data" on public.users for select using (auth.uid() = id);
create policy "Users can view own transactions" on public.transactions for select using (auth.uid() = user_id);
-- Note: You may need more complex policies or disable RLS depending on how your backend connects (e.g., using service role).
