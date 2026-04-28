import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { User, Lock, Save, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

const Settings = ({ user, setView }) => {
  const [username, setUsername] = useState(user?.user_metadata?.username || '');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Kullanıcı adını güncelle
      const { error: profileError } = await supabase.auth.updateUser({
        data: { username: username }
      });
      if (profileError) throw profileError;

      // Eğer şifre girilmişse şifreyi güncelle
      if (newPassword) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: newPassword
        });
        if (passwordError) throw passwordError;
      }

      setSuccess("Bilgileriniz başarıyla güncellendi!");
      setNewPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <button className="btn btn-secondary" onClick={() => setView('menu')} style={{ marginBottom: '24px' }}>
        <ArrowLeft size={18} /> Geri Dön
      </button>

      <div className="glass-card" style={{ padding: '40px', background: 'white' }}>
        <h2 className="hero-text" style={{ fontSize: '2rem', marginBottom: '32px' }}>Hesap Ayarları</h2>

        <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, color: 'var(--primary)' }}>Kullanıcı Adı</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
              <input 
                type="text" 
                className="btn" 
                style={{ width: '100%', paddingLeft: '45px', textAlign: 'left', background: 'var(--bg-main)', cursor: 'text' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 700, color: 'var(--primary)' }}>Yeni Şifre (Değiştirmek istemiyorsanız boş bırakın)</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="btn" 
                style={{ width: '100%', paddingLeft: '45px', textAlign: 'left', background: 'var(--bg-main)', cursor: 'text' }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div style={{ color: 'var(--danger)', background: 'rgba(254, 198, 194, 0.2)', padding: '12px', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'center', border: '1px solid var(--danger)' }}>
              <AlertCircle size={18} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{error}</span>
            </div>
          )}

          {success && (
            <div style={{ color: 'var(--success)', background: 'rgba(203, 227, 189, 0.2)', padding: '12px', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'center', border: '1px solid var(--success)' }}>
              <CheckCircle2 size={18} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{success}</span>
            </div>
          )}

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', height: '55px' }}>
            <Save size={20} /> {loading ? 'Kaydediliyor...' : 'Bilgileri Güncelle'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
