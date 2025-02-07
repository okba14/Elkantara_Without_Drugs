import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 left-4 z-50 bg-blue-600 dark:bg-blue-800 text-white p-2 rounded-full hover:bg-blue-700 dark:hover:bg-blue-900 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6" />
      ) : (
        <Moon className="w-6 h-6" />
      )}
    </button>
  );
};