import React, { useState } from 'react';

export default function AuthPage({ onLogin, onClose }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    if (mode === 'login') {
      if (!username.trim() || !password.trim()) {
        setMessage('Please enter both username and password.');
        return;
      }
      // Simple validation - in production, this would call an API
      onLogin({
        id: 'u1',
        name: username.trim(),
        initials: username
          .split(' ')
          .map((word) => word[0] || '')
          .join('')
          .substring(0, 2)
          .toUpperCase() || 'U',
        role: 'Full Stack Developer',
        xp: 0,
        streak: 0,
        isPro: false,
        bio: 'Welcome to SkillUp!',
      });
    } else {
      // Sign up validation
      if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        setMessage('Please fill in all fields.');
        return;
      }
      if (!email.includes('@')) {
        setMessage('Please enter a valid email address.');
        return;
      }
      if (password.length < 6) {
        setMessage('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setMessage('Passwords do not match.');
        return;
      }
      const initials = username
        .split(' ')
        .map((word) => word[0] || '')
        .join('')
        .substring(0, 2)
        .toUpperCase();
      onLogin({
        id: 'u1',
        name: username.trim(),
        initials: initials || 'U',
        role: 'Full Stack Developer',
        xp: 0,
        streak: 0,
        isPro: false,
        bio: 'Welcome to SkillUp! Start your journey today.',
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: 20, background: 'var(--bg)' }}>
      <div style={{ width: '100%', maxWidth: 420, padding: 32, borderRadius: 24, background: 'var(--bg2)', border: '1px solid var(--border)', boxShadow: '0 24px 80px rgba(0,0,0,0.08)' }}>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            style={{ marginBottom: 18, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', padding: '10px 14px', borderRadius: 12, cursor: 'pointer' }}
          >
            Back to site
          </button>
        )}
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: 26, marginBottom: 8, color: 'var(--text1)' }}>
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </h1>
        <p style={{ color: 'var(--text2)', marginBottom: 24 }}>
          {mode === 'login'
            ? 'Log in to continue to SkillUp.'
            : 'Join SkillUp and start earning today.'}
        </p>

        <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
          {['login', 'signup'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setMode(item);
                setMessage('');
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
              }}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 12,
                border: item === mode ? '1px solid var(--purple)' : '1px solid var(--border)',
                background: item === mode ? 'var(--purple)' : 'var(--bg3)',
                color: item === mode ? 'white' : 'var(--text1)',
                cursor: 'pointer',
                fontFamily: "'DM Sans',sans-serif",
                fontWeight: 600,
              }}
            >
              {item === 'login' ? 'Login' : 'Sign Up'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text2)' }}>
            {mode === 'login' ? 'Username' : 'Full Name'}
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder={mode === 'login' ? 'Enter your username' : 'Enter your full name'}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text1)', marginBottom: 16, fontSize: 14, outline: 'none' }}
          />

          {mode === 'signup' && (
            <>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text2)' }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text1)', marginBottom: 16, fontSize: 14, outline: 'none' }}
              />
            </>
          )}

          <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text2)' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text1)', marginBottom: 16, fontSize: 14, outline: 'none' }}
          />

          {mode === 'signup' && (
            <>
              <label style={{ display: 'block', marginBottom: 8, fontSize: 13, color: 'var(--text2)' }}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--bg3)', color: 'var(--text1)', marginBottom: 16, fontSize: 14, outline: 'none' }}
              />
            </>
          )}

          {message && (
            <div style={{ marginBottom: 16, color: message.includes('not') || message.includes('must') || message.includes('do not') ? 'var(--red)' : 'var(--red)', fontSize: 13 }}>
              {message}
            </div>
          )}

          <button type="submit" style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: 'var(--purple)', color: 'white', fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans',sans-serif", fontSize: 14 }}>
            {mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
}
