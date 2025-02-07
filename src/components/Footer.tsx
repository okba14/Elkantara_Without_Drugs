import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Github, Linkedin, Facebook, Twitter, Instagram,
  Phone, Mail, MapPin, Heart, Shield
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/maronyo.okba', color: 'hover:text-blue-500' },
    { icon: Twitter, href: 'https://twitter.com/okba_elkantara', color: 'hover:text-blue-400' },
    { icon: Instagram, href: 'https://instagram.com/okba_elkantara', color: 'hover:text-pink-500' },
    { icon: Github, href: 'https://github.com/okba14', color: 'hover:text-gray-400' },
    { icon: Linkedin, href: 'https://linkedin.com/okba', color: 'hover:text-blue-600' }
  ];

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-500" />
              El Kantara Without Drugs
            </h3>
            <p className="text-gray-400">
              Together we stand against drug abuse and addiction. Join our cause for a healthier community.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Info</h3>
            <div className="space-y-2">
              <a href="tel:+123456789" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5" />
                +213 671 36-04-38
              </a>
              <a href="mailto:techokba@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
                techokba@gmail.com
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-5 h-5" />
                El Kantara, Biskra , Algeria
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-gray-400 ${social.color} transition-colors`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-center md:text-left">
            © {currentYear} El Kantara Without Drugs. {t('footer.rights')}
          </p>
          <p className="text-sm text-gray-400 flex items-center gap-2 mt-4 md:mt-0">
            {t('footer.developer')} {' '}
            <a
              href="https://github.com/okba14"
              className="text-blue-400 hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gr.OKBA
            </a>
            <Heart className="w-4 h-4 text-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};