-- Create the posts table for the Classroom Discussion Forum
-- Run this in the Supabase SQL Editor

CREATE TABLE posts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on created_at for faster queries
CREATE INDEX posts_created_at_idx ON posts(created_at DESC);

-- Enable Row Level Security (optional, for future auth)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all users to read posts (no login required)
CREATE POLICY "Allow public read access" 
ON posts FOR SELECT 
USING (true);

-- Create a policy to allow all users to insert posts (no login required)
CREATE POLICY "Allow public insert access" 
ON posts FOR INSERT 
WITH CHECK (true);
