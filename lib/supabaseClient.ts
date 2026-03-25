import { createClient } from '@supabase/supabase-js';

// Setup instructions:
// You will need to create a Supabase project and provide the URL and anon key
// either in .env.local or directly here if it's a test project.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_anon_key';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: (...args) => fetch(args[0], { ...args[1], cache: 'no-store' })
  }
});

// Schema Types
export type Room = {
  id: string;
  room_code: string;
  host_id: string;
  status: 'lobby' | 'roles' | 'hints' | 'voting' | 'results';
  settings: {
    maxPlayers: number;
  };
  current_round_id: string | null;
  created_at: string;
};

export type Player = {
  id: string;
  room_id: string;
  name: string;
  is_host: boolean;
  is_connected: boolean;
  joined_at: string;
};

export type Round = {
  id: string;
  room_id: string;
  topic: string;
  outsider_player_id: string; // Should be protected by RLS
  turn_order: string[]; // array of player IDs
  current_turn_index: number;
  votes: Record<string, string>; // voterId -> targetId
  final_guess: string | null;
  winner: 'group' | 'outsider_survived' | 'outsider_guessed' | null;
};
