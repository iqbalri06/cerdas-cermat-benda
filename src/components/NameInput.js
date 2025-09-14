import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function NameInput({ onSubmitName }) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    // Check if name is already stored in localStorage
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setErrorMessage('Nama tidak boleh kosong!');
      return;
    }
    
    setIsSubmitting(true);
    
    // User ID generation is handled in the Quiz component now
    // We don't need to create a user ID here as it's done in Quiz.js with UUID
    
    // Store name in localStorage
    localStorage.setItem('userName', name);
    
    // Submit the name to parent component
    setTimeout(() => {
      onSubmitName(name);
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 sm:py-8 px-3 sm:px-4 mx-auto w-full">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6 bg-white rounded-2xl shadow-lg border-4 border-accent-300"
        style={{
          background: "linear-gradient(135deg, #fff6e5 0%, #fffbf2 100%)",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
      >
        <motion.h1 
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-center text-primary-700 mb-3 sm:mb-4"
          style={{ color: "#4a6bdf" }}
        >
          <span role="img" aria-label="Bintang">✨</span> Siapa Namamu? <span role="img" aria-label="Bintang">✨</span>
        </motion.h1>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex justify-center mb-4 sm:mb-6">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" 
              alt="Karakter Lucu"
              className="w-20 h-20 sm:w-24 sm:h-24"
            />
          </div>
        </motion.div>
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrorMessage('');
                }}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base sm:text-lg border-2 border-accent-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                placeholder="Masukkan namamu di sini..."
                autoComplete="off"
                style={{ background: "rgba(255, 255, 255, 0.8)" }}
              />
              <span className="absolute right-3 sm:right-4 top-3 sm:top-4 text-lg sm:text-xl">👋</span>
            </motion.div>
            
            {errorMessage && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-xs sm:text-sm text-red-600 font-medium"
              >
                <span role="img" aria-label="Warning">⚠️</span> {errorMessage}
              </motion.p>
            )}
          </div>
          
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 sm:py-4 px-3 sm:px-4 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-75 text-base sm:text-lg"
            style={{ background: "linear-gradient(135deg, #4a6bdf 0%, #2d4bb2 100%)" }}
          >
            {isSubmitting ? 
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span> 
              : 
              <span>
                Mulai Petualangan! <span role="img" aria-label="Rocket">🚀</span>
              </span>
            }
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default NameInput;
