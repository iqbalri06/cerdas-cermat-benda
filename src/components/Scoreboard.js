import React from 'react';
import { motion } from 'framer-motion';

function Scoreboard({ score, totalQuestions, currentQuestion }) {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  // Array to display stars based on score
  const stars = Array.from({ length: totalQuestions }, (_, index) => (
    <motion.span 
      key={index}
      className={`text-lg sm:text-2xl ${index < score ? '' : 'opacity-40'}`}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ 
        scale: index < score ? [1, 1.3, 1] : 1, 
        opacity: 1 
      }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        repeat: index < score ? 1 : 0,
        repeatDelay: 2,
        type: "tween"
      }}
    >
      ⭐
    </motion.span>
  ));
  
  return (
    <motion.div 
      className="bg-gradient-to-r from-accent-100 to-primary-100 rounded-2xl shadow-lg p-3 sm:p-5 mb-4 sm:mb-6 max-w-4xl mx-auto border-3 border-accent-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-3 gap-4">
        <motion.div 
          className="flex items-center gap-2 sm:gap-3"
          whileHover={{ scale: 1.03 }}
        >
          <motion.div 
            className="flex items-center justify-center bg-primary-100 p-1.5 sm:p-2 rounded-full border-2 border-primary-300 shadow-md"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, type: "tween" }}
          >
            <span className="text-xl sm:text-2xl">🏆</span>
          </motion.div>
          
          <div className="flex flex-col">
            <span className="text-primary-800 font-bold text-sm sm:text-base">Skormu:</span>
            <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-bold py-1 px-3 sm:px-4 rounded-full text-lg sm:text-xl shadow-md border-2 border-secondary-300">
              {score} Poin
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center"
          whileHover={{ scale: 1.03 }}
        >
          <div className="text-base sm:text-lg text-primary-800 font-bold flex items-center gap-2">
            <span className="text-lg sm:text-xl">📝</span> 
            Soal <span className="text-accent-700">{currentQuestion}</span> dari <span className="text-accent-700">{totalQuestions}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-1 mt-1 max-w-[300px]">
            {stars}
          </div>
        </motion.div>
      </div>
      
      <div className="h-3 sm:h-4 bg-white rounded-full overflow-hidden shadow-inner border-2 border-accent-200 relative">
        {/* Progress turtle animation */}
        <motion.div 
          className="absolute top-1/2 transform -translate-y-1/2 text-base sm:text-xl z-10"
          style={{ left: `${Math.min(Math.max(progress - 5, 0), 95)}%` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          🐢
        </motion.div>
        
        <motion.div 
          className="h-full bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Goal flag */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-2 text-base sm:text-xl">
          🏁
        </div>
      </div>
    </motion.div>
  );
}

export default Scoreboard;
