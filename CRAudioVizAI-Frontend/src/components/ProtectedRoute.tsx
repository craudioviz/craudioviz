import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading protected content...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
