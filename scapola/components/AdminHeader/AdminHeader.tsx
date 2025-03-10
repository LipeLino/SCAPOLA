'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminHeader() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    
    try {
      setIsLoggingOut(true);
      
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.success) {
        router.push('/auth/login');
      } else {
        console.error('Erro no logout:', data.message);
      }
    } catch (error) {
      console.error('Erro ao processar logout:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-black">
      <div className="flex justify-center">
        <img src="/favicon.ico" alt="Logo" className="h-16 mx-auto" />
      </div>
      <div>
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="bg-transparent text-white font-semibold py-2 px-4 border border-red-500 hover:bg-red-600 hover:border-transparent rounded transition duration-200 disabled:opacity-50"
        >
          {isLoggingOut ? 'Saindo...' : 'Logout'}
        </button>
      </div>
    </header>
  );
}

