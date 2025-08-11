import { supabase } from '../lib/supabaseClient';

export default function LogoutButton() {
    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert(`❌ ${error.message}`);
        } else {
            alert('✅ Logged out successfully!');
            window.location.href = '/';
        }
    };

    return (
        <button onClick={handleLogout} style={{ marginTop: '1rem' }}>
            Log Out
        </button>
    );
}