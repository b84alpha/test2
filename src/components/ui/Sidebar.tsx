// src/components/ui/Sidebar.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
  const router = useRouter();

  // Helper to highlight active link
  const linkClasses = (path: string) => {
    const base =
      'block py-2.5 px-4 rounded transition-colors';
    const activeStyles = 'bg-gray-700 text-white';
    const inactiveStyles = 'text-gray-300 hover:bg-gray-700 hover:text-white';

    return router.pathname === path
      ? `${base} ${activeStyles}`
      : `${base} ${inactiveStyles}`;
  };

  return (
    <aside className="bg-gray-900 w-60 flex flex-col p-4">
      {/* Brand / App Title */}
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">MM Web</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        <Link href="/" className={linkClasses('/')}>
          Dashboard
        </Link>
        <Link href="/wallet-management" className={linkClasses('/wallet-management')}>
          Wallet Management
        </Link>
        <Link href="/auto-trading" className={linkClasses('/auto-trading')}>
          Auto-Trading
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
