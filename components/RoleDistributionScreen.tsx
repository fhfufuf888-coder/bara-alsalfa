'use client';

import { Room, Player, Round, supabase } from '../lib/supabaseClient';
import { useState } from 'react';
import { useLocale } from '../lib/i18n';

export function RoleDistributionScreen({ 
  room, 
  currentPlayer, 
  roundInfo 
}: { 
  room: Room, 
  currentPlayer: Player,
  roundInfo: Round | null
}) {
  const { t } = useLocale();
  const [isRevealed, setIsRevealed] = useState(false);

  const handleImReady = async () => {
    setIsRevealed(true);
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
      <h2>{t.roles.title}</h2>
      
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>
        {t.roles.instruction}
      </p>

      {!isRevealed ? (
         <div className="card" style={{ textAlign: 'center', padding: '40px 20px', cursor: 'pointer' }} onClick={handleImReady}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>👁️</div>
            <h3>{t.roles.tapToReveal}</h3>
         </div>
      ) : (
        <div className="flip-card-container">
          <div className="flip-card flipped">
            <div className="flip-card-back">
              {isOutsider ? (
                <>
                  <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '1rem', marginBottom: '15px', display: 'inline-block' }}>
                    {t.roles.category} <strong>{room.settings?.current_category || t.roles.unknown}</strong>
                  </div>
                  <div className="role-text-outsider" style={{ color: 'var(--secondary)' }}>{t.roles.outsiderRole}</div>
                  <p style={{ marginTop: '15px' }}>{t.roles.outsiderHint}</p>
                </>
              ) : (
                <>
                  <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '1rem', marginBottom: '15px', display: 'inline-block' }}>
                    {t.roles.category} <strong>{room.settings?.current_category || t.roles.unknown}</strong>
                  </div>
                  <div className="role-text-insider" style={{ color: 'var(--primary)' }}>{t.roles.insiderRole}</div>
                  <p>{t.roles.insiderTopic}</p>
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
           <p style={{ marginBottom: '10px', fontSize: '0.9rem' }}>{t.roles.hostInstruction}</p>
           <button className="btn" onClick={proceedToHints}>
             {t.roles.hostReady}
           </button>
         </div>
      )}
      
      {isRevealed && !currentPlayer.is_host && (
        <div style={{ width: '100%', marginTop: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>{t.roles.waitingHost}</p>
        </div>
      )}
    </div>
  );
}
