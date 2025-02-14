// src/components/ui/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 h-16 flex items-center justify-between px-6">
      {/* Left side (title or brand) */}
      <h2 className="text-white text-xl font-semibold">MM Web</h2>

      {/* Right side button */}
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
        New Launch
      </button>
    </header>
  );
};

export default Header;
