'use client';

import { useState } from 'react';
import { CreateRoomForm } from '../components/CreateRoomForm';
import { JoinRoomForm } from '../components/JoinRoomForm';

type MenuState = 'main' | 'host' | 'join' | 'about';

export default function HomePage() {
  const [menu, setMenu] = useState<MenuState>('main');

  return (
    <div className="screen-container animate-fade-in" style={{ padding: '0 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px', marginTop: '20px' }}>
        <h1 style={{ color: 'var(--primary)', fontSize: '3.5rem', margin: '0', textShadow: '0 4px 10px rgba(108, 92, 231, 0.2)' }}>برا السالفة</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginTop: '5px' }}>أفضل لعبة للجمعات والأصحاب</p>
      </div>

      <div style={{ width: '100%', maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {menu === 'main' && (
          <div className="animate-fade-in card" style={{ display: 'flex', flexDirection: 'column', gap: '15px', background: 'transparent', boxShadow: 'none', border: 'none', padding: '0' }}>
            <button className="btn" onClick={() => setMenu('join')} style={{ padding: '22px', fontSize: '1.5rem', boxShadow: '0 10px 20px rgba(108, 92, 231, 0.3)' }}>
              🎯 الدخول للعبة
            </button>
            <button className="btn btn-secondary" onClick={() => setMenu('host')} style={{ padding: '20px', fontSize: '1.4rem' }}>
              👑 إنشاء غرفة 
            </button>
            <button className="btn btn-secondary" onClick={() => setMenu('about')} style={{ padding: '16px', fontSize: '1.2rem', borderColor: 'transparent', background: 'var(--bg-card)', color: 'var(--text-main)', marginTop: '10px' }}>
              📖 كيف ألعب؟
            </button>
          </div>
        )}

        {menu === 'host' && (
          <div className="animate-fade-in">
            <button className="btn-secondary" onClick={() => setMenu('main')} style={{ marginBottom: '20px', padding: '10px 15px', borderRadius: '10px', width: 'auto', border: 'none', background: 'var(--bg-card)' }}>
              &larr; العودة للقائمة
            </button>
            <CreateRoomForm />
          </div>
        )}

        {menu === 'join' && (
          <div className="animate-fade-in">
            <button className="btn-secondary" onClick={() => setMenu('main')} style={{ marginBottom: '20px', padding: '10px 15px', borderRadius: '10px', width: 'auto', border: 'none', background: 'var(--bg-card)' }}>
              &larr; العودة للقائمة
            </button>
            <JoinRoomForm />
          </div>
        )}

        {menu === 'about' && (
          <div className="animate-fade-in card">
            <button className="btn-secondary" onClick={() => setMenu('main')} style={{ marginBottom: '20px', padding: '10px 15px', borderRadius: '10px', width: 'auto', border: 'none', background: 'var(--bg-color)' }}>
              &larr; العودة للقائمة
            </button>
            <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>كيف تلعب برا السالفة؟</h2>
            <ul style={{ textAlign: 'right', direction: 'rtl', paddingRight: '20px', display: 'flex', flexDirection: 'column', gap: '15px', color: 'var(--text-main)', fontSize: '1.1rem' }}>
              <li><strong>مقدمة:</strong> اللعبة تعتمد على الخداع والتخمين. الجميع سيعرفون "الموضوع" السري ما عدا شخص واحد يسمى <strong>"برا السالفة"</strong>.</li>
              <li><strong>التلميحات:</strong> يظهر دور كل لاعب لإعطاء "تلميحة" عن الموضوع بدون أن يفضحه للبار السالفة وبدون أن يكون واضحاً جداً.</li>
              <li><strong>التصويت:</strong> بعد جولة أو أكثر من التلميحات، يصوت اللاعبون على من يعتقدون أنه "برا السالفة".</li>
              <li><strong>صائد السالفة:</strong> إذا تم القبض على "برا السالفة"، سيكون لديه فرصة أخيرة لمحاولة تخمين الموضوع السري لسرقة الفوز!</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
