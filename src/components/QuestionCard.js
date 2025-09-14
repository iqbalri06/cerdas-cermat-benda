import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

function QuestionCard({ question, choices, correctAnswer, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  
  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
  }, [question]);

  const handleAnswerClick = (answer) => {
    if (!answerSubmitted) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null && !answerSubmitted) {
      setAnswerSubmitted(true);
      onAnswer(selectedAnswer === correctAnswer);
    }
  };

  const getAnswerClasses = (answer) => {
    const baseClasses = "relative border-2 rounded-xl p-3 md:p-5 cursor-pointer transition-all duration-300 bg-white flex items-center";
    
    if (!answerSubmitted) {
      return selectedAnswer === answer 
        ? `${baseClasses} border-primary-500 bg-primary-50 shadow-md` 
        : `${baseClasses} border-gray-200 hover:border-gray-300 hover:bg-gray-50`;
    } else {
      if (answer === correctAnswer) {
        return `${baseClasses} border-green-500 bg-green-50`;
      } else if (selectedAnswer === answer) {
        return `${baseClasses} border-red-500 bg-red-50`;
      }
      return `${baseClasses} border-gray-200 opacity-70`;
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-primary-50 to-white rounded-3xl shadow-lg p-4 md:p-6 lg:p-8 max-w-4xl mx-auto border-4 border-accent-300 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      {/* Decorative corner elements */}
      <div className="absolute -top-3 -left-3 md:-top-5 md:-left-5 w-8 h-8 md:w-12 md:h-12 bg-accent-400 rounded-full border-2 md:border-4 border-white flex items-center justify-center text-lg md:text-2xl transform rotate-12 shadow-md">
        🧩
      </div>
      
      <div className="absolute -top-3 -right-3 md:-top-5 md:-right-5 w-8 h-8 md:w-12 md:h-12 bg-secondary-400 rounded-full border-2 md:border-4 border-white flex items-center justify-center text-lg md:text-2xl transform -rotate-12 shadow-md">
        🔍
      </div>
      
      <motion.div 
        className="mb-6 md:mb-8 pb-3 md:pb-4 border-b-4 border-accent-200 rounded-lg bg-white p-3 md:p-4 shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h3 className="text-lg md:text-2xl font-heading font-bold text-primary-800 flex items-center">
          <span className="text-xl md:text-2xl mr-2">❓</span>
          {question}
        </h3>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        {choices.map((choice, index) => (
          <motion.div
            key={index}
            className={getAnswerClasses(choice)}
            onClick={() => handleAnswerClick(choice)}
            initial={{ opacity: 0, y: 20, rotate: index % 2 === 0 ? -1 : 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ 
              delay: 0.3 + index * 0.15, 
              duration: 0.5,
              type: "spring", 
              stiffness: 200 
            }}
            whileHover={!answerSubmitted ? { 
              scale: 1.03, 
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
            } : {}}
          >
            <span className={`h-10 w-10 rounded-full ${!answerSubmitted ? 'bg-primary-100 text-primary-700' : choice === correctAnswer ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} font-bold text-lg flex items-center justify-center mr-4 border-2 ${!answerSubmitted ? 'border-primary-200' : choice === correctAnswer ? 'border-green-300' : 'border-red-200'}`}>
              {String.fromCharCode(65 + index)}
            </span>
            <span className={`font-medium text-lg ${!answerSubmitted ? 'text-gray-800' : choice === correctAnswer ? 'text-green-700' : 'text-gray-700'}`}>{choice}</span>
            
            {answerSubmitted && choice === correctAnswer && (
              <motion.div
                className="absolute right-4 text-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >
                ✅
              </motion.div>
            )}
            {answerSubmitted && selectedAnswer === choice && choice !== correctAnswer && (
              <motion.div
                className="absolute right-4 text-2xl"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                ❌
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <motion.button 
          className={`py-3 md:py-4 px-6 md:px-8 rounded-full font-bold text-base md:text-lg text-white shadow-lg transition-all border-2
                    ${selectedAnswer === null || answerSubmitted 
                      ? 'bg-gray-400 border-gray-300 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-secondary-500 to-secondary-600 border-secondary-300 hover:shadow-xl'}`}
          onClick={handleSubmit}
          disabled={selectedAnswer === null || answerSubmitted}
          whileHover={selectedAnswer !== null && !answerSubmitted ? { scale: 1.05 } : {}}
          whileTap={selectedAnswer !== null && !answerSubmitted ? { scale: 0.95 } : {}}
        >
          {answerSubmitted ? (
            <span className="flex items-center">
              <span className="mr-2">🎉</span> Jawaban Diterima!
            </span>
          ) : (
            <span className="flex items-center">
              <span className="mr-2">✨</span> Kirim Jawabanku
            </span>
          )}
        </motion.button>
      </div>
      
      <AnimatePresence>
        {answerSubmitted && (
          <motion.div 
            className={`mt-6 py-4 px-6 rounded-lg text-center 
                      ${selectedAnswer === correctAnswer 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {selectedAnswer === correctAnswer ? (
              <div className="flex flex-col items-center">
                <CheckCircleIcon className="h-10 w-10 text-green-500 mb-2" />
                <p className="font-semibold text-sm md:text-base">Benar! Jawabannya adalah {correctAnswer}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <XCircleIcon className="h-10 w-10 text-red-500 mb-2" />
                <p className="font-semibold text-sm md:text-base">Salah! Jawaban yang benar adalah {correctAnswer}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default QuestionCard;
