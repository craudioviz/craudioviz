import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import MainContent from './MainContent';

export default function DashboardPage() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Redirecting...</div>; // fallback until redirect

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <MainContent />
      </div>
    </div>
  );
}
