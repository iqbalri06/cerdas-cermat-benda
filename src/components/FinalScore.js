import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function FinalScore({ score, totalQuestions, playerName, userId, isRewardEligible, onRestart, onViewRewards }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const percentage = Math.round((score / totalQuestions) * 100);
  
  // Messages based on score percentage
  const getFeedback = () => {
    if (percentage >= 90) return { emoji: "🏆", message: "Luar Biasa!" };
    if (percentage >= 70) return { emoji: "🌟", message: "Hebat!" };
    if (percentage >= 50) return { emoji: "👍", message: "Bagus!" };
    return { emoji: "🙂", message: "Terus Semangat!" };
  };
  
  const { emoji, message } = getFeedback();
  
  // Trigger confetti effect on component mount
  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Confetti pieces
  const confettiColors = ["#FF5252", "#FFD740", "#64FFDA", "#448AFF", "#B388FF", "#69F0AE"];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => {
    const color = confettiColors[i % confettiColors.length];
    const x = Math.random() * 100;
    const delay = Math.random() * 3;
    const size = Math.random() * 1 + 0.5;
    const rotation = Math.random() * 360;
    
    return (
      <motion.div
        key={i}
        className="absolute w-3 h-3 rounded-sm"
        style={{ 
          backgroundColor: color, 
          left: `${x}%`,
          top: "-20px",
          opacity: 0,
          scale: size,
          rotate: rotation,
          display: showConfetti ? "block" : "none"
        }}
        animate={{
          y: ["0vh", "100vh"],
          opacity: [0, 1, 0],
          rotate: [`${rotation}deg`, `${rotation + (Math.random() > 0.5 ? 360 : -360)}deg`],
        }}
        transition={{
          duration: 5 + Math.random() * 2,
          delay: delay,
          ease: "easeOut",
          repeat: 1,
          repeatDelay: 3,
        }}
      />
    );
  });
  
  // Trophy animation variants
  const trophyVariants = {
    hidden: { scale: 0, rotate: -180, y: 100 },
    visible: { 
      scale: 1, 
      rotate: 0, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: 0.3 
      }
    },
    hover: { 
      scale: 1.1,
      y: -10,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10
      }
    }
  };
  
  // Star animation variants
  const starVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({ 
      scale: 1, 
      opacity: 1,
      transition: { 
        delay: 0.5 + (i * 0.1),
        duration: 0.5
      }
    }),
    hover: { 
      scale: 1.2,
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.5 }
    }
  };
  
  // Generate stars based on score
  const scoreStars = Array.from({ length: 5 }, (_, i) => {
    // Calculate if this star should be full, half, or empty
    const fullStars = Math.floor(percentage / 20); // 20% per star
    const hasHalfStar = (percentage % 20) > 10;
    
    let starType;
    if (i < fullStars) {
      starType = "⭐";
    } else if (i === fullStars && hasHalfStar) {
      starType = "⭐"; // We don't have half star emoji, so using full
    } else {
      starType = "☆";
    }
    
    return (
      <motion.span
        key={i}
        className="text-4xl sm:text-5xl inline-block"
        variants={starVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        custom={i}
      >
        {starType}
      </motion.span>
    );
  });
  
  return (
    <div className="relative py-8 sm:py-12 px-3 sm:px-4 md:px-8 max-w-3xl mx-auto overflow-hidden">
      {/* Confetti effect */}
      {confettiPieces}
      
      <motion.div 
        className="bg-gradient-to-br from-primary-50 to-accent-100 rounded-3xl shadow-lg p-5 sm:p-8 text-center border-4 border-accent-300 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Decorative elements */}
        <motion.div 
          className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 text-4xl sm:text-5xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🎉
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-4 -left-4 w-16 h-16 sm:w-20 sm:h-20 text-4xl sm:text-5xl"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          🎊
        </motion.div>
        
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-primary-800 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Nilai Akhir
        </motion.h2>
        
        <motion.div
          className="flex flex-col items-center"
        >
          <motion.div
            className="mb-3 sm:mb-4 bg-white/70 backdrop-blur-sm w-fit px-6 py-2 rounded-full border-2 border-accent-300"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <span className="text-primary-700 font-bold text-lg sm:text-xl">Halo, {playerName}!</span>
          </motion.div>
          
          <motion.div
            className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-3 sm:mb-6"
            variants={trophyVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-200 to-amber-50 border-4 border-secondary-300 flex items-center justify-center overflow-hidden shadow-lg">
              <span className="text-6xl sm:text-7xl">{emoji}</span>
            </div>
          </motion.div>
          
          <motion.h3
            className="text-2xl sm:text-3xl font-bold text-accent-700 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {message}
          </motion.h3>
          
          <motion.div
            className="bg-gradient-to-r from-secondary-500 to-secondary-600 text-white font-bold py-2 px-8 rounded-full text-2xl sm:text-3xl shadow-md border-2 border-secondary-300 mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
          >
            {score} / {totalQuestions}
          </motion.div>
          
          <motion.div
            className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium border border-green-300 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Poin yang kamu dapatkan: {score} poin = Rp {score * 100}
          </motion.div>
          
          <motion.div
            className="flex gap-1 sm:gap-2 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {scoreStars}
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-gradient-to-r from-accent-500 to-accent-600 text-white font-bold text-lg px-6 py-3 rounded-full shadow-md hover:shadow-lg border-2 border-accent-300 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              onClick={onRestart}
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">🔄</span> Main Lagi
              </span>
            </motion.button>
            
            <motion.button
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg px-6 py-3 rounded-full shadow-md hover:shadow-lg border-2 border-primary-300 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              onClick={() => window.location.reload()}
            >
              <span className="flex items-center justify-center">
                <span className="mr-2">🏠</span> Halaman Utama
              </span>
            </motion.button>
          </div>
          
          {/* Reward Button */}
          <motion.button
            className="mt-4 flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold py-2 px-6 rounded-full border-2 border-amber-300 mx-auto shadow-md transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            onClick={onViewRewards}
          >
            <span className="text-xl">🎁</span>
            <span>Tukarkan Poin Hadiah</span>
          </motion.button>
        </motion.div>
        
        {/* Achievement badges */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          {percentage >= 30 && (
            <motion.div
              className="bg-white/80 backdrop-blur-sm p-2 rounded-full border-2 border-primary-200 flex items-center gap-2 shadow-sm"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-2xl">🔍</span>
              <span className="font-medium text-sm text-primary-700">Peneliti</span>
            </motion.div>
          )}
          
          {percentage >= 50 && (
            <motion.div
              className="bg-white/80 backdrop-blur-sm p-2 rounded-full border-2 border-primary-200 flex items-center gap-2 shadow-sm"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-2xl">📚</span>
              <span className="font-medium text-sm text-primary-700">Pintar</span>
            </motion.div>
          )}
          
          {percentage >= 70 && (
            <motion.div
              className="bg-white/80 backdrop-blur-sm p-2 rounded-full border-2 border-primary-200 flex items-center gap-2 shadow-sm"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-2xl">💡</span>
              <span className="font-medium text-sm text-primary-700">Jenius</span>
            </motion.div>
          )}
          
          {percentage >= 90 && (
            <motion.div
              className="bg-white/80 backdrop-blur-sm p-2 rounded-full border-2 border-primary-200 flex items-center gap-2 shadow-sm"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="text-2xl">🥇</span>
              <span className="font-medium text-sm text-primary-700">Juara</span>
            </motion.div>
          )}
        </motion.div>
        
        {/* User ID for tracking */}
        <motion.div
          className="mt-4 text-center text-xs text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          ID Peserta: <span className="font-mono font-medium">{userId?.substring(0, 8)}</span>
        </motion.div>
        
        {/* User ID is displayed above, no need for reward notification here */}
      </motion.div>
    </div>
  );
}

export default FinalScore;
