-- Supabase Schema for Bara Alsalfa Multiplayer

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Rooms Table
CREATE TABLE rooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_code VARCHAR(6) UNIQUE NOT NULL,
    host_id UUID NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'lobby',
    settings JSONB NOT NULL DEFAULT '{"maxPlayers": 8}',
    current_round_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Players Table
CREATE TABLE players (
    id UUID PRIMARY KEY,
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    is_host BOOLEAN NOT NULL DEFAULT false,
    is_connected BOOLEAN NOT NULL DEFAULT true,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Rounds Table
CREATE TABLE rounds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
    topic VARCHAR(255) NOT NULL,
    outsider_player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    turn_order JSONB NOT NULL,
    current_turn_index INTEGER NOT NULL DEFAULT 0,
    votes JSONB NOT NULL DEFAULT '{}',
    final_guess VARCHAR(255),
    winner VARCHAR(50)
);

-- Enable Realtime
alter publication supabase_realtime add table rooms;
alter publication supabase_realtime add table players;
alter publication supabase_realtime add table rounds;

-- (Optional) RLS Policies
-- To prevent cheating, enable Row Level Security to ensure players cannot see the 'outsider_player_id' 
-- or 'topic' unless they are the outsider (for topic) or the game is in the 'results' status.
-- Due to complexity of stateless connections in this demo, RLS is currently off.
-- Note: Set policies strictly if deploying for production.
