import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password',
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Password reset email sent!');
      setTimeout(() => navigate('/login'), 3000);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Reset Your Password</h1>
      <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ marginBottom: '1rem', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.75rem', background: '#111', color: '#fff', border: 'none' }}>
          Send Reset Link
        </button>
        {message && <p style={{ color: 'green', marginTop: '1rem' }}>{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>
      <p style={{ marginTop: '1rem' }}>
        Back to <a href="/login">Login</a>
      </p>
    </div>
  );
}
