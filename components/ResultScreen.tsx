'use client';

import { useState } from 'react';
import { Room, Player, Round, supabase } from '../lib/supabaseClient';

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
      <h2>النتائج 🏆</h2>
      
      <div className="card" style={{ textAlign: 'center' }}>
         <p>الشخص اللي كان برا السالفة هو:</p>
         <h1 style={{ color: 'var(--secondary)' }}>{outsiderPlayer?.name}</h1>
         
         {(!isOutsiderCaught || roundInfo.final_guess) && (
           <div style={{ marginTop: '15px' }}>
             <p>الموضوع كان: <strong style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>{roundInfo.topic}</strong></p>
           </div>
         )}
      </div>

      {computedResult === 'outsider_survived' && (
        <div className="card" style={{ textAlign: 'center', background: 'var(--accent)' }}>
          <h2 style={{ color: '#2d3436' }}>نجا برا السالفة! 🎉</h2>
          <p style={{ color: '#2d3436' }}>لم يكتشفه الجميع، أو تعادلت الأصوات.</p>
        </div>
      )}

      {isOutsiderCaught && !roundInfo.final_guess && (
        <div className="card">
          <h3 style={{ color: 'var(--secondary)', textAlign: 'center' }}>تم كشف البار السالفة! 🚨</h3>
          {isOutsider ? (
            <div style={{ marginTop: '15px' }}>
              <p style={{ textAlign: 'center', marginBottom: '10px' }}>لديك فرصة أخيرة. ما هو الموضوع؟</p>
              <input 
                className="input-field" 
                placeholder="اكتب الموضوع هنا..." 
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
              />
              <button className="btn" onClick={submitGuess} style={{ marginTop: '15px' }}>تأكيد التخمين</button>
            </div>
          ) : (
            <p style={{ textAlign: 'center', marginTop: '10px', color: 'var(--text-muted)' }}>ننتظر تخمين {outsiderPlayer?.name} الأخير المُنقذ...</p>
          )}
        </div>
      )}

      {computedResult === 'outsider_guessed' && (
        <div className="card" style={{ textAlign: 'center', background: 'var(--accent)' }}>
          <h2 style={{ color: '#2d3436' }}>بطل! 👏</h2>
          <p style={{ color: '#2d3436' }}>عرف الموضوع بالرغم من كشفه. {outsiderPlayer?.name} يفوز!</p>
        </div>
      )}

      {computedResult === 'group' && (
        <div className="card" style={{ textAlign: 'center' }}>
          <h2 style={{ color: 'var(--primary)' }}>فازوا الباقين! 🥳</h2>
          <p>تم كشفه ولم يعرف الموضوع.</p>
        </div>
      )}

      <div className="card" style={{ width: '100%' }}>
         <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>كيف صوت الناس؟</h3>
         {players.map((p) => {
           const count = voteCounts[p.id] || 0;
           if (count === 0 && p.id !== outsiderId) return null;
           
           return (
             <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--bg-color)' }}>
               <span>{p.name} {p.id === outsiderId ? '🕵️‍♂️' : ''}</span>
               <span style={{ fontWeight: 'bold' }}>{count} صوت</span>
             </div>
           );
         })}
      </div>

      {currentPlayer.is_host && (
        <button className="btn" onClick={playAgain} style={{ marginTop: '20px' }}>العب جولة جديدة مع نفس المجموعة</button>
      )}
      {!currentPlayer.is_host && (
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)' }}>ننتظر المضيف لبدء جولة جديدة...</p>
      )}
    </div>
  );
}
