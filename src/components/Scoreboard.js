import React from 'react';
import { motion } from 'framer-motion';

function Scoreboard({ score, totalQuestions, currentQuestion }) {
  const progress = (currentQuestion / totalQuestions) * 100;
  
  // Array to display stars based on score
  const stars = Array.from({ length: totalQuestions }, (_, index) => {
    // Determine if this star represents a correct answer
    const isCorrect = index < score;
    // Determine if this is the current question
    const isCurrent = index + 1 === currentQuestion;
    
    return (
      <motion.div 
        key={index}
        className={`relative p-1 ${isCurrent ? 'z-10' : ''}`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: isCorrect ? 1.1 : 1, 
          opacity: 1 
        }}
        whileHover={{ scale: isCorrect ? 1.2 : 1.05 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          type: isCorrect ? "spring" : "tween",
          stiffness: 300,
          damping: 10
        }}
      >
        {isCorrect ? (
          <motion.span 
            className="text-base sm:text-lg md:text-xl"
            initial={{ rotate: 0 }}
            animate={{ rotate: 10, scale: 1.1 }}
            transition={{ 
              rotate: { 
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.5
              },
              scale: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2
              }
            }}
          >
            ⭐
          </motion.span>
        ) : (
          <motion.span 
            className={`text-base sm:text-lg md:text-xl ${isCurrent ? "text-accent-400" : "text-gray-300"}`}
            animate={{ 
              scale: isCurrent ? 1.1 : 1
            }}
            transition={{
              scale: {
                repeat: isCurrent ? Infinity : 0,
                repeatType: "reverse",
                duration: 0.8
              }
            }}
          >
            ☆
          </motion.span>
        )}
        {/* Highlight current question with subtle indicator */}
        {index + 1 === currentQuestion && (
          <motion.div
            className="absolute -inset-1 rounded-full bg-accent-100 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ 
              opacity: { 
                repeat: Infinity,
                repeatType: "reverse",
                duration: 0.8
              }
            }}
          />
        )}
      </motion.div>
    );
  });
  
  return (
    <motion.div 
      className="bg-gradient-to-r from-accent-100 to-primary-100 rounded-xl sm:rounded-2xl shadow-lg p-2.5 sm:p-4 mb-3 sm:mb-5 max-w-4xl mx-auto border-2 sm:border-3 border-accent-300"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, type: "spring" }}
    >
      <div className="flex flex-row flex-wrap justify-between items-center mb-3 gap-2 sm:gap-4">
        <motion.div 
          className="flex items-center gap-1.5 sm:gap-3"
          whileHover={{ scale: 1.03 }}
        >
          <motion.div 
            className="flex items-center justify-center bg-primary-100 p-1.5 sm:p-2 rounded-full border-2 border-primary-300 shadow-md"
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, type: "tween" }}
          >
            <span className="text-lg sm:text-xl md:text-2xl">🏆</span>
          </motion.div>
          
          <div className="flex flex-col">
            <span className="text-primary-800 font-bold text-xs sm:text-sm md:text-base">Skormu:</span>
            <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-bold py-0.5 sm:py-1 px-2 sm:px-3 md:px-4 rounded-full text-sm sm:text-base md:text-lg shadow-md border-2 border-secondary-300">
              {score} Poin
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center"
          whileHover={{ scale: 1.03 }}
        >
          <div className="text-sm sm:text-base md:text-lg text-primary-800 font-bold flex items-center gap-1.5 sm:gap-2">
            <span className="text-base sm:text-lg md:text-xl">📝</span> 
            Soal <span className="text-accent-700">{currentQuestion}</span> dari <span className="text-accent-700">{totalQuestions}</span>
          </div>
        </motion.div>
      </div>
      
      <div className="flex justify-center mb-3">
        <div className="flex flex-wrap justify-center gap-1 max-w-full">
          {stars}
        </div>
      </div>
      
      <div className="h-2.5 sm:h-3 md:h-4 bg-white rounded-full overflow-hidden shadow-inner border border-accent-200 relative">
        {/* Progress turtle animation */}
        <motion.div 
          className="absolute top-1/2 transform -translate-y-1/2 text-sm sm:text-base md:text-lg z-10"
          style={{ left: `${Math.min(Math.max(progress - 5, 0), 95)}%` }}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 5 }}
          transition={{ 
            opacity: { duration: 0.5, delay: 0.5 },
            x: { 
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.8
            }
          }}
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
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1 sm:-translate-x-2 text-sm sm:text-base md:text-lg">
          🏁
        </div>
      </div>
    </motion.div>
  );
}

export default Scoreboard;
