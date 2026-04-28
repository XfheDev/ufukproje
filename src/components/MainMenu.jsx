import React from 'react';
import { ShieldAlert, DoorOpen, Beaker, Zap } from 'lucide-react';

const MainMenu = ({ setView }) => {
  return (
    <div className="animate-fade-in" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 className="hero-text animate-slide-up" style={{ fontSize: '3.5rem', marginBottom: '16px' }}>
          Laboratuvar Uzmanı Ol
        </h2>
        <p className="animate-slide-up" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Sanal bir kimya dünyasına adım atın. Zorluk seviyenizi seçin ve laboratuvar becerilerinizi geliştirin.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
        {/* Lab Escape Card */}
        <div 
          className="glass-card animate-slide-up" 
          style={{ padding: '40px', cursor: 'pointer', background: 'var(--success)' }}
          onClick={() => setView('escape')}
        >
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', border: '2px solid var(--primary)', width: 'fit-content', marginBottom: '24px' }}>
            <DoorOpen size={48} color="var(--primary)" />
          </div>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '12px', color: 'var(--primary)' }}>Laboratuvardan Kaçış</h3>
          <p style={{ color: 'var(--primary)', marginBottom: '24px', lineHeight: '1.6', fontWeight: 500 }}>
            Doğru ekipmanı seçerek pratik laboratuvar problemlerini çözün. Laboratuvardan güvenle kaçabilir misiniz?
          </p>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Kaçışa Başla <Zap size={18} />
          </button>
        </div>

        {/* Hazard Hunter Card */}
        <div 
          className="glass-card animate-slide-up" 
          style={{ padding: '40px', cursor: 'pointer', animationDelay: '0.1s', background: 'var(--danger)' }}
          onClick={() => setView('hunter')}
        >
          <div style={{ background: 'white', padding: '20px', borderRadius: '15px', border: '2px solid var(--primary)', width: 'fit-content', marginBottom: '24px' }}>
            <ShieldAlert size={48} color="var(--primary)" />
          </div>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '12px', color: 'var(--primary)' }}>Tehlike Avcısı</h3>
          <p style={{ color: 'var(--primary)', marginBottom: '24px', lineHeight: '1.6', fontWeight: 500 }}>
            Gerçekçi senaryoları analiz ederek kimyasal tehlikeleri tanımlayın ve güvenlik bilginizi kanıtlayın.
          </p>
          <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', background: 'white' }}>
            Ava Başla <ShieldAlert size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
