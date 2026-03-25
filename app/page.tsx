import Link from 'next/link';
import { CreateRoomForm } from '../components/CreateRoomForm';
import { JoinRoomForm } from '../components/JoinRoomForm';

export default function HomePage() {
  return (
    <div className="screen-container animate-fade-in">
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'var(--primary)', marginBottom: '8px', fontSize: '2.5rem' }}>برا السالفة</h1>
        <p style={{ color: 'var(--text-muted)' }}>العب مع أصدقائك عبر الإنترنت</p>
      </div>

      <div style={{ marginTop: '30px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <CreateRoomForm />
        <JoinRoomForm />
      </div>
    </div>
  );
}
