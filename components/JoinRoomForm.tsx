'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

export function JoinRoomForm() {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) return setError('يرجى إدخال اسمك');
    if (!roomCode.trim() || roomCode.length < 4) return setError('كود الغرفة غير صحيح');

    setLoading(true);
    setError('');
    
    const cleanCode = roomCode.trim().toUpperCase();

    try {
      // 1. Fetch Room
      const { data: room, error: fetchError } = await supabase
        .from('rooms')
        .select('*')
        .eq('room_code', cleanCode)
        .single();

      if (fetchError || !room) {
        throw new Error('الغرفة غير موجودة');
      }

      if (room.status !== 'lobby') {
        throw new Error('اللعبة قد بدأت بالفعل!');
      }

      // 2. Check current players
      const { data: currentPlayers, error: pError } = await supabase
        .from('players')
        .select('*')
        .eq('room_id', room.id);

      if (pError) throw pError;

      if (currentPlayers.length >= room.settings.maxPlayers) {
        throw new Error('الغرفة ممتلئة!');
      }

      const nameExists = currentPlayers.some(p => p.name === playerName.trim());
      if (nameExists) {
        throw new Error('الاسم مستخدم بالفعل، اختر اسماً آخر');
      }

      // 3. Insert Player
      const playerId = crypto.randomUUID();
      const { error: insertError } = await supabase
        .from('players')
        .insert({
          id: playerId,
          room_id: room.id,
          name: playerName.trim(),
          is_host: false,
          is_connected: true
        });

      if (insertError) throw insertError;

      // Store player session locally
      localStorage.setItem(`bara_alsalfa_session_${cleanCode}`, JSON.stringify({
        playerId,
        playerName: playerName.trim(),
        isHost: false
      }));

      // Navigate to Room
      router.push(`/${cleanCode}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'حدث خطأ أثناء الانضمام. يرجى المحاولة مرة أخرى.');
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 style={{ marginBottom: '16px' }}>الانضمام إلى لعبة</h3>
      <form onSubmit={handleJoin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="input-group">
          <label className="input-label">كود الغرفة</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="أدخل كود الغرفة (مثال: AB12X)" 
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            style={{ textTransform: 'uppercase', letterSpacing: '2px', textAlign: 'center' }}
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label className="input-label">اسمك</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="أدخل اسمك..." 
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            disabled={loading}
          />
        </div>

        {error && <div className="error-text">{error}</div>}

        <button type="submit" className="btn btn-secondary" disabled={loading}>
          {loading ? <span className="loader" style={{ borderColor: 'var(--primary)' }}></span> : 'انضمام'}
        </button>
      </form>
    </div>
  );
}
