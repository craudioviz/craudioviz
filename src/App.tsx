import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';

import DashboardPage from './pages/dashboard';
import LoginPage from './pages/login';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

import DebugOverlay from './components/DebugOverlay';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';

function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to SiteForge</h1>
      <p>
        This is the home page. Go to{' '}
        <a href="/dashboard">Dashboard</a>,{' '}
        <a href="/login">Login</a>,{' '}
        <a href="/signup">Sign Up</a>,{' '}
        <a href="/forgot-password">Reset Password</a>, or{' '}
        <a href="/reset-password">Complete Reset</a>.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignupPage />
                </PublicRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <ForgotPasswordPage />
                </PublicRoute>
              }
            />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <DebugOverlay />
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
