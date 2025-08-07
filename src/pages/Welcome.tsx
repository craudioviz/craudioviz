import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import LogoutButton from '../components/LogoutButton';

export default function WelcomePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user);
    };

    fetchUser();
  }, []);

  if (user === null) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>🔒 Access Denied</h2>
        <p>You must be logged in to view this page.</p>
        <a href="/login">Log in</a>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🎉 Welcome, {user.email}!</h2>
      <p>Your account is active. Explore and create freely.</p>
      <LogoutButton />
    </div>
  );
}
