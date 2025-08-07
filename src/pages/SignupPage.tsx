import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Create Your Account</h1>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={{ marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={{ marginBottom: '1rem', padding: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.75rem', background: '#111', color: '#fff', border: 'none' }}>
          Sign Up
        </button>
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
      </form>
      <p style={{ marginTop: '1rem' }}>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
}
