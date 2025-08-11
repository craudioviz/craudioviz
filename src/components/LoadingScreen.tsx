import React from 'react';

const LoadingScreen: React.FC = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            color: '#888'
        }}>
            Loading...
        </div>
    );
};

export default LoadingScreen;