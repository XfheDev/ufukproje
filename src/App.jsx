import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MainMenu from './components/MainMenu';
import LabEscape from './components/LabEscape';
import HazardHunter from './components/HazardHunter';

// Çerez (Cookie) yardımcı fonksiyonları
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
};

function App() {
  const [view, setView] = useState('menu');
  const [score, setScore] = useState(() => {
    const savedScore = getCookie('chemLabScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });

  useEffect(() => {
    setCookie('chemLabScore', score, 30); // 30 gün sakla
  }, [score]);

  const addScore = (points) => {
    setScore(prev => prev + points);
  };

  return (
    <div className="app-container">
      <div className="grid-bg"></div>
      
      <Navbar setView={setView} score={score} />
      
      <main>
        {view === 'menu' && <MainMenu setView={setView} />}
        {view === 'escape' && <LabEscape setView={setView} />}
        {view === 'hunter' && <HazardHunter setView={setView} addScore={addScore} />}
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: '40px 20px', 
        color: 'var(--text-muted)',
        fontSize: '0.9rem'
      }}>
        <p>&copy; 2026 Ufuk UZUN 9/B • Eğitici Kimya Simülasyonu</p>
      </footer>
    </div>
  );
}

export default App;
