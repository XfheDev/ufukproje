import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MainMenu from './components/MainMenu';
import LabEscape from './components/LabEscape';
import HazardHunter from './components/HazardHunter';
import Leaderboard from './components/Leaderboard';
import Settings from './components/Settings';
import Auth from './components/Auth';
import { supabase } from './lib/supabase';
import { Settings as SettingsIcon } from 'lucide-react';

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
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(() => {
    const savedScore = getCookie('chemLabScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });
  const [globalScores, setGlobalScores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Oturum kontrolü
  useEffect(() => {
    const checkUser = async () => {
      if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
          setUser(session?.user ?? null);
          // Eğer şifre sıfırlama linkiyle gelindiyse ayarlar sayfasına yönlendir
          if (event === 'PASSWORD_RECOVERY') {
            setView('settings');
          }
        });
        
        // return () => authListener.subscription.unsubscribe();
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  useEffect(() => {
    setCookie('chemLabScore', score, 30);
  }, [score]);

  // Skorları yükle
  useEffect(() => {
    const fetchScores = async () => {
      if (supabase && user) {
        const { data } = await supabase
          .from('leaderboard')
          .select('*')
          .order('score', { ascending: false })
          .limit(10);
        if (data) setGlobalScores(data);
      } else if (!supabase) {
        const localScores = JSON.parse(localStorage.getItem('chemLabLocalLeaderboard') || '[]');
        setGlobalScores(localScores);
      }
    };
    fetchScores();
  }, [view, user]);

  const addScore = async (points) => {
    const newScore = score + points;
    setScore(newScore);
    
    if (user) {
      const playerName = user.user_metadata?.username || user.email.split('@')[0];
      const scoreEntry = { name: playerName, score: newScore };
      
      if (supabase) {
        await supabase.from('leaderboard').upsert([scoreEntry], { onConflict: 'name' });
      } else {
        const localScores = JSON.parse(localStorage.getItem('chemLabLocalLeaderboard') || '[]');
        const existing = localScores.findIndex(s => s.name === playerName);
        if (existing >= 0) {
          if (localScores[existing].score < newScore) localScores[existing].score = newScore;
        } else {
          localScores.push(scoreEntry);
        }
        localStorage.setItem('chemLabLocalLeaderboard', JSON.stringify(localScores.sort((a, b) => b.score - a.score)));
      }
    }
  };

  const handleLogout = async () => {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
  };

  // Eğer kullanıcı giriş yapmadıysa Auth ekranını göster
  if (!user && !loading) {
    return <Auth onLogin={setUser} />;
  }

  return (
    <div className="app-container">
      <div className="grid-bg"></div>
      
      <Navbar setView={setView} score={score} />
      
      <main>
        {view === 'menu' && <MainMenu setView={setView} />}
        {view === 'escape' && <LabEscape setView={setView} />}
        {view === 'hunter' && <HazardHunter setView={setView} addScore={addScore} />}
        {view === 'leaderboard' && <Leaderboard scores={globalScores} />}
        {view === 'settings' && <Settings user={user} setView={setView} />}

        {/* Ana menüde ek butonlar */}
        {view === 'menu' && (
          <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={() => setView('leaderboard')}>
               🏆 Liderlik Tablosu
            </button>
            <button className="btn btn-secondary" style={{ background: 'white' }} onClick={() => setView('settings')}>
               ⚙️ Ayarlar
            </button>
            {supabase && (
              <button className="btn btn-secondary" style={{ background: 'white' }} onClick={handleLogout}>
                🚪 Çıkış Yap ({user?.user_metadata?.username || user?.email?.split('@')[0]})
              </button>
            )}
          </div>
        )}
      </main>

      <footer style={{ 
        textAlign: 'center', 
        padding: '60px 20px', 
        color: 'var(--text-muted)',
        fontSize: '1rem',
        letterSpacing: '1px'
      }}>
        <p style={{ fontWeight: 800, color: 'var(--primary)' }}>
          &copy; 2026 • Projeyi Geliştiren: <span style={{ textDecoration: 'underline' }}>Ufuk UZUN 9/B</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
