import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
  const router = useRouter();

  // Helper to highlight active link
  const isActive = (path: string) => router.pathname === path;

  return (
    <aside className="bg-gray-900 w-60 flex flex-col p-4">
      {/* Brand / Title */}
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">MM Web</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        <Link
          href="/"
          className={`block py-2.5 px-4 rounded transition-colors ${
            isActive('/')
              ? 'bg-gray-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          Dashboard
        </Link>
        <Link
          href="/wallet-management"
          className={`block py-2.5 px-4 rounded transition-colors ${
            isActive('/wallet-management')
              ? 'bg-gray-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          Wallet Management
        </Link>
        <Link
          href="/auto-trading"
          className={`block py-2.5 px-4 rounded transition-colors ${
            isActive('/auto-trading')
              ? 'bg-gray-700 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          Auto-Trading
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
