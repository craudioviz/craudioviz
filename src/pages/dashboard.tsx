import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    console.log('⏳ DashboardPage: waiting for user...');
    return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;
  }

  console.log('✅ DashboardPage: user loaded', user);
  return <DashboardLayout />;
}
