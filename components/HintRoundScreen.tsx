'use client';

import { Room, Player, Round, supabase } from '../lib/supabaseClient';
import { useLocale } from '../lib/i18n';

export function HintRoundScreen({ 
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

  if (!roundInfo) return <div className="loader"></div>;

  // Use modulo division so turns continue infinitely across players
  const currentTurnIndex = roundInfo.current_turn_index;
  const numPlayers = roundInfo.turn_order.length;
  const currentTurnPlayerId = roundInfo.turn_order[currentTurnIndex % numPlayers];
  const activePlayer = players.find(p => p.id === currentTurnPlayerId);
  const isMyTurn = currentTurnPlayerId === currentPlayer.id;

  const currentLap = Math.floor(currentTurnIndex / numPlayers) + 1;
  const canVoteToEnd = currentLap > 1; // Can end round after first lap

  const endVotes: string[] = (roundInfo.votes as any)?.end_hints || [];
  const hasVotedToEnd = endVotes.includes(currentPlayer.id);
  const requiredVotes = Math.floor(players.length / 2) + 1;

  const handleNextTurn = async () => {
    if (!currentPlayer.is_host && !isMyTurn) return;

    try {
      await supabase
        .from('rounds')
        .update({ current_turn_index: currentTurnIndex + 1 })
        .eq('id', roundInfo.id);
    } catch (e) {
      console.error(e);
    }
  };

  const handleVoteEnd = async () => {
    if (hasVotedToEnd) return;
    
    try {
      const newVotes = [...endVotes, currentPlayer.id];
      const { error: updateError } = await supabase
        .from('rounds')
        .update({ votes: { ...(roundInfo.votes as any), end_hints: newVotes } })
        .eq('id', roundInfo.id);

      if (updateError) throw updateError;

      // If majority voted to end, switch room state to voting
      if (newVotes.length >= requiredVotes) {
        await supabase
          .from('rooms')
          .update({ status: 'voting' })
          .eq('id', room.id);
      }
    } catch (e) {
      console.error(e);
      alert(t.hints.errorVote);
    }
  };

  return (
    <div className="screen-container animate-fade-in">
      <h2>{t.hints.title}</h2>
      <p style={{ marginBottom: '20px' }}>{t.hints.subtitle}</p>

      <div className="card" style={{ textAlign: 'center', margin: '20px 0', border: isMyTurn ? '2px solid var(--primary)' : 'none' }}>
        <div className="avatar" style={{ margin: '0 auto 15px auto', width: '80px', height: '80px', fontSize: '2rem' }}>
          {activePlayer?.name?.substring(0, 1)}
        </div>
        <h2 style={{ color: isMyTurn ? 'var(--primary)' : 'var(--text-main)' }}>
          {isMyTurn ? t.hints.myTurn : `${t.hints.theirTurn} ${activePlayer?.name}`}
        </h2>
      </div>

      <div style={{ width: '100%', marginTop: '20px' }}>
         <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
           <span>{t.hints.lap} {currentLap}</span>
           <span>{t.hints.player} {(currentTurnIndex % numPlayers) + 1} {t.hints.of} {numPlayers}</span>
         </div>
         <div style={{ width: '100%', height: '10px', background: 'var(--bg-color)', borderRadius: '5px', overflow: 'hidden' }}>
           <div style={{ 
              height: '100%', 
              background: 'var(--primary)', 
              width: `${(((currentTurnIndex % numPlayers) + 1) / numPlayers) * 100}%`,
              transition: 'all 0.3s ease'
           }}></div>
         </div>
      </div>

      {(isMyTurn || currentPlayer.is_host) && (
        <button className="btn" style={{ marginTop: '30px' }} onClick={handleNextTurn}>
          {t.hints.next}
        </button>
      )}
      
      {canVoteToEnd && (
        <div style={{ marginTop: '30px', padding: '15px', background: 'var(--card-bg)', borderRadius: '10px', border: '1px dashed var(--accent)' }}>
          <h4 style={{ marginBottom: '10px', color: 'var(--text-main)' }}>{t.hints.endHintsTitle}</h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '15px', color: 'var(--text-muted)' }}>
            {t.hints.endHintsDescription} ({endVotes.length}/{requiredVotes})
          </p>
          <button 
            className="btn" 
            onClick={handleVoteEnd}
            disabled={hasVotedToEnd}
            style={{ 
              width: '100%', 
              background: hasVotedToEnd ? 'var(--bg-color)' : 'var(--danger-color)',
              color: hasVotedToEnd ? 'var(--text-muted)' : '#fff'
            }}
          >
            {hasVotedToEnd ? t.hints.voteSent : t.hints.voteToEnd}
          </button>
        </div>
      )}
      
      {!isMyTurn && !currentPlayer.is_host && !canVoteToEnd && (
        <p style={{ marginTop: '40px', color: 'var(--text-muted)' }}>{t.hints.listening}</p>
      )}
    </div>
  );
}
