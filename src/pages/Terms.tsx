import React from 'react';

const Terms: React.FC = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#222' }}>Terms of Service</h1>
            <p style={{ color: '#555', marginBottom: '1rem' }}>
                By using CR AudioViz AI, you agree to the following terms and conditions. Please read them carefully.
            </p>

            <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '0.5rem' }}>Use of Services</h2>
            <ul style={{ color: '#777', marginBottom: '1rem' }}>
                <li>Our tools are provided “as is” without warranties.</li>
                <li>You agree not to misuse or attempt to reverse-engineer any part of the platform.</li>
                <li>Generated content may be subject to third-party rights or licensing restrictions.</li>
            </ul>

            <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '0.5rem' }}>Accounts & Access</h2>
            <ul style={{ color: '#777', marginBottom: '1rem' }}>
                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                <li>We reserve the right to suspend accounts for misuse or violation of these terms.</li>
            </ul>

            <h2 style={{ fontSize: '1.25rem', marginTop: '2rem', marginBottom: '0.5rem' }}>Limitation of Liability</h2>
            <p style={{ color: '#555' }}>
                CR AudioViz AI is not liable for any damages resulting from the use or inability to use our services.
            </p>

            <p style={{ color: '#999', marginTop: '3rem' }}>
                Last updated: August 6, 2025
            </p>
        </div>
    );
};

export default Terms;