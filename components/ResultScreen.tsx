'use client';

import { useState } from 'react';
import { Room, Player, Round, supabase } from '../lib/supabaseClient';
import { useLocale } from '../lib/i18n';

export function ResultScreen({ 
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
  const [guess, setGuess] = useState('');

  if (!roundInfo) return <div className="loader"></div>;

  const currentVotes = roundInfo.votes || {};
  const outsiderId = roundInfo.outsider_player_id;
  const outsiderPlayer = players.find(p => p.id === outsiderId);

  // Compute vote counts
  const voteCounts: Record<string, number> = {};
  Object.values(currentVotes).forEach(targetId => {
    voteCounts[targetId] = (voteCounts[targetId] || 0) + 1;
  });

  const sortedTargets = Object.entries(voteCounts).sort((a,b) => b[1] - a[1]);
  const highestVotes = sortedTargets.length > 0 ? sortedTargets[0][1] : 0;
  
  const caughtPlayerIds = sortedTargets.filter(t => t[1] === highestVotes).map(t => t[0]);
  const isOutsiderCaught = caughtPlayerIds.includes(outsiderId) && caughtPlayerIds.length === 1;
  
  const isOutsider = currentPlayer.id === outsiderId;

  // Sync winner determination
  let computedResult = roundInfo.winner;
  if (!computedResult) {
    if (!isOutsiderCaught) {
      computedResult = 'outsider_survived';
    } else if (roundInfo.final_guess) {
      if (roundInfo.final_guess.trim().toLowerCase() === roundInfo.topic.toLowerCase()) {
        computedResult = 'outsider_guessed';
      } else {
        computedResult = 'group';
      }
    }
  }

  const submitGuess = async () => {
    if (!guess.trim()) return;
    try {
      await supabase
        .from('rounds')
        .update({ final_guess: guess.trim() })
        .eq('id', roundInfo.id);
    } catch (e) {
      console.error(e);
    }
  };

  const playAgain = async () => {
    if (!currentPlayer.is_host) return;
    try {
      // Award points safely
      const awardedRounds = room.settings?.awarded_rounds || [];
      const newScores = { ...(room.settings?.scores || {}) };
      
      if (!awardedRounds.includes(roundInfo.id)) {
        for (const p of players) {
          let earned = 0;
          if (computedResult === 'group' && p.id !== outsiderId) earned = 100;
          if ((computedResult === 'outsider_survived' || computedResult === 'outsider_guessed') && p.id === outsiderId) earned = 500;
          if (earned > 0) newScores[p.id] = (newScores[p.id] || 0) + earned;
        }
        awardedRounds.push(roundInfo.id);
      }

      await supabase
        .from('rooms')
        .update({ 
          status: 'lobby', 
          current_round_id: null,
          settings: {
            ...room.settings,
            scores: newScores,
            awarded_rounds: awardedRounds
          }
        })
        .eq('id', room.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="screen-container scroll-container animate-fade-in">
      <h2>{t.results.title}</h2>
      
      <div className="card" style={{ textAlign: 'center' }}>
         <p>{t.results.outsiderWas}</p>
         <h1 style={{ color: 'var(--secondary)' }}>{outsiderPlayer?.name}</h1>
         
         {(!isOutsiderCaught || roundInfo.final_guess) && (
           <div style={{ marginTop: '15px' }}>
             <p>{t.results.topicWas} <strong style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>{roundInfo.topic}</strong></p>
           </div>
         )}
      </div>

      {computedResult === 'outsider_survived' && (
        <div className="card" style={{ textAlign: 'center', background: 'var(--accent)' }}>
          <h2 style={{ color: '#2d3436' }}>{t.results.outsiderSurvived}</h2>
          <p style={{ color: '#2d3436' }}>{t.results.outsiderSurvivedNote}</p>
        </div>
      )}

      {isOutsiderCaught && !roundInfo.final_guess && (
        <div className="card">
          <h3 style={{ color: 'var(--secondary)', textAlign: 'center' }}>{t.results.outsiderCaught}</h3>
          {isOutsider ? (
            <div style={{ marginTop: '15px' }}>
              <p style={{ textAlign: 'center', marginBottom: '10px' }}>{t.results.lastChance}</p>
              <input 
                className="input-field" 
                placeholder={t.results.guessTopic}
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
              />
              <button className="btn" onClick={submitGuess} style={{ marginTop: '15px' }}>{t.results.confirmGuess}</button>
            </div>
          ) : (
            <p style={{ textAlign: 'center', marginTop: '10px', color: 'var(--text-muted)' }}>
              {t.results.waitingGuess} {outsiderPlayer?.name}{t.results.waitingGuessSuffix}
            </p>
          )}
        </div>
      )}

      {computedResult === 'outsider_guessed' && (
        <div className="card" style={{ textAlign: 'center', background: 'var(--accent)' }}>
          <h2 style={{ color: '#2d3436' }}>{t.results.outsiderGuessed}</h2>
          <p style={{ color: '#2d3436' }}>{t.results.outsiderGuessedNote} {outsiderPlayer?.name} {t.results.outsiderGuessedWinner}</p>
        </div>
      )}

      {computedResult === 'group' && (
        <div className="card" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--primary)' }}>{t.results.groupWins}</h2>
          <p>{t.results.groupWinsNote}</p>
        </div>
      )}

      <div className="card" style={{ width: '100%' }}>
         <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>{t.results.howVoted}</h3>
         {players.map((p) => {
           const count = voteCounts[p.id] || 0;
           if (count === 0 && p.id !== outsiderId) return null;
           
           return (
             <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--bg-color)' }}>
               <span>{p.name} {p.id === outsiderId ? '🕵️‍♂️' : ''}</span>
               <span style={{ fontWeight: 'bold' }}>{count} {t.results.votes}</span>
             </div>
           );
         })}
      </div>

      {currentPlayer.is_host && (
        <button className="btn" onClick={playAgain} style={{ marginTop: '20px' }}>{t.results.playAgain}</button>
      )}
      {!currentPlayer.is_host && (
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)' }}>{t.results.waitingForHost}</p>
      )}
    </div>
  );
}
