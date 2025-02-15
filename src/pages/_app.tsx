import type { AppProps } from 'next/app';
import '@/styles/globals.css'; // Make sure Tailwind is set up

import Sidebar from '@/components/ui/Sidebar';
import Header from '@/components/ui/Header';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen bg-[#F8FBF9]">
      {/* Dark sidebar */}
      <Sidebar />

      {/* Right side: top header + main content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <Component {...pageProps} />
        </main>
      </div>
    </div>
  );
}

export default MyApp;
