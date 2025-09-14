import React, { useState } from 'react';
import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

function MaterialSelection({ materials, onSelectMaterial, userName, greeting = 'Selamat Datang', onShowRewards }) {
  const [showNameModal, setShowNameModal] = useState(false);
  const [newName, setNewName] = useState(userName || '');
  const [nameError, setNameError] = useState('');
  return (
    <div className="py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-8 max-w-6xl mx-auto">
      {/* Navbar */}
      <motion.nav 
        className="bg-white border-b-2 border-accent-200 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl shadow-md mb-6 sm:mb-8 sticky top-2 z-40"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <motion.div 
            className="flex items-center gap-1.5 sm:gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <motion.span 
              className="text-xl sm:text-2xl"
              animate={{ rotate: [0, -10, 0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            >
              📝
            </motion.span>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-primary-800 bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Cerdas Cermat
            </h1>
          </motion.div>
          
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <motion.button
              onClick={onShowRewards}
              className="flex items-center gap-1 bg-amber-100 hover:bg-amber-200 text-amber-800 font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-full border border-amber-300 shadow-md hover:shadow-lg transition-all text-xs sm:text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: [
                  "0 4px 6px -1px rgba(0,0,0,0.1)",
                  "0 6px 8px -1px rgba(0,0,0,0.15)",
                  "0 4px 6px -1px rgba(0,0,0,0.1)"
                ] 
              }}
              transition={{ 
                boxShadow: { repeat: Infinity, duration: 2 }
              }}
            >
              <span className="text-base sm:text-lg">🎁</span>
              <span className="hidden sm:inline font-semibold">Hadiah</span>
            </motion.button>
            
            <motion.button
              onClick={() => setShowNameModal(true)}
              className="flex items-center gap-1 bg-primary-100 hover:bg-primary-200 text-primary-800 font-medium py-1.5 sm:py-2 px-3 sm:px-4 rounded-full border border-primary-300 shadow-md hover:shadow-lg transition-all text-xs sm:text-sm md:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-primary-200 rounded-full flex items-center justify-center overflow-hidden border border-primary-400">
                <span className="text-sm sm:text-base">👤</span>
              </div>
              <span className="hidden sm:inline font-semibold">{userName || 'Profil'}</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>
      
      <div className="relative mb-6 sm:mb-8 md:mb-10">
        {/* Decorative elements */}
        <motion.div 
          className="absolute -top-6 sm:-top-8 md:-top-10 left-1/4 text-2xl sm:text-3xl md:text-4xl"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🧠
        </motion.div>
        
        <motion.div 
          className="absolute -top-8 sm:-top-10 md:-top-12 right-1/4 text-2xl sm:text-3xl md:text-4xl"
          animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          📚
        </motion.div>
      </div>
      
      <motion.div 
        className="bg-gradient-to-r from-primary-100 to-accent-100 py-4 sm:py-5 px-4 sm:px-6 rounded-xl sm:rounded-2xl mb-6 sm:mb-8 shadow-md border-2 border-accent-300"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex-1">
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary-800 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block mr-2">🎮</span>
              Pilih Topik Petualanganmu!
            </motion.h2>
            
            <motion.p 
              className="text-center text-primary-600 font-medium text-lg sm:text-xl mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {greeting}, <span className="text-accent-700 font-bold">
                {userName || 'Petualang'}
              </span>!
            </motion.p>
            
            <motion.p 
              className="text-center text-primary-700 mt-3 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Pilih salah satu tema seru di bawah untuk mulai bermain dan belajar!
            </motion.p>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {materials.map((material, index) => (
          <motion.div 
            key={material.id} 
            className={`${material.isActive ? 'cursor-pointer' : 'opacity-80'} 
                     relative overflow-hidden h-full flex flex-col bg-white rounded-2xl sm:rounded-3xl border-2 sm:border-4 ${material.isActive ? 'border-secondary-400' : 'border-gray-300'} shadow-xl`}
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
            <div className="absolute top-0 left-0 w-full h-16 sm:h-20 bg-gradient-to-r from-accent-200 to-primary-100 rounded-t-xl sm:rounded-t-2xl"></div>
            
            <div className="text-center mt-10 sm:mt-12 mb-3 sm:mb-4 relative">
              <div className="inline-flex items-center justify-center h-16 w-16 sm:h-20 md:h-24 sm:w-20 md:w-24 rounded-full bg-white border-2 sm:border-4 border-accent-300 text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3 shadow-lg transform -translate-y-6">
                {material.icon}
                
                {material.isActive && (
                  <motion.div 
                    className="absolute -bottom-1 sm:-bottom-2 -right-1 sm:-right-2 text-xl sm:text-2xl"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                  >
                    ⭐
                  </motion.div>
                )}
              </div>
              
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-primary-800 px-2 sm:px-4">{material.title}</h3>
            </div>
            
            <div className="bg-primary-50 mx-3 sm:mx-4 p-3 sm:p-4 rounded-xl mb-3 sm:mb-4">
              <p className="text-primary-700 text-center text-sm sm:text-base md:text-lg flex-grow">{material.description}</p>
            </div>
            
            {material.isActive ? (
              <motion.div 
                className="flex items-center justify-center gap-1 sm:gap-2 bg-green-100 py-2 sm:py-3 px-4 sm:px-6 rounded-full w-fit mx-auto mb-4 sm:mb-6 border-2 border-green-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                <CheckCircleIcon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                <span className="text-base sm:text-lg font-bold text-green-700">Ayo Main!</span>
              </motion.div>
            ) : (
              <motion.div 
                className="flex items-center justify-center gap-1 sm:gap-2 bg-gray-100 py-2 sm:py-3 px-4 sm:px-6 rounded-full w-fit mx-auto mb-4 sm:mb-6 border-2 border-gray-200"
                animate={{ rotate: [0, 1, -1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <ClockIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
                <span className="text-base sm:text-lg font-bold text-gray-700">Tunggu Sebentar...</span>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Profile Modal */}
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
              <div className="text-center mb-5 sm:mb-6">
                <motion.div 
                  className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-full bg-primary-100 border-2 sm:border-4 border-accent-400 flex items-center justify-center overflow-hidden shadow-lg"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, type: "tween" }}
                >
                  <span className="text-3xl sm:text-4xl">👤</span>
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary-800">Profil Petualang</h3>
                <p className="text-sm sm:text-base text-primary-600 mt-1">Sesuaikan profilmu di sini</p>
              </div>
              
              <div className="bg-primary-50 p-4 rounded-xl mb-4 shadow-inner border border-primary-100">
                <h4 className="font-bold text-primary-700 text-base sm:text-lg mb-2 flex items-center">
                  <span className="mr-2">✏️</span> Ganti Nama
                </h4>
                
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (!newName.trim()) {
                    setNameError('Nama tidak boleh kosong');
                    return;
                  }
                  
                  localStorage.setItem('userName', newName.trim());
                  window.location.reload(); // Reload to update name throughout app
                }}>
                  <div className="mb-3 relative">
                    <input 
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-full text-sm sm:text-base border-2 border-accent-300 focus:border-accent-500 focus:ring-2 focus:ring-accent-200 outline-none transition-all shadow-md"
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
                        className="text-red-500 text-xs mt-1.5 ml-3 font-medium flex items-center"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <span className="mr-1">❗</span> {nameError}
                      </motion.p>
                    )}
                  </div>
                  
                  <motion.button 
                    type="submit"
                    className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-2 sm:py-2.5 rounded-full shadow-md border border-accent-400 text-sm sm:text-base transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Simpan Nama
                  </motion.button>
                </form>
              </div>
              
              <div className="bg-primary-50 p-4 rounded-xl mb-4 shadow-inner border border-primary-100">
                <h4 className="font-bold text-primary-700 text-base sm:text-lg mb-1 flex items-center">
                  <span className="mr-2">🏆</span> Statistikmu
                </h4>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-white p-2 rounded-lg border border-primary-200 text-center">
                    <p className="text-xs text-primary-600">Total Bermain</p>
                    <p className="font-bold text-lg sm:text-xl text-primary-800">
                      {localStorage.getItem('totalPlayed') || '0'}
                    </p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-primary-200 text-center">
                    <p className="text-xs text-primary-600">Poin</p>
                    <p className="font-bold text-lg sm:text-xl text-primary-800">
                      {localStorage.getItem('totalPoints') || '0'}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 justify-center mt-2">                
                <motion.button 
                  type="button"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl border-2 border-primary-300 text-sm sm:text-base"
                  onClick={() => setShowNameModal(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-1 sm:gap-2">
                    <span>✅</span> Tutup
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MaterialSelection;
