import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { Pill } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showRedirect, setShowRedirect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRedirect(true);
      setTimeout(() => navigate('/badge'), 2000);
    }, 8000); // Increased to allow for both messages

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-900 dark:to-gray-900 flex flex-col items-center justify-center text-white p-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Pill className="w-24 h-24 text-white" />
      </motion.div>
      
      <div className="text-center max-w-3xl space-y-8">
        <div className="h-20"> {/* Fixed height for typewriter */}
          <Typewriter
            options={{
              strings: ["مرحباً بكم في مدينة القنطرة بدون مخدرات", "Welcome to the City of El Kantara Without Drugs"],
              autoStart: true,
              delay: 50,
              deleteSpeed: 30,
              pauseFor: 1500,
            }}
          />
        </div>
        
        {showRedirect && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="text-lg">
              {t('splash.redirect')}
            </p>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-yellow-300 font-bold text-xl"
            >
              #NoToDrugs #ElKantaraCares
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};