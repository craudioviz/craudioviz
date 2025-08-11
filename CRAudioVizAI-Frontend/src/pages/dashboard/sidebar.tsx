import React from 'react';

export default function Sidebar() {
    return (
        <div style={{ width: '240px', background: '#111', color: '#fff', padding: '1rem', height: '100vh' }}>
            <h2 style={{ marginBottom: '2rem' }}>SiteForge</h2>
            <nav>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ marginBottom: '1rem' }}>
                        <a href="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Dashboard</a>
                    </li>
                    <li>
                        <a href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}