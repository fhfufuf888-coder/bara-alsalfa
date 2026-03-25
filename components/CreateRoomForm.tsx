'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

export function CreateRoomForm() {
  const router = useRouter();
  const [hostName, setHostName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hostName.trim()) {
      setError('يرجى إدخال اسمك');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const roomCode = generateRoomCode();
      const hostId = crypto.randomUUID();

      // 1. Create Room
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .insert({
          room_code: roomCode,
          host_id: hostId,
          status: 'lobby',
          settings: { maxPlayers }
        })
        .select()
        .single();

      if (roomError) throw roomError;

      // 2. Create Host Player
      const { error: playerError } = await supabase
        .from('players')
        .insert({
          id: hostId,
          room_id: room.id,
          name: hostName.trim(),
          is_host: true,
          is_connected: true
        });

      if (playerError) throw playerError;

      // Store player session locally so we know who this user is
      localStorage.setItem(`bara_alsalfa_session_${roomCode}`, JSON.stringify({
        playerId: hostId,
        playerName: hostName.trim(),
        isHost: true
      }));

      // Navigate to Room
      router.push(`/${roomCode}`);
    } catch (err: any) {
      console.error(err);
      setError('حدث خطأ أثناء إنشاء الغرفة. تأكد من إعداد قاعدة البيانات.');
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 style={{ marginBottom: '16px' }}>إنشاء لعبة جديدة</h3>
      <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="input-group">
          <label className="input-label">اسمك</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="أدخل اسمك..." 
            value={hostName}
            onChange={(e) => setHostName(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div className="input-group">
          <label className="input-label">أقصى عدد للاعبين ({maxPlayers})</label>
          <input 
            type="range" 
            min="3" 
            max="12" 
            value={maxPlayers}
            onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
            style={{ direction: 'ltr' }}
            disabled={loading}
          />
        </div>

        {error && <div className="error-text">{error}</div>}

        <button type="submit" className="btn" disabled={loading}>
          {loading ? <span className="loader"></span> : 'إنشاء غرفة'}
        </button>
      </form>
    </div>
  );
}
