import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, UserPlus, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Giriş yap
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onLogin(data.user);
      } else {
        // Kayıt ol
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username
            }
          }
        });
        if (error) throw error;
        alert("Kayıt başarılı! Lütfen e-postanızı onaylayın veya doğrudan giriş yapın (Supabase ayarlarına bağlıdır).");
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '450px', margin: '80px auto', padding: '0 20px' }}>
      <div className="glass-card" style={{ padding: '40px', background: 'white' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'inline-flex', background: 'var(--primary)', padding: '15px', borderRadius: '50%', marginBottom: '20px' }}>
            {isLogin ? <LogIn size={32} color="white" /> : <UserPlus size={32} color="white" />}
          </div>
          <h2 className="hero-text" style={{ fontSize: '2rem' }}>
            {isLogin ? 'Hoş Geldin!' : 'Hesap Oluştur'}
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            {isLogin ? 'Laboratuvara giriş yapmak için bilgilerini gir.' : 'Yarışmaya katılmak için hemen kayıt ol.'}
          </p>
        </div>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
              <input 
                type="text" 
                placeholder="Kullanıcı Adı" 
                className="btn" 
                required
                style={{ width: '100%', paddingLeft: '45px', textAlign: 'left', background: 'white', cursor: 'text' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
            <input 
              type="email" 
              placeholder="E-posta" 
              className="btn" 
              required
              style={{ width: '100%', paddingLeft: '45px', textAlign: 'left', background: 'white', cursor: 'text' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
            <input 
              type="password" 
              placeholder="Şifre" 
              className="btn" 
              required
              style={{ width: '100%', paddingLeft: '45px', textAlign: 'left', background: 'white', cursor: 'text' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div style={{ color: 'var(--danger)', background: 'rgba(254, 198, 194, 0.2)', padding: '12px', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'center', border: '1px solid var(--danger)' }}>
              <AlertCircle size={18} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{error}</span>
            </div>
          )}

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', height: '55px', fontSize: '1.1rem' }}>
            {loading ? 'Yükleniyor...' : (isLogin ? 'Giriş Yap' : 'Kayıt Ol')} <ArrowRight size={20} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button 
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Hesabın yok mu? Kayıt Ol' : 'Zaten hesabın var mı? Giriş Yap'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper component for the icons
const User = ({ size, style }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={style}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default Auth;
