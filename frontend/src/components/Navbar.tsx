import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const getLinkClass = (path: string) =>
    location.pathname === path ? 'text-[#F56F36]' : 'text-[#EEEEEE]';

  return (
    <nav className="flex fixed justify-between items-center p-4 bg-black w-full z-50 font-bebas">
      <Link to="/" className="text-white text-3xl ml-8 uppercase">Star wars catalog</Link>
      <div className="flex space-x-8 text-2xl pr-8">
        <Link to="/" className={getLinkClass('/')}>Home</Link>
        <Link to="/starships" className={getLinkClass('/starships')}>Starships</Link>
        <Link to="/pilots" className={getLinkClass('/pilots')}>Pilots</Link>
      </div>
    </nav>
  );
};

export default Navbar;
