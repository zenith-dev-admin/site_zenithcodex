-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table for Budget Requests
create table public.budget_requests (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  project_type text not null,
  description text not null,
  budget text,
  status text default 'pending' check (status in ('pending', 'reviewed', 'contacted', 'closed'))
);

-- Table for Contact Messages
create table public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  message text not null,
  status text default 'unread' check (status in ('unread', 'read', 'replied'))
);

-- Table for Chat Conversations
create table public.conversations (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  session_id text not null,
  messages jsonb not null
);

-- Row Level Security (RLS) policies
alter table public.budget_requests enable row level security;
alter table public.contact_messages enable row level security;
alter table public.conversations enable row level security;

-- Create policy to allow inserting data (public access for forms)
create policy "Allow public insert to budget_requests" on public.budget_requests for insert with check (true);
create policy "Allow public insert to contact_messages" on public.contact_messages for insert with check (true);
create policy "Allow public insert to conversations" on public.conversations for insert with check (true);

-- Create policy for reading (only authenticated users/service role)
create policy "Allow read access to authenticated users only" on public.budget_requests for select using (auth.role() = 'authenticated' or auth.role() = 'service_role');
create policy "Allow read access to authenticated users only" on public.contact_messages for select using (auth.role() = 'authenticated' or auth.role() = 'service_role');
-- Conversation reading might be needed for the user themselves later, but for now restrict default read.
