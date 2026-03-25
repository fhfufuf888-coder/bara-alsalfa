'use client';

import { useState, useEffect } from 'react';
import { Room, Player, Round, supabase } from '../lib/supabaseClient';
import { useLocale } from '../lib/i18n';

export function VotingScreen({ 
  room, 
  players, 
  currentPlayer, 
  roundInfo 
}: { 
  room: Room, 
  players: Player[], 
  currentPlayer: Player,
  roundInfo: Round | null
}) {
  const { t } = useLocale();
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  if (!roundInfo) return <div className="loader"></div>;

  const currentVotes = roundInfo.votes || {};
  const totalVotesCast = Object.keys(currentVotes).length;
  const allVoted = totalVotesCast === players.length;

  useEffect(() => {
    if (currentVotes[currentPlayer.id]) {
      setHasVoted(true);
    }
  }, [currentVotes, currentPlayer.id]);

  const submitVote = async () => {
    if (!selectedTarget) return;
    
    try {
      const updatedVotes = { ...currentVotes, [currentPlayer.id]: selectedTarget };
      
      await supabase
        .from('rounds')
        .update({ votes: updatedVotes })
        .eq('id', roundInfo.id);
        
      setHasVoted(true);
    } catch (e) {
      console.error(e);
    }
  };

  const endVoting = async () => {
    if (!currentPlayer.is_host) return;
    try {
      await supabase
        .from('rooms')
        .update({ status: 'results' })
        .eq('id', room.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="screen-container animate-fade-in">
      <h2>{t.voting.title}</h2>
      <p style={{ marginBottom: '20px' }}>{t.voting.subtitle}</p>

      {!hasVoted ? (
        <>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            {players.map((p) => {
              if (p.id === currentPlayer.id) return null; // Can't vote for self
              return (
                <div 
                  key={p.id}
                  className={`list-item ${selectedTarget === p.id ? 'selected' : ''}`}
                  onClick={() => setSelectedTarget(p.id)}
                >
                   <div className="avatar">{p.name.substring(0, 1)}</div>
                   <div className="list-item-name">{p.name}</div>
                </div>
              );
            })}
          </div>

          <button 
            className="btn"
            onClick={submitVote} 
            style={{ marginTop: '20px', opacity: selectedTarget === null ? 0.5 : 1 }}
            disabled={selectedTarget === null}
          >
            {t.voting.confirmVote}
          </button>
        </>
      ) : (
        <div className="card" style={{ textAlign: 'center' }}>
          <h3>{t.voting.voteReceived}</h3>
          <p style={{ margin: '15px 0' }}>{t.voting.waitingVotes}</p>
          <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
             {totalVotesCast} / {players.length} {t.voting.voted}
          </div>
        </div>
      )}

      {currentPlayer.is_host && (
        <button 
          className="btn btn-secondary" 
          onClick={endVoting} 
          style={{ marginTop: '20px' }}
        >
          {allVoted ? t.voting.showResults : t.voting.endEarly}
        </button>
      )}
    </div>
  );
}
