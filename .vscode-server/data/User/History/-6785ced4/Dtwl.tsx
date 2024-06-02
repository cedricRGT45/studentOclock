// src/components/Home.tsx
import React from 'react';

interface HomeProps {
    onStart: () => void;
}

const Home: React.FC<HomeProps> = ({ onStart }) => {
    return (
        <div className="home">
            <h1>Bienvenue sur notre boutique en ligne</h1>
            <button onClick={onStart}>Commencer</button>
        </div>
    );
}

export default Home;