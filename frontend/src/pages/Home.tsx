import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../assets/images/bg.jpg';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-white justify-center min-h-screen bg-cover font-orbitron" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="flex space-x-4">
        <Link to="/starships" className="btn-sm w-32 text-center">Starships</Link>
        <Link to="/pilots" className="btn-sm w-32 text-center">Pilots</Link>
      </div>
    </div>
  );
};

export default Home;