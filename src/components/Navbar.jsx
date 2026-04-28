import React from 'react';
import { FlaskConical, Home, Trophy } from 'lucide-react';

const Navbar = ({ setView, score }) => {
  return (
    <nav className="glass-card" style={{ 
      margin: '20px', 
      padding: '12px 24px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: '20px',
      zIndex: 100,
      background: 'white',
      backdropFilter: 'none',
      border: '3px solid var(--primary)'
    }}>
      <div 
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        onClick={() => setView('menu')}
      >
        <FlaskConical size={32} color="var(--primary)" />
        <h1 style={{ fontSize: '1.5rem', margin: 0 }} className="hero-text">ChemLab Pro</h1>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <button className="btn btn-secondary" onClick={() => setView('menu')}>
          <Home size={18} /> Menü
        </button>
        <div className="glass-card" style={{ padding: '8px 16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy size={18} color="var(--secondary)" />
          <span style={{ fontWeight: 600 }}>Puan: {score}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
