import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

function Header() {
  return (
    <header className="bg-gradient-to-r from-amber-400 via-pink-400 to-accent-400 text-white py-4 sm:py-5 shadow-xl rounded-b-3xl relative overflow-hidden navbar-rainbow-border">
      {/* Animated bubble decorations */}
      <motion.div 
        className="absolute -left-4 top-0 w-12 sm:w-16 h-12 sm:h-16 bg-white rounded-full opacity-30"
        animate={{ y: [-10, 10, -10], scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, type: "tween" }}
      />
      <motion.div 
        className="absolute left-1/4 -bottom-6 w-10 sm:w-14 h-10 sm:h-14 bg-yellow-300 rounded-full opacity-20"
        animate={{ y: [5, -8, 5], scale: [1, 1.15, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.2, type: "tween" }}
      />
      <motion.div 
        className="absolute right-1/3 top-0 w-8 sm:w-10 h-8 sm:h-10 bg-green-300 rounded-full opacity-20"
        animate={{ y: [-5, 8, -5], scale: [1, 1.1, 1] }}
        transition={{ duration: 4.2, repeat: Infinity, delay: 0.5, type: "tween" }}
      />
      <motion.div 
        className="absolute -right-4 bottom-0 w-16 sm:w-24 h-16 sm:h-24 bg-purple-400 rounded-full opacity-20"
        animate={{ y: [10, -10, 10], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.7, type: "tween" }}
      />
      
      {/* Floating shapes for fun kid-friendly appearance */}
      <motion.div
        className="absolute left-[10%] top-1/2 text-lg sm:text-xl opacity-30"
        animate={{ 
          y: [-5, 5, -5], 
          rotate: [0, 10, 0] 
        }}
        transition={{ duration: 3, repeat: Infinity, type: "tween" }}
      >
        ★
      </motion.div>
      
      <motion.div
        className="absolute left-[25%] top-[30%] text-lg sm:text-xl opacity-30"
        animate={{ 
          y: [5, -5, 5], 
          rotate: [0, -15, 0] 
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5, type: "tween" }}
      >
        ▲
      </motion.div>
      
      <motion.div
        className="absolute right-[20%] top-[25%] text-lg sm:text-xl opacity-30"
        animate={{ 
          y: [-7, 7, -7], 
          rotate: [0, 20, 0] 
        }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1, type: "tween" }}
      >
        ■
      </motion.div>
      
      <motion.div
        className="absolute right-[40%] top-[60%] text-lg sm:text-xl opacity-30"
        animate={{ 
          y: [6, -6, 6], 
          rotate: [0, -10, 0] 
        }}
        transition={{ duration: 3.8, repeat: Infinity, delay: 0.8, type: "tween" }}
      >
        ●
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex items-center justify-center gap-2 sm:gap-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <motion.div 
            className="navbar-logo-container flex items-center justify-center bg-white rounded-full p-2 sm:p-3 border-3 border-yellow-300 shadow-glow"
            whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-3xl sm:text-4xl">🧠</span>
          </motion.div>
          
          <div className="text-center">
            <motion.h1 
              className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold tracking-wide mb-0 sm:mb-1 text-shadow-fun"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-white">Cerdas</span>
              <span className="text-yellow-300">Cermat</span>
            </motion.h1>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-sm sm:text-base md:text-lg text-white font-bold flex items-center justify-center gap-1 sm:gap-2 text-shadow-sm">
                <motion.span 
                  className="inline-block"
                  animate={{ 
                    y: [0, -6, 0],
                    rotate: [0, 15, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  🌟
                </motion.span>
                Kuis Seru Pengetahuan Umum
                <motion.span 
                  className="inline-block"
                  animate={{ 
                    y: [0, -6, 0],
                    rotate: [0, -15, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                >
                  🌈
                </motion.span>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

export default Header;
