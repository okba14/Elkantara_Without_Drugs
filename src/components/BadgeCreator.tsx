import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { motion } from 'framer-motion';
import { Download, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';

export const BadgeCreator: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: new Date(),
    photo: ''
  });
  const [showBadge, setShowBadge] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          photo: e.target?.result as string
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBadge(true);
  };

  const downloadBadge = async () => {
    const badge = document.getElementById('badge');
    if (badge) {
      const canvas = await html2canvas(badge);
      const link = document.createElement('a');
      link.download = 'el-kantara-badge.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const shareBadge = async () => {
    const badge = document.getElementById('badge');
    if (badge) {
      const canvas = await html2canvas(badge);
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob as Blob));
      });
      
      if (navigator.share) {
        try {
          await navigator.share({
            files: [new File([blob], 'badge.png', { type: 'image/png' })],
            title: 'El Kantara Without Drugs Campaign Badge'
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-12 px-4"
    >
      {!showBadge ? (
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
            {t('badge.title')}
          </h2>
          
          <div className="space-y-4">
            <input
              type="text"
              placeholder={t('badge.firstName')}
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <input
              type="text"
              placeholder={t('badge.lastName')}
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
            
            <DatePicker
              selected={formData.dateOfBirth}
              onChange={(date) => setFormData(prev => ({ ...prev, dateOfBirth: date || new Date() }))}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              dateFormat="dd/MM/yyyy"
            />
            
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-gray-600">
                {t('badge.uploadPhoto')}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              {t('badge.createBadge')}
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto"
        >
          <div
            id="badge"
            className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-600" />
            
            <div className="flex items-center justify-center mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-600">
                <img
                  src={formData.photo}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800">
                {formData.firstName} {formData.lastName}
              </h3>
              <p className="text-gray-600 mt-2">
                {formData.dateOfBirth.toLocaleDateString()}
              </p>
              <p className="text-blue-600 font-bold mt-4">
                El Kantara Without Drugs
              </p>
            </div>
            
            <div className="mt-4 flex justify-center">
              <QRCodeSVG
                value={`${window.location.origin}/badge/${formData.firstName}-${formData.lastName}`}
                size={100}
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={downloadBadge}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              <Download className="w-5 h-5 mr-2" />
              {t('badge.download')}
            </button>
            
            <button
              onClick={shareBadge}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              <Share2 className="w-5 h-5 mr-2" />
              {t('badge.share')}
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};