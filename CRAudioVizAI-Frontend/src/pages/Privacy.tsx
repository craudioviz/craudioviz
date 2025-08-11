import React from 'react';

const Privacy: React.FC = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#222' }}>Privacy Policy</h1>
            <p style={{ color: '#555', marginBottom: '1rem' }}>
                At CR AudioViz AI, we value your privacy. This policy outlines how we collect, use, and protect your information.
            </p>

            <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '0.5rem' }}>Information We Collect</h2>
            <ul style={{ color: '#777', marginBottom: '1rem' }}>
                <li>User account details (email, name)</li>
                <li>Tool usage data and preferences</li>
                <li>Feedback and support requests</li>
            </ul>

            <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '0.5rem' }}>How We Use Your Data</h2>
            <ul style={{ color: '#777', marginBottom: '1rem' }}>
                <li>To improve tool performance and user experience</li>
                <li>To provide personalized features and recommendations</li>
                <li>To communicate updates and respond to inquiries</li>
            </ul>

            <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '0.5rem' }}>Your Rights</h2>
            <p style={{ color: '#555' }}>
                You can request access to your data, ask for corrections, or request deletion at any time. Contact us at support@CRAudioVizAIAIAI.ai.
            </p>

            <p style={{ color: '#999', marginTop: '3rem' }}>
                Last updated: August 6, 2025
            </p>
        </div>
    );
};

export default Privacy;