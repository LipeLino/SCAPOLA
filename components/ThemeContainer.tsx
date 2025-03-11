"use client";

import { useEffect } from 'react';

const ThemeContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return <>{children}</>;
};

export default ThemeContainer;