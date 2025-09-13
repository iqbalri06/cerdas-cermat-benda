import React from 'react';
import { motion } from 'framer-motion';
import './App.css';
import Header from './components/Header';
import Quiz from './components/Quiz';

function App() {
  // Set document title
  React.useEffect(() => {
    document.title = "BendaCerdas - Kuis Cerdas Cermat";
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 via-pink-50 to-amber-50 relative overflow-hidden">
      {/* Animated background decorative elements */}
      <motion.div 
        className="absolute top-20 left-10 text-6xl sm:text-7xl opacity-15 transform rotate-12"
        animate={{ rotate: [12, 20, 12], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, type: "tween" }}
      >
        🧠
      </motion.div>
      
      <motion.div 
        className="absolute top-1/4 right-10 text-6xl sm:text-7xl opacity-15 transform -rotate-12"
        animate={{ rotate: [-12, -20, -12], y: [0, 10, 0] }}
        transition={{ duration: 9, repeat: Infinity, delay: 1, type: "tween" }}
      >
        📚
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/3 left-20 text-6xl sm:text-7xl opacity-15 transform rotate-6"
        animate={{ rotate: [6, 15, 6], y: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 2, type: "tween" }}
      >
        🎮
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 right-20 text-6xl sm:text-7xl opacity-15 transform -rotate-6"
        animate={{ rotate: [-6, -15, -6], y: [0, 15, 0] }}
        transition={{ duration: 11, repeat: Infinity, delay: 3, type: "tween" }}
      >
        🌟
      </motion.div>
      
      {/* Additional kid-friendly decorative elements */}
      <motion.div 
        className="absolute top-1/3 left-1/4 text-4xl sm:text-5xl opacity-10"
        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, type: "tween" }}
      >
        🎯
      </motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 right-1/4 text-4xl sm:text-5xl opacity-10"
        animate={{ rotate: [0, -360], scale: [1, 1.2, 1] }}
        transition={{ duration: 25, repeat: Infinity, type: "tween", delay: 2 }}
      >
        �
      </motion.div>
      
      <Header />
      <main className="flex-1 container mx-auto px-4 z-10">
        <Quiz />
      </main>
      <footer className="bg-gradient-to-r from-accent-400 via-pink-400 to-amber-400 text-white text-center py-4 sm:py-6 mt-8 rounded-t-3xl shadow-inner relative z-10 footer-rainbow-border">
        <motion.div 
          className="absolute -top-4 left-1/4 text-2xl"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, 15, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", type: "tween" }}
        >
          🎯
        </motion.div>
        <motion.div 
          className="absolute -top-4 right-1/4 text-2xl"
          animate={{ 
            y: [0, -8, 0],
            rotate: [0, -15, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5, type: "tween" }}
        >
          🎪
        </motion.div>
        <p className="text-base sm:text-lg font-bold text-shadow-sm">&copy; {new Date().getFullYear()} Cerdas Cermat</p>
        <p className="text-sm mt-1 text-white font-medium">Petualangan belajar untuk anak-anak</p>
        
        {/* Decorative elements for the footer */}
        <div className="flex justify-center gap-3 mt-2">
          {['📚', '🎨', '🎮', '🧩', '🎯'].map((emoji, index) => (
            <motion.span 
              key={index}
              className="text-xl opacity-70"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ 
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
                repeatDelay: 1,
                type: "tween"
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </footer>
    </div>
  );
}

export default App;
