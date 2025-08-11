import { useAuth } from '../context/AuthContext';

export default function Header() {
    const { user } = useAuth();

    return (
        <header className="header">
            <h1>Welcome, {user?.email || 'Creator'}</h1>
        </header>
    );
}