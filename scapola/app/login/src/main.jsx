'use client';
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

function Main() {
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (rootElement) {
      createRoot(rootElement).render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
  }, []);

  return null; // Retorna null ou algum componente de fallback
}

export default Main;
