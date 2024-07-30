import React, { ReactNode } from 'react';
import bgImage from '../assets/images/bg.jpg';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      {children}
    </div>
  );
};

export default Layout;
