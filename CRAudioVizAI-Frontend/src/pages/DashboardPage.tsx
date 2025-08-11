// src/pages/DashboardPage.tsx
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useEffect } from "react";

function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome, {user?.email}</h1>
      <p style={styles.subtext}>This is your dashboard. More tools coming soon.</p>
      <button style={styles.button} onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import MainLayout from '../layouts/MainLayout';
import PageTransition from '../components/PageTransition';

export default function DashboardPage() {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      const { data, error } = await supabase.from('tools').select('*');
      if (error) console.error(error);
      else setTools(data);
      setLoading(false);
    };

    fetchTools();
  }, []);

  return (
    <MainLayout>
      <PageTransition>
        <h2>Your Tools</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {tools.map((tool: any) => (
              <li key={tool.id}>{tool.name}</li>
            ))}
          </ul>
        )}
      </PageTransition>
    </MainLayout>
  );
}
