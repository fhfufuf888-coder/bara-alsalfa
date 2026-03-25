'use client';

import { useState } from 'react';
import { CreateRoomForm } from '../components/CreateRoomForm';
import { JoinRoomForm } from '../components/JoinRoomForm';
import { useLocale } from '../lib/i18n';

type MenuState = 'main' | 'host' | 'join' | 'about';

export default function HomePage() {
  const [menu, setMenu] = useState<MenuState>('main');
  const { t } = useLocale();

  return (
    <div className="screen-container animate-fade-in" style={{ padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px', marginTop: '20px' }}>
        <h1 style={{ color: 'var(--primary)', fontSize: '3.5rem', margin: '0', textShadow: '0 4px 10px rgba(108, 92, 231, 0.2)' }}>{t.home.title}</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '5px' }}>{t.home.subtitle}</p>
      </div>

      <div style={{ width: '100%', maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {menu === 'main' && (
          <div className="animate-fade-in card" style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: 'transparent', boxShadow: 'none', border: 'none', padding: '0' }}>
            <button className="btn" onClick={() => setMenu('join')} style={{ padding: '22px', fontSize: '1.5rem', boxShadow: '0 10px 20px rgba(108, 92, 231, 0.3)' }}>
              {t.home.joinGame}
            </button>
            <button className="btn btn-secondary" onClick={() => setMenu('host')} style={{ padding: '20px', fontSize: '1.4rem' }}>
              {t.home.createRoom}
            </button>
            <button className="btn btn-menu" onClick={() => setMenu('about')} style={{ padding: '16px', fontSize: '1.2rem', marginTop: '10px' }}>
              {t.home.howToPlay}
            </button>
          </div>
        )}

        {menu === 'host' && (
          <div className="animate-fade-in">
            <button className="btn-secondary" onClick={() => setMenu('main')} style={{ marginBottom: '20px', padding: '10px 15px', borderRadius: '10px', width: 'auto', border: 'none', background: 'var(--bg-card)' }}>
              {t.home.back}
            </button>
            <CreateRoomForm />
          </div>
        )}

        {menu === 'join' && (
          <div className="animate-fade-in">
            <button className="btn-secondary" onClick={() => setMenu('main')} style={{ marginBottom: '20px', padding: '10px 15px', borderRadius: '10px', width: 'auto', border: 'none', background: 'var(--bg-card)' }}>
              {t.home.back}
            </button>
            <JoinRoomForm />
          </div>
        )}

        {menu === 'about' && (
          <div className="animate-fade-in card">
            <button className="btn-secondary" onClick={() => setMenu('main')} style={{ marginBottom: '20px', padding: '10px 15px', borderRadius: '10px', width: 'auto', border: 'none', background: 'var(--bg-color)' }}>
              {t.home.back}
            </button>
            <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>{t.home.aboutTitle}</h2>
            <ul style={{ paddingInlineStart: '20px', display: 'flex', flexDirection: 'column', gap: '15px', color: 'var(--text-main)', fontSize: '1.1rem' }}>
              <li><strong>{t.home.aboutIntroLabel}</strong> {t.home.aboutIntroText}</li>
              <li><strong>{t.home.aboutHintsLabel}</strong> {t.home.aboutHintsText}</li>
              <li><strong>{t.home.aboutVoteLabel}</strong> {t.home.aboutVoteText}</li>
              <li><strong>{t.home.aboutCatchLabel}</strong> {t.home.aboutCatchText}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
