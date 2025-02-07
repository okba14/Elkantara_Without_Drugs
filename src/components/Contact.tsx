import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormStatus('sent');
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setFormStatus('idle');
      (e.target as HTMLFormElement).reset();
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+213 671 36-04-38',
      href: 'tel:+123456789'
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'techokba@gmail.com',
      href: 'mailto:techokba@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Address',
      value: 'El Kantara, Biskra, Algeria'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Contact Information */}
            <div className="bg-blue-600 dark:bg-blue-800 p-8 text-white">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
                <MessageSquare className="w-8 h-8" />
                {t('contact.title')}
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <info.icon className="w-6 h-6 mt-1" />
                    <div>
                      <h3 className="font-semibold">{info.title}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-blue-100 hover:text-white transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-blue-100">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-12">
                <h3 className="font-semibold mb-4">About Us</h3>
                <p className="text-blue-100">
                  Join our mission to create a drug-free El Kantara. Together we can make a difference in our community.
                </p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {t('contact.message')}
                  </label>
                  <textarea
                    rows={4}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={formStatus !== 'idle'}
                  className={`w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 ${
                    formStatus !== 'idle' ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {formStatus === 'sending' ? (
                    <>Sending...</>
                  ) : formStatus === 'sent' ? (
                    <>Message Sent!</>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('contact.submit')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};