import React from 'react';
import { Trophy, Medal, User } from 'lucide-react';

const Leaderboard = ({ scores }) => {
  // Mock data for demonstration if no real scores
  const defaultScores = [
    { name: "Ufuk Uzun", score: 250 },
    { name: "Ahmet Y.", score: 210 },
    { name: "Selin K.", score: 195 },
    { name: "Caner T.", score: 180 },
    { name: "Zeynep B.", score: 155 }
  ];

  const displayScores = scores && scores.length > 0 ? scores : defaultScores;

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '40px', maxWidth: '600px', margin: '40px auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'inline-flex', background: 'var(--accent-yellow)', padding: '15px', borderRadius: '50%', border: '2px solid var(--primary)', marginBottom: '15px' }}>
          <Trophy size={40} color="var(--primary)" />
        </div>
        <h2 className="hero-text" style={{ fontSize: '2rem' }}>Liderlik Tablosu</h2>
        <p style={{ color: 'var(--primary)', fontWeight: 500 }}>En iyi laboratuvar uzmanları burada yarışıyor!</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {displayScores.sort((a, b) => b.score - a.score).map((entry, index) => (
          <div 
            key={index} 
            className="btn" 
            style={{ 
              background: index === 0 ? 'var(--accent-yellow)' : 'white',
              justifyContent: 'space-between',
              padding: '16px 24px',
              cursor: 'default',
              transform: 'none',
              boxShadow: index === 0 ? '6px 6px 0px 0px var(--primary)' : '4px 4px 0px 0px var(--primary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)', width: '25px' }}>
                {index + 1}.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {index < 3 ? <Medal size={20} color="var(--primary)" /> : <User size={20} color="var(--primary)" />}
                <span style={{ fontWeight: 700 }}>{entry.name}</span>
              </div>
            </div>
            <div style={{ fontWeight: 800, color: 'var(--primary)', fontSize: '1.2rem' }}>
              {entry.score}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
