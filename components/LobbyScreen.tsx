'use client';

import { supabase, Player, Room } from '../lib/supabaseClient';
import { getRandomTopic, shuffleArray } from '../lib/gameLogic';

export function LobbyScreen({ 
  room, 
  players, 
  currentPlayer, 
  onStartLoading 
}: { 
  room: Room, 
  players: Player[], 
  currentPlayer: Player,
  onStartLoading: (loading: boolean) => void 
}) {
  
  const handleStartGame = async () => {
    if (!currentPlayer.is_host) return;
    if (players.length < 3) {
      alert('يجب أن يكون هناك 3 لاعبين على الأقل لبدء اللعبة.');
      return;
    }
    
    onStartLoading(true);
    
    try {
      // 1. Generate topic and roles
      const topic = getRandomTopic('عشوائي');
      const outsiderIndex = Math.floor(Math.random() * players.length);
      const outsiderId = players[outsiderIndex].id;
      
      const turnOrder = shuffleArray(players.map(p => p.id));
      
      // 2. Create Round
      const { data: roundData, error: roundError } = await supabase
        .from('rounds')
        .insert({
          room_id: room.id,
          topic: topic,
          outsider_player_id: outsiderId,
          turn_order: turnOrder,
          current_turn_index: 0,
          votes: {}
        })
        .select()
        .single();
        
      if (roundError) throw roundError;
      
      // 3. Update Room status
      const { error: roomUpdateError } = await supabase
        .from('rooms')
        .update({ 
          status: 'roles', 
          current_round_id: roundData.id 
        })
        .eq('id', room.id);
        
      if (roomUpdateError) throw roomUpdateError;
      
    } catch (err) {
      console.error(err);
      alert('حدث خطأ أثناء محاولة بدء اللعبة.');
      onStartLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(room.room_code);
    alert('تم نسخ الكود!');
  };

  return (
    <div className="screen-container animate-fade-in">
      <h2>غرفة الانتظار ⏳</h2>
      <div className="card" style={{ textAlign: 'center' }}>
        <p>كود الغرفة:</p>
        <h1 style={{ letterSpacing: '4px', fontSize: '3rem', margin: '10px 0' }}>{room.room_code}</h1>
        <Button onClick={copyCode} variant="secondary" style={{ padding: '8px 16px', fontSize: '1rem', width: 'auto', margin: '0 auto' }}>
          نسخ الكود 📋
        </Button>
      </div>

      <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ margin: 0 }}>اللاعبين</h3>
          <span style={{ fontWeight: 'bold' }}>{players.length} / {room.settings.maxPlayers}</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
          {players.map(p => (
            <div key={p.id} className="list-item" style={{ marginBottom: 0 }}>
              <div className="avatar">
                 {p.name.substring(0, 1)}
              </div>
              <div className="list-item-name">{p.name} {p.id === currentPlayer.id ? '(أنت)' : ''}</div>
              {p.is_host && <span style={{ fontSize: '0.8rem', background: 'var(--accent)', color: '#000', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>المضيف 👑</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: '100%' }}>
        {currentPlayer.is_host ? (
          <Button onClick={handleStartGame} disabled={players.length < 3}>
            {players.length < 3 ? 'بانتظار المزيد من اللاعبين...' : 'ابدأ اللعب الآن'}
          </Button>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '16px' }}>
            بانتظار المضيف لبدء اللعبة...
          </div>
        )}
      </div>
    </div>
  );
}

// Simple internal Button fallback
function Button({ onClick, children, variant = 'primary', className = '', style, disabled = false }: any) {
  const baseClass = variant === 'primary' ? 'btn' : (variant === 'danger' ? 'btn btn-danger' : 'btn btn-secondary');
  return (
    <button className={`${baseClass} ${className}`} onClick={onClick} style={style} disabled={disabled}>
      {children}
    </button>
  );
}

