'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, Room, Player, Round } from '../../lib/supabaseClient';
import { LobbyScreen } from '../../components/LobbyScreen';
import { RoleDistributionScreen } from '../../components/RoleDistributionScreen';
import { HintRoundScreen } from '../../components/HintRoundScreen';
import { VotingScreen } from '../../components/VotingScreen';
import { ResultScreen } from '../../components/ResultScreen';

export default function GameRoom({ params }: { params: { roomCode: string } }) {
  const router = useRouter();
  const roomCodeSearch = params.roomCode.toUpperCase();
  
  const [room, setRoom] = useState<Room | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [roundInfo, setRoundInfo] = useState<Round | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    let activeChannel: ReturnType<typeof supabase.channel> | null = null;

    const init = async () => {
      // 1. Check local session
      const sessData = localStorage.getItem(`bara_alsalfa_session_${roomCodeSearch}`);
      if (!sessData) {
        if (isMounted) router.replace('/');
        return;
      }
      
      const session = JSON.parse(sessData);
      
      // 2. Fetch Room
      const { data: initialRoom, error: roomErr } = await supabase
        .from('rooms')
        .select('*')
        .eq('room_code', roomCodeSearch)
        .single();
        
      if (roomErr || !initialRoom || !isMounted) {
        if (isMounted) {
          setError('Room not found');
          setLoading(false);
        }
        return;
      }
      
      setRoom(initialRoom);

      // 3. Fetch Players
      const { data: initialPlayers } = await supabase
        .from('players')
        .select('*')
        .eq('room_id', initialRoom.id);
        
      if (initialPlayers && isMounted) {
        setPlayers(initialPlayers);
        const me = initialPlayers.find(p => p.id === session.playerId);
        if (me) setCurrentPlayer(me);
        else {
          router.replace('/');
          return;
        }
      }

      // 4. Fetch Round if exists
      if (initialRoom.current_round_id && isMounted) {
        const { data: rData } = await supabase
          .from('rounds')
          .select('*')
          .eq('id', initialRoom.current_round_id)
          .single();
        if (rData) setRoundInfo(rData);
      }

      if (isMounted) setLoading(false);

      // --- SET UP REALTIME SUBSCRIPTIONS ---
      if (!isMounted) return;

      activeChannel = supabase.channel(`game_${initialRoom.id}`)
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rooms' }, 
          (payload) => {
            if (payload.new.id === initialRoom.id) {
              setRoom(payload.new as Room);
              setActionLoading(false); // Clear loading shield on transition
              if (payload.new.current_round_id) {
                // fetch new round info
                supabase.from('rounds').select('*').eq('id', payload.new.current_round_id).single()
                  .then(({ data }) => setRoundInfo(data as Round));
              }
            }
          }
        )
        .on('postgres_changes', { event: '*', schema: 'public', table: 'players' }, 
          async (payload) => {
             // We refetch players for our room
             const { data: pData } = await supabase.from('players').select('*').eq('room_id', initialRoom.id);
             if (pData) setPlayers(pData as Player[]);
          }
        )
        .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'rounds' }, 
          (payload) => {
            if (payload.new.room_id === initialRoom.id) {
              setRoundInfo(payload.new as Round);
            }
          }
        )
        .subscribe();
    };

    init();

    return () => {
      isMounted = false;
      if (activeChannel) {
        supabase.removeChannel(activeChannel);
      }
    };
  }, [roomCodeSearch, router]);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}><div className="loader"></div></div>;
  }

  if (error || !room || !currentPlayer) {
    return (
      <div className="screen-container">
        <h2>عذراً، حدث خطأ 😢</h2>
        <p>{error}</p>
        <button className="btn" onClick={() => router.push('/')}>العودة للرئيسية</button>
      </div>
    );
  }

  // Render appropriate screen based on room status
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {actionLoading && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="loader" style={{ borderColor: 'var(--primary)' }}></div>
        </div>
      )}
      
      {room.status === 'lobby' && <LobbyScreen room={room} players={players} currentPlayer={currentPlayer} onStartLoading={setActionLoading} />}
      {room.status === 'roles' && <RoleDistributionScreen room={room} currentPlayer={currentPlayer} roundInfo={roundInfo} />}
      {room.status === 'hints' && <HintRoundScreen room={room} players={players} currentPlayer={currentPlayer} roundInfo={roundInfo} />}
      {room.status === 'voting' && <VotingScreen room={room} players={players} currentPlayer={currentPlayer} roundInfo={roundInfo} />}
      {room.status === 'results' && <ResultScreen room={room} players={players} currentPlayer={currentPlayer} roundInfo={roundInfo} />}
    </div>
  );
}
