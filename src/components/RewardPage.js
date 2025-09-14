import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function RewardPage({ playerName, userId, onBack }) {
  const [userScores, setUserScores] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [rupiahValue, setRupiahValue] = useState(0);
  const [claimHistory, setClaimHistory] = useState([]);
  const [isClaimingReward, setIsClaimingReward] = useState(false);
  const [claimAmount, setClaimAmount] = useState(0);
  const [claimSuccess, setClaimSuccess] = useState(false);
  
  // Points to Rupiah conversion rate
  const POINTS_TO_RUPIAH_RATE = 100; // 1 point = 100 rupiah
  
  useEffect(() => {
    if (userId) {
      // Load user scores and claim history from localStorage
      const storedScores = JSON.parse(localStorage.getItem(`scores_${userId}`)) || [];
      const storedClaimHistory = JSON.parse(localStorage.getItem(`claims_${userId}`)) || [];
      
      setUserScores(storedScores);
      setClaimHistory(storedClaimHistory);
      
      // Calculate total points
      const totalEarnedPoints = storedScores.reduce((sum, score) => sum + score.score, 0);
      const totalClaimedPoints = storedClaimHistory.reduce((sum, claim) => sum + claim.pointsUsed, 0);
      const availablePoints = totalEarnedPoints - totalClaimedPoints;
      
      setTotalPoints(availablePoints);
      setRupiahValue(availablePoints * POINTS_TO_RUPIAH_RATE);
    }
  }, [userId]);

  const handleClaimReward = () => {
    if (!claimAmount || claimAmount <= 0) {
      alert("Silakan masukkan jumlah poin yang ingin ditukarkan");
      return;
    }
    
    if (claimAmount > totalPoints) {
      alert("Poin tidak cukup untuk ditukarkan");
      return;
    }
    
    // Create claim record
    const newClaim = {
      id: Date.now(),
      pointsUsed: claimAmount,
      rupiahValue: claimAmount * POINTS_TO_RUPIAH_RATE,
      claimDate: new Date().toISOString(),
      claimCode: `${userId.substring(0, 4).toUpperCase()}-${Date.now().toString(36).substring(4)}`
    };
    
    const updatedClaims = [...claimHistory, newClaim];
    
    // Update localStorage
    localStorage.setItem(`claims_${userId}`, JSON.stringify(updatedClaims));
    
    // Update state
    setClaimHistory(updatedClaims);
    setTotalPoints(totalPoints - claimAmount);
    setRupiahValue((totalPoints - claimAmount) * POINTS_TO_RUPIAH_RATE);
    
    // Show success message
    setClaimSuccess(true);
    setIsClaimingReward(false);
    setClaimAmount(0);
    
    setTimeout(() => {
      setClaimSuccess(false);
    }, 5000);
  };
  
  // Format number to Indonesian Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  return (
    <div className="py-4 md:py-8 px-3 md:px-4 max-w-4xl mx-auto">
      <div className="flex items-center mb-4 md:mb-6">
        <button 
          className="flex items-center gap-1 text-primary-600 hover:text-primary-800 transition-colors px-2 py-1"
          onClick={onBack}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          <span className="font-medium text-sm md:text-base">Kembali ke Halaman Utama</span>
        </button>
      </div>

      <motion.div
        className="bg-gradient-to-br from-primary-50 to-white rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-6 border-2 md:border-4 border-accent-300 mb-4 md:mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-row items-center justify-between mb-4 gap-3">
          <div className="flex items-center">
            <div className="bg-primary-100 p-2 md:p-3 rounded-full mr-2 md:mr-3">
              <span className="text-2xl md:text-3xl">🏆</span>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-primary-800">{playerName}</h2>
              <p className="text-xs md:text-sm text-gray-500">ID: {userId.substring(0, 8)}</p>
            </div>
          </div>
          <div className="flex flex-col items-end mt-2 sm:mt-0">
            <div className="flex items-center gap-2 bg-primary-100 px-3 md:px-4 py-1 md:py-2 rounded-full">
              <span className="text-lg md:text-xl">✨</span>
              <div>
                <p className="text-xs md:text-sm font-medium text-primary-700">Total Poin</p>
                <p className="text-lg md:text-xl font-bold text-primary-800">{totalPoints} poin</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100 mb-4 md:mb-6">
          <div className="flex flex-col md:flex-row gap-3 md:gap-6 justify-between items-center">
            <div>
              <p className="text-xs md:text-sm font-medium text-gray-500">Nilai Tukar Poin</p>
              <div className="flex items-end gap-1 md:gap-2">
                <p className="text-xl md:text-3xl font-bold text-primary-800">1 Poin</p>
                <p className="text-lg md:text-xl font-medium text-primary-600 pb-1">=</p>
                <p className="text-xl md:text-3xl font-bold text-green-600">Rp 100</p>
              </div>
              <p className="text-xs md:text-sm text-gray-600 mt-1">Poin kamu saat ini setara dengan {formatRupiah(rupiahValue)}</p>
            </div>
            
            {!isClaimingReward ? (
              <motion.button
                className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-full shadow hover:shadow-lg border-2 border-green-300 transition-all text-sm md:text-base w-full sm:w-auto mt-3 sm:mt-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsClaimingReward(true)}
                disabled={totalPoints < 1}
              >
                <span className="flex items-center justify-center gap-2">
                  <span className="text-lg md:text-xl">💰</span>
                  Tukarkan Poin
                </span>
              </motion.button>
            ) : (
              <div className="w-full bg-gray-50 p-3 md:p-4 rounded-xl border border-gray-200 mt-3 md:mt-0">
                <p className="font-medium text-gray-700 text-sm md:text-base mb-2">Berapa poin yang ingin ditukarkan?</p>
                <div className="flex flex-wrap gap-2">
                  <input
                    type="number"
                    className="border border-gray-300 rounded-lg px-2 md:px-3 py-1 md:py-2 w-20 md:w-24 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Poin"
                    value={claimAmount || ''}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value)) {
                        setClaimAmount(value);
                      } else {
                        setClaimAmount('');
                      }
                    }}
                    min={1}
                    max={totalPoints}
                    step={1}
                  />
                  <button
                    className="bg-green-600 text-white px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base font-medium hover:bg-green-700 transition-colors"
                    onClick={handleClaimReward}
                  >
                    Tukar
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-2 md:px-3 py-1 md:py-2 rounded-lg text-sm md:text-base font-medium hover:bg-gray-400 transition-colors"
                    onClick={() => setIsClaimingReward(false)}
                  >
                    Batal
                  </button>
                </div>
                {claimAmount ? (
                  <p className="text-sm text-gray-600 mt-2">
                    {claimAmount} poin = {formatRupiah(claimAmount * POINTS_TO_RUPIAH_RATE)}
                  </p>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {claimSuccess && (
          <motion.div
            className="bg-green-50 border-2 border-green-200 rounded-xl p-3 md:p-4 mb-4 md:mb-6 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <div className="flex justify-center mb-1 md:mb-2">
              <motion.span 
                className="text-3xl md:text-4xl"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ repeat: 2, duration: 0.5 }}
              >
                🎉
              </motion.span>
            </div>
            <h3 className="text-base md:text-lg font-bold text-green-800 mb-1">Penukaran Berhasil!</h3>
            <p className="text-sm md:text-base text-green-700">Tunjukkan kode penukaran pada petugas untuk mendapatkan hadiah.</p>
          </motion.div>
        )}

        <div className="mt-6 md:mt-8">
          <h3 className="text-lg md:text-xl font-bold text-primary-800 mb-3 md:mb-4 flex items-center gap-2">
            <span className="text-xl md:text-2xl">📊</span>
            Riwayat Poin
          </h3>

          <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Materi</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor</th>
                    <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poin</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userScores.length > 0 ? (
                    userScores.map((scoreEntry, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-800">{scoreEntry.materialTitle}</td>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-600">{scoreEntry.score}/{scoreEntry.totalQuestions}</td>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-primary-700">{scoreEntry.score} poin</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-3 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm text-gray-500">
                        Belum ada riwayat kuis
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {claimHistory.length > 0 && (
          <div className="mt-6 md:mt-8">
            <h3 className="text-lg md:text-xl font-bold text-primary-800 mb-3 md:mb-4 flex items-center gap-2">
              <span className="text-xl md:text-2xl">📝</span>
              Riwayat Penukaran
            </h3>

            <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                      <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poin Ditukar</th>
                      <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai (Rp)</th>
                      <th className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {claimHistory.map((claim, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-800">
                          {new Date(claim.claimDate).toLocaleDateString('id-ID')}
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-600">{claim.pointsUsed} poin</td>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-green-600">
                          {formatRupiah(claim.rupiahValue)}
                        </td>
                        <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-mono font-bold text-primary-700">
                          {claim.claimCode}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </motion.div>
      
      <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-3 md:p-4 text-amber-800">
        <div className="flex items-start gap-2 md:gap-3">
          <div className="text-xl md:text-2xl">💡</div>
          <div>
            <h4 className="font-bold text-base md:text-lg">Cara Menukar Poin</h4>
            <p className="mt-0.5 md:mt-1 text-xs md:text-sm font-medium">Setiap 1 poin setara dengan Rp 100</p>
            <ol className="mt-1 md:mt-2 list-decimal list-inside space-y-0.5 md:space-y-1 text-xs md:text-sm">
              <li>Klik tombol "Tukarkan Poin" di atas</li>
              <li>Masukkan jumlah poin yang ingin ditukarkan (minimum 1 poin)</li>
              <li>Catat kode penukaran yang muncul</li>
              <li>Tunjukkan kode penukaran kepada petugas untuk mendapatkan hadiah</li>
            </ol>
            <p className="mt-1 md:mt-2 text-xs md:text-sm italic">Contoh: 5 poin = Rp 500, 25 poin = Rp 2.500</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RewardPage;
