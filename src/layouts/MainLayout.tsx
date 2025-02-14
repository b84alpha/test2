// src/layouts/MainLayout.tsx
import React from 'react';
import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Right side (Header + main content) */}
      <div className="flex flex-col flex-1">
        <Header />
        
        {/* Main page content */}
        <main className="flex-1 p-6 bg-[#F8FBF9]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
