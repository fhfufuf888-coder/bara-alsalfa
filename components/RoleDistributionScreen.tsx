'use client';

import { Room, Player, Round, supabase } from '../lib/supabaseClient';
import { useState, useEffect } from 'react';

export function RoleDistributionScreen({ 
  room, 
  currentPlayer, 
  roundInfo 
}: { 
  room: Room, 
  currentPlayer: Player,
  roundInfo: Round | null
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [readyPlayersCount, setReadyPlayersCount] = useState(0);

  // When all players are ready, the host moves the game to the next state
  const handleImReady = async () => {
    setIsRevealed(true);
    // Track ready mechanism could be implemented via another table or tracking connected states.
    // For simplicity without deeply extending the schema: Host clicks "Proceed to Hints"
  };

  const proceedToHints = async () => {
    if (!currentPlayer.is_host) return;
    try {
      await supabase
        .from('rooms')
        .update({ status: 'hints' })
        .eq('id', room.id);
    } catch (e) {
      console.error(e);
    }
  };

  if (!roundInfo) {
    return <div className="screen-container"><span className="loader"></span></div>;
  }

  const isOutsider = roundInfo.outsider_player_id === currentPlayer.id;

  return (
    <div className="screen-container animate-fade-in">
      <h2>السر هنا 🤫</h2>
      
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>
        تأكد من عدم نظر أي شخص إلى شاشتك!
      </p>

      {!isRevealed ? (
         <div className="card" style={{ textAlign: 'center', padding: '40px 20px', cursor: 'pointer' }} onClick={handleImReady}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👁️</div>
            <h3>اضغط هنا لمعرفة دورك</h3>
         </div>
      ) : (
        <div className="flip-card-container">
          <div className="flip-card flipped">
            <div className="flip-card-back">
              {isOutsider ? (
                <>
                  <div className="role-text-outsider" style={{ color: 'var(--secondary)' }}>أنت برا السالفة! 🤷‍♂️</div>
                  <p style={{ marginTop: '15px' }}>حاول ألا يكتشفك الآخرون، واسمع تلميحاتهم لتعرف الموضوع.</p>
                </>
              ) : (
                <>
                  <div className="role-text-insider" style={{ color: 'var(--primary)' }}>أنت داخل السالفة 🤫</div>
                  <p>الموضوع المخفي هو:</p>
                  <div className="topic-text" style={{ background: 'var(--accent)', padding: '8px 16px', borderRadius: '8px', fontSize: '2rem', fontWeight: 'bold' }}>
                    {roundInfo.topic}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {isRevealed && currentPlayer.is_host && (
         <div style={{ width: '100%', marginTop: '30px', textAlign: 'center' }}>
           <p style={{ marginBottom: '10px', fontSize: '0.9rem' }}>بصفتك المضيف، عندما يؤكد الجميع رؤيتهم للدور، انتقل للتلميحات.</p>
           <button className="btn" onClick={proceedToHints}>
             الجميع جاهز - بدء التلميحات
           </button>
         </div>
      )}
      
      {isRevealed && !currentPlayer.is_host && (
        <div style={{ width: '100%', marginTop: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>بانتظار المضيف لبدء الجولة...</p>
        </div>
      )}
    </div>
  );
}
