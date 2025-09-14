import React, { useState, useEffect, useCallback } from 'react';
import QuestionCard from './QuestionCard';
import Scoreboard from './Scoreboard';
import MaterialSelection from './MaterialSelection';
import NameInput from './NameInput';
import FinalScore from './FinalScore';
import RewardPage from './RewardPage';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import './Quiz.css';

// Sample materials data
const materialsData = [
  {
    id: 1,
    title: "Benda Sehari-hari",
    description: "Kuis tentang berbagai benda yang kita gunakan sehari-hari",
    isActive: true,
    icon: "📝",
    questions: [
      {
        question: "Benda apa yang digunakan untuk menulis dan memiliki tinta di dalamnya?",
        choices: ["Pensil", "Pulpen", "Penghapus", "Penggaris"],
        correctAnswer: "Pulpen"
      },
      {
        question: "Benda elektronik yang digunakan untuk menelepon dan mengakses internet?",
        choices: ["Televisi", "Radio", "Smartphone", "Mesin Cuci"],
        correctAnswer: "Smartphone"
      },
      {
        question: "Alat yang digunakan untuk melihat benda-benda yang sangat kecil?",
        choices: ["Teropong", "Kacamata", "Mikroskop", "Teleskop"],
        correctAnswer: "Mikroskop"
      },
      {
        question: "Benda yang digunakan untuk mengukur berat suatu objek?",
        choices: ["Penggaris", "Jam", "Termometer", "Timbangan"],
        correctAnswer: "Timbangan"
      },
      {
        question: "Alat transportasi yang memiliki dua roda dan dikayuh dengan kaki?",
        choices: ["Mobil", "Sepeda", "Bus", "Kereta Api"],
        correctAnswer: "Sepeda"
      }
    ]
  },
  {
    id: 2,
    title: "Hewan & Tumbuhan",
    description: "Kuis tentang berbagai jenis hewan dan tumbuhan di dunia",
    isActive: true,
    icon: "🐾",
    questions: [
      {
        question: "Hewan apa yang memiliki leher paling panjang?",
        choices: ["Jerapah", "Unta", "Kuda", "Gajah"],
        correctAnswer: "Jerapah"
      },
      {
        question: "Burung apa yang tidak bisa terbang?",
        choices: ["Merpati", "Elang", "Pinguin", "Kolibri"],
        correctAnswer: "Pinguin"
      },
      {
        question: "Tumbuhan apa yang bisa hidup di gurun?",
        choices: ["Anggrek", "Kaktus", "Bunga Matahari", "Teratai"],
        correctAnswer: "Kaktus"
      },
      {
        question: "Hewan apa yang bisa berubah warna kulitnya?",
        choices: ["Kadal", "Ular", "Bunglon", "Tokek"],
        correctAnswer: "Bunglon"
      },
      {
        question: "Tumbuhan apa yang memakan serangga?",
        choices: ["Mawar", "Kantong Semar", "Melati", "Anggrek"],
        correctAnswer: "Kantong Semar"
      }
    ]
  },
  {
    id: 3,
    title: "Transportasi",
    description: "Kuis tentang berbagai jenis kendaraan dan transportasi",
    isActive: true,
    icon: "🚗",
    questions: [
      {
        question: "Kendaraan apa yang melaju di rel?",
        choices: ["Mobil", "Pesawat", "Kereta Api", "Kapal"],
        correctAnswer: "Kereta Api"
      },
      {
        question: "Alat transportasi apa yang bergerak di udara?",
        choices: ["Kapal Selam", "Pesawat", "Jet Ski", "Mobil"],
        correctAnswer: "Pesawat"
      },
      {
        question: "Kendaraan apa yang biasa digunakan di laut?",
        choices: ["Kereta", "Sepeda", "Bus", "Kapal"],
        correctAnswer: "Kapal"
      },
      {
        question: "Alat transportasi tradisional Indonesia yang ditarik oleh kuda?",
        choices: ["Becak", "Delman", "Bajaj", "Sepeda"],
        correctAnswer: "Delman"
      },
      {
        question: "Kendaraan umum yang biasa digunakan untuk mengangkut banyak penumpang di jalan raya?",
        choices: ["Sepeda Motor", "Bus", "Sepeda", "Mobil"],
        correctAnswer: "Bus"
      }
    ]
  },
  {
    id: 4,
    title: "Luar Angkasa",
    description: "Kuis tentang planet dan benda-benda luar angkasa",
    isActive: false,
    icon: "🚀",
    questions: []
  }
];

function Quiz() {
  const [materials] = useState(materialsData);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false); // Start as false until quiz begins
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [greeting, setGreeting] = useState('Selamat Datang');
  const [userScores, setUserScores] = useState([]);
  const [rewardEligible, setRewardEligible] = useState(false);
  const [showRewardPage, setShowRewardPage] = useState(false);

  const handleNextQuestion = useCallback((wasAnswered) => {
    const nextIndex = currentQuestionIndex + 1;
    
    if (nextIndex < questions.length) {
      // Move to next question and reset timer
      setCurrentQuestionIndex(nextIndex);
      setTimeLeft(30);
      setTimerActive(true);
    } else {
      setQuizFinished(true);
      
      // Calculate score percentage to determine reward eligibility
      const scorePercentage = (score + (wasAnswered ? 1 : 0)) / questions.length * 100;
      setRewardEligible(scorePercentage >= 70); // 70% or higher gets a reward
      
      // Save score to localStorage
      const finalScore = score + (wasAnswered ? 1 : 0);
      const newScoreEntry = {
        id: Date.now(),
        materialId: selectedMaterial.id,
        materialTitle: selectedMaterial.title,
        score: finalScore,
        totalQuestions: questions.length,
        date: new Date().toISOString(),
        percentScore: Math.round(finalScore / questions.length * 100)
      };
      
      const updatedScores = [...userScores, newScoreEntry];
      setUserScores(updatedScores);
      
      // Save to localStorage
      localStorage.setItem(`scores_${userId}`, JSON.stringify(updatedScores));
    }
  }, [currentQuestionIndex, questions.length, score, userScores, selectedMaterial, userId]);
  
  // Function to get time-based greeting
  const getTimeBasedGreeting = () => {
    const currentHour = new Date().getHours();
    
    if (currentHour >= 5 && currentHour < 11) {
      return 'Selamat Pagi';
    } else if (currentHour >= 11 && currentHour < 15) {
      return 'Selamat Siang';
    } else if (currentHour >= 15 && currentHour < 19) {
      return 'Selamat Sore';
    } else {
      return 'Selamat Malam';
    }
  };
  
  // Check for saved user name when component mounts and set greeting
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
      setNameSubmitted(true);
    }
    
    // Set the greeting based on time of day
    setGreeting(getTimeBasedGreeting());
    
    // Update the greeting every hour
    const interval = setInterval(() => {
      setGreeting(getTimeBasedGreeting());
    }, 60 * 60 * 1000); // Every hour
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0 && !quizFinished) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !quizFinished) {
      handleNextQuestion(false);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive, quizFinished, handleNextQuestion]);

  const handleAnswer = (isCorrect) => {
    setTimerActive(false);
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // Move to next question after a short delay
    setTimeout(() => {
      handleNextQuestion(true);
    }, 2000);
  };

  const resetQuiz = () => {
    // Go back to material selection
    setSelectedMaterial(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setTimeLeft(30);
    setTimerActive(false);
    setRewardEligible(false);
  };
  
  const handleMaterialSelect = (material) => {
    // Shuffle questions for the selected material
    const shuffledQuestions = [...material.questions].sort(() => Math.random() - 0.5);
    setSelectedMaterial(material);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setTimeLeft(30);
    setTimerActive(true);
  };
  
  const handleNameSubmit = (name) => {
    let id = localStorage.getItem('userId');
    
    // If no user ID exists, create one and store it
    if (!id) {
      id = uuidv4();
      localStorage.setItem('userId', id);
    }
    
    setUserId(id);
    setUserName(name);
    localStorage.setItem('userName', name);
    setNameSubmitted(true);
    
    // Load previous scores for this user
    const storedScores = JSON.parse(localStorage.getItem(`scores_${id}`)) || [];
    setUserScores(storedScores);
  };

  // Check for saved username and ID in localStorage on component mount
  useEffect(() => {
    const savedName = localStorage.getItem('userName');
    const savedId = localStorage.getItem('userId');
    
    if (savedName && savedId) {
      setUserName(savedName);
      setUserId(savedId);
      setNameSubmitted(true);
      
      // Load previous scores
      const storedScores = JSON.parse(localStorage.getItem(`scores_${savedId}`)) || [];
      setUserScores(storedScores);
    }
  }, []);

  return (
    <div className="py-4 sm:py-6 md:py-10 px-2 sm:px-4">
      {!nameSubmitted ? (
        // Show NameInput component if name hasn't been submitted yet
        <NameInput onSubmitName={handleNameSubmit} />
      ) : showRewardPage ? (
        // Show Reward Page
        <RewardPage
          playerName={userName}
          userId={userId}
          onBack={() => setShowRewardPage(false)}
        />
      ) : !selectedMaterial ? (
        // Material selection phase
        <MaterialSelection 
          materials={materials} 
          onSelectMaterial={handleMaterialSelect}
          userName={userName}
          greeting={greeting}
          onShowRewards={() => setShowRewardPage(true)}
        />
      ) : !quizFinished ? (
        // Quiz phase
        <div className="max-w-6xl mx-auto px-1 sm:px-4">
          <div className="flex flex-row items-center justify-between mb-3 sm:mb-6 max-w-4xl mx-auto gap-1.5 sm:gap-4">
            <motion.button 
              className="flex items-center justify-center gap-1 sm:gap-1.5 text-primary-600 hover:text-primary-800 transition-colors px-2 sm:px-3 py-1.5 sm:py-2 bg-white shadow-sm rounded-lg border border-primary-100"
              onClick={resetQuiz}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-xs sm:text-sm md:text-base">Kembali</span>
            </motion.button>
            
            <motion.div 
              className="flex-1 text-center px-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="bg-gradient-to-r from-primary-50 to-accent-50 shadow-md rounded-xl px-2 sm:px-4 py-1.5 sm:py-2.5 border-2 border-accent-200 inline-block max-w-full"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <span className="text-lg sm:text-xl md:text-2xl">{selectedMaterial.icon}</span>
                  <h2 className="text-md sm:text-lg md:text-xl font-heading font-bold text-primary-800 truncate max-w-[180px] sm:max-w-xs">
                    {selectedMaterial.title}
                  </h2>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="flex justify-end mb-2 sm:mb-3 max-w-4xl mx-auto">
            <motion.div 
              className="flex items-center gap-1.5 sm:gap-2 bg-white px-2.5 sm:px-4 py-1 sm:py-2 rounded-lg shadow-sm border border-accent-100"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="font-medium text-gray-700 text-xs sm:text-sm">Waktu: </span>
              <span className={`font-bold text-xs sm:text-sm ${timeLeft <= 5 ? "text-red-600 animate-pulse" : "text-primary-700"}`}>
                {timeLeft} detik
              </span>
            </motion.div>
          </div>
          
          <Scoreboard 
            score={score}
            totalQuestions={questions.length}
            currentQuestion={currentQuestionIndex + 1}
          />
          
          <QuestionCard
            key={currentQuestionIndex}
            question={questions[currentQuestionIndex].question}
            choices={questions[currentQuestionIndex].choices}
            correctAnswer={questions[currentQuestionIndex].correctAnswer}
            onAnswer={handleAnswer}
          />
        </div>
      ) : (
        // Quiz finished phase - Using our new FinalScore component
        <FinalScore 
          score={score} 
          totalQuestions={questions.length} 
          playerName={userName}
          userId={userId}
          isRewardEligible={rewardEligible}
          onRestart={() => {
            // Allow the user to choose: restart same material or go back to material selection
            const restartSameMaterial = window.confirm('Kamu ingin mencoba lagi materi yang sama?');
            if (restartSameMaterial) {
              handleMaterialSelect(selectedMaterial);
            } else {
              resetQuiz();
            }
          }} 
          onViewRewards={() => setShowRewardPage(true)}
        />
      )}
    </div>
  );
}

export default Quiz;
