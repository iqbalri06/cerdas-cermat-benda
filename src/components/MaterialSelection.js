import React, { useState } from 'react';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

function MaterialSelection({ materials, onSelectMaterial, userName, greeting = 'Selamat Datang' }) {
  const [showNameModal, setShowNameModal] = useState(false);
  const [newName, setNewName] = useState(userName || '');
  const [nameError, setNameError] = useState('');
  return (
    <div className="py-8 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="relative mb-10">
        {/* Decorative elements */}
        <motion.div 
          className="absolute -top-10 left-1/4 text-4xl"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🧠
        </motion.div>
        
        <motion.div 
          className="absolute -top-12 right-1/4 text-4xl"
          animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          📚
        </motion.div>
      </div>
      
      <motion.div 
        className="bg-gradient-to-r from-primary-100 to-accent-100 py-5 px-6 rounded-2xl mb-8 shadow-md border-2 border-accent-300"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-heading font-bold text-primary-800 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block mr-2">🎮</span>
          Pilih Topik Petualanganmu!
        </motion.h2>
        
        <motion.p 
          className="text-center text-primary-600 font-medium text-xl mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {greeting}, <motion.button
            className="text-accent-700 font-bold border-b-2 border-dashed border-accent-400 hover:border-accent-600 transition-colors focus:outline-none"
            onClick={() => setShowNameModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {userName || 'Petualang'}
          </motion.button>!
        </motion.p>
        
        <motion.p 
          className="text-center text-primary-700 mt-3 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Pilih salah satu tema seru di bawah untuk mulai bermain dan belajar!
        </motion.p>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {materials.map((material, index) => (
          <motion.div 
            key={material.id} 
            className={`${material.isActive ? 'cursor-pointer' : 'opacity-80'} 
                     relative overflow-hidden h-full flex flex-col bg-white rounded-3xl border-4 ${material.isActive ? 'border-secondary-400' : 'border-gray-300'} shadow-xl`}
            onClick={() => material.isActive && onSelectMaterial(material)}
            initial={{ opacity: 0, y: 50, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ 
              delay: index * 0.15 + 0.3, 
              duration: 0.6,
              type: "spring",
              stiffness: 260,
              damping: 20 
            }}
            whileHover={material.isActive ? { 
              scale: 1.03, 
              rotate: 1,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
            } : {}}
          >
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-accent-200 to-primary-100 rounded-t-2xl"></div>
            
            <div className="text-center mt-12 mb-4 relative">
              <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-white border-4 border-accent-300 text-5xl mb-3 shadow-lg transform -translate-y-6">
                {material.icon}
                
                {material.isActive && (
                  <motion.div 
                    className="absolute -bottom-2 -right-2 text-2xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    ⭐
                  </motion.div>
                )}
              </div>
              
              <h3 className="font-heading text-2xl font-bold text-primary-800 px-4">{material.title}</h3>
            </div>
            
            <div className="bg-primary-50 mx-4 p-4 rounded-xl mb-4">
              <p className="text-primary-700 text-center text-lg flex-grow">{material.description}</p>
            </div>
            
            {material.isActive ? (
              <motion.div 
                className="flex items-center justify-center gap-2 bg-green-100 py-3 px-6 rounded-full w-fit mx-auto mb-6 border-2 border-green-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <CheckCircleIcon className="h-6 w-6 text-green-600" />
                <span className="text-lg font-bold text-green-700">Ayo Main!</span>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center justify-center gap-2 bg-gray-100 py-3 px-6 rounded-full w-fit mx-auto mb-6 border-2 border-gray-200"
                animate={{ rotate: [0, 1, -1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <ClockIcon className="h-6 w-6 text-gray-600" />
                <span className="text-lg font-bold text-gray-700">Tunggu Sebentar...</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Name Change Modal */}
      <AnimatePresence>
        {showNameModal && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowNameModal(false)}
          >
            <motion.div 
              className="bg-white rounded-2xl p-5 sm:p-8 max-w-md w-full shadow-xl border-4 border-accent-300"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-4">
                <motion.div 
                  className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary-100 border-4 border-accent-400 flex items-center justify-center overflow-hidden shadow-lg"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, type: "tween" }}
                >
                  <span className="text-3xl">✏️</span>
                </motion.div>
                <h3 className="text-2xl font-bold text-primary-800">Ganti Namamu</h3>
                <p className="text-primary-600 mt-1">Siapa namamu, petualang?</p>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!newName.trim()) {
                  setNameError('Nama tidak boleh kosong');
                  return;
                }
                
                localStorage.setItem('userName', newName.trim());
                window.location.reload(); // Reload to update name throughout app
              }}>
                <div className="mb-4 relative">
                  <input 
                    type="text"
                    className="w-full px-4 py-3 rounded-full text-lg border-3 border-accent-300 focus:border-accent-500 focus:ring-4 focus:ring-accent-200 outline-none transition-all shadow-md"
                    placeholder="Tulis namamu di sini"
                    value={newName}
                    onChange={(e) => {
                      setNewName(e.target.value);
                      setNameError('');
                    }}
                    autoFocus
                  />
                  {nameError && (
                    <motion.p 
                      className="text-red-500 text-sm mt-2 ml-4 font-medium flex items-center"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <span className="mr-2">❗</span> {nameError}
                    </motion.p>
                  )}
                </div>
                
                <div className="flex gap-3 justify-center">
                  <motion.button
                    type="button"
                    className="bg-gray-200 text-gray-700 font-bold px-6 py-3 rounded-full shadow-md border-2 border-gray-300"
                    onClick={() => setShowNameModal(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-2">
                      <span>❌</span> Batal
                    </span>
                  </motion.button>
                  
                  <motion.button 
                    type="submit"
                    className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl border-2 border-secondary-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center gap-2">
                      <span>✅</span> Simpan
                    </span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MaterialSelection;
