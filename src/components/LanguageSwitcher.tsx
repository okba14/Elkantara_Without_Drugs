import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
      aria-label="Toggle Language"
    >
      <Languages className="w-6 h-6" />
    </button>
  );
};