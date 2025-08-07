import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      setSubmitting(false);
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match.');
      setSubmitting(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }

    setSubmitting(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Reset Your Password</h2>
      {success ? (
        <p style={{ color: 'green' }}>✅ Password updated! Redirecting to login...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              style={{ width: '100%', padding: '0.5rem' }}
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" disabled={submitting} style={{ padding: '0.5rem 1rem' }}>
            {submitting ? 'Updating...' : 'Reset Password'}
          </button>
        </form>
      )}
    </div>
  );
}
