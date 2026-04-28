import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, UserPlus, Mail, Lock, AlertCircle, ArrowRight, KeyRound } from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [mode, setMode] = useState('login'); // 'login', 'signup', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      if (mode === 'login') {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onLogin(data.user);
      } else if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { username } }
        });
        if (error) throw error;
        setMessage("Kayıt başarılı! Lütfen e-postanızı onaylayın veya giriş yapmayı deneyin.");
        setMode('login');
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin,
        });
        if (error) throw error;
        setMessage("Şifre sıfırlama bağlantısı e-postanıza gönderildi!");
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
            {mode === 'login' ? <LogIn size={32} color="white" /> : 
             mode === 'signup' ? <UserPlus size={32} color="white" /> : <KeyRound size={32} color="white" />}
          </div>
          <h2 className="hero-text" style={{ fontSize: '2rem' }}>
            {mode === 'login' ? 'Hoş Geldin!' : mode === 'signup' ? 'Hesap Oluştur' : 'Şifremi Unuttum'}
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>
            {mode === 'login' ? 'Laboratuvara giriş yapmak için bilgilerini gir.' : 
             mode === 'signup' ? 'Yarışmaya katılmak için hemen kayıt ol.' : 'E-posta adresini girerek şifreni sıfırla.'}
          </p>
        </div>

        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {mode === 'signup' && (
            <div style={{ position: 'relative' }}>
              <UserIcon size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
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

          {mode !== 'forgot' && (
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
          )}

          {error && (
            <div style={{ color: 'var(--danger)', background: 'rgba(254, 198, 194, 0.2)', padding: '12px', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'center', border: '1px solid var(--danger)' }}>
              <AlertCircle size={18} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{error}</span>
            </div>
          )}

          {message && (
            <div style={{ color: 'var(--success)', background: 'rgba(203, 227, 189, 0.2)', padding: '12px', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'center', border: '1px solid var(--success)' }}>
              <KeyRound size={18} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{message}</span>
            </div>
          )}

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', height: '55px', fontSize: '1.1rem' }}>
            {loading ? 'Yükleniyor...' : (mode === 'login' ? 'Giriş Yap' : mode === 'signup' ? 'Kayıt Ol' : 'Bağlantı Gönder')} <ArrowRight size={20} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {mode === 'login' && (
            <button 
              style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}
              onClick={() => setMode('forgot')}
            >
              Şifremi Unuttum
            </button>
          )}
          
          <button 
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          >
            {mode === 'login' ? 'Hesabın yok mu? Kayıt Ol' : 'Zaten hesabın var mı? Giriş Yap'}
          </button>
        </div>
      </div>
    </div>
  );
};

const UserIcon = ({ size, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

export default Auth;
