import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaInfoCircle, FaMoon, FaSun, FaPlay, FaPause } from "react-icons/fa";
import azkar from "../azkar.json";

const Azkar = () => {
  const navigate = useNavigate();
  const data = azkar;
  
  // State to track counts for each zekr
  const [counts, setCounts] = useState(
    data.map(zekr => ({ id: zekr.zekr, count: zekr.count }))
  );

  // State to track which audio is playing
  const [playingAudio, setPlayingAudio] = useState({
    morning: false,
    evening: false
  });

  // Function to decrease count
  const decreaseCount = (zekrId) => {
    setCounts(prevCounts => 
      prevCounts.map(item => 
        item.id === zekrId 
          ? { ...item, count: Math.max(0, item.count - 1) } 
          : item
      )
    );
  };

  // Function to get count for a specific zekr
  const getCount = (zekrId) => {
    const item = counts.find(item => item.id === zekrId);
    return item ? item.count : 0;
  };

  // Function to toggle audio play/pause
  const toggleAudio = (audioId, audioType) => {
    const audio = document.getElementById(audioId);
    
    if (audio) {
      if (playingAudio[audioType]) {
        // Pause the audio
        audio.pause();
      } else {
        // Pause any currently playing audio
        if (playingAudio.morning && audioType !== 'morning') {
          const morningAudio = document.getElementById('morning-audio');
          if (morningAudio) morningAudio.pause();
        }
        if (playingAudio.evening && audioType !== 'evening') {
          const eveningAudio = document.getElementById('evening-audio');
          if (eveningAudio) eveningAudio.pause();
        }
        
        // Play the selected audio
        audio.play();
      }
      
      // Update playing state
      setPlayingAudio(prev => ({
        morning: audioType === 'morning' ? !prev.morning : false,
        evening: audioType === 'evening' ? !prev.evening : false
      }));
    }
  };

  // Add event listeners for when audio ends
  const handleAudioEnd = (audioType) => {
    setPlayingAudio(prev => ({
      ...prev,
      [audioType]: false
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm transition-all"
        >
          <FaArrowLeft className="w-3 h-3 ml-1" />
          العودة إلى الصفحة الرئيسية
        </button>

        {/* Audio players section */}
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg mt-4 text-center">
          <p className="text-xl text-indigo-800 font-bold mb-4">
            لمن لا يستطيع القراءة فليستمع
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-yellow-50 p-3 rounded-lg shadow-md flex flex-col items-center">
              <button 
                onClick={() => toggleAudio('morning-audio', 'morning')}
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-all"
              >
                <FaSun className="w-4 h-4" />
                <span>
                  {playingAudio.morning ? 'إيقاف أذكار الصباح' : 'استماع لأذكار الصباح'}
                </span>
                {playingAudio.morning ? (
                  <FaPause className="w-3 h-3" />
                ) : (
                  <FaPlay className="w-3 h-3" />
                )}
              </button>
              <audio 
                id="morning-audio" 
                className="mt-2 w-full" 
                onEnded={() => handleAudioEnd('morning')}
              >
                <source src="/Quran_Compition/audio/h.mp3" type="audio/mpeg" />
                متصفحك لا يدعم تشغيل الصوت
              </audio>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg shadow-md flex flex-col items-center">
              <button 
                onClick={() => toggleAudio('evening-audio', 'evening')}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md transition-all"
              >
                <FaMoon className="w-4 h-4" />
                <span>
                  {playingAudio.evening ? 'إيقاف أذكار المساء' : 'استماع لأذكار المساء'}
                </span>
                {playingAudio.evening ? (
                  <FaPause className="w-3 h-3" />
                ) : (
                  <FaPlay className="w-3 h-3" />
                )}
              </button>
              <audio 
                id="evening-audio" 
                className="mt-2 w-full" 
                onEnded={() => handleAudioEnd('evening')}
              >
                <source src="/Quran_Compition/audio/h.mp3" type="audio/mpeg" />
                متصفحك لا يدعم تشغيل الصوت
              </audio>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl p-6 rounded-lg mt-4">
          <div className="text-2xl text-center flex items-center justify-center gap-2 font-bold text-green-900">
            <FaSun className="w-6 h-6 text-yellow-500 me-2" />
            أذكار الصباح والمساء
            <FaMoon className="w-6 h-6 text-blue-500 ms-2" />
          </div>

          <div className="space-y-6 mt-6">
            {data.map((zekr) => {
              const currentCount = getCount(zekr.zekr);
              const isCompleted = currentCount === 0;
              
              return (
                <div
                  key={zekr.zekr}
                  className={`${
                    isCompleted ? 'bg-green-50' : 'bg-blue-50'
                  } p-4 rounded-lg space-y-2 shadow-md transition-all duration-300`}
                >
                  <p className="text-lg/loose p-4 pb-8 border-b text-green-700 border-b-indigo-500">{`"${zekr.zekr}"`}</p>
                  <div className="text-lg/loose p-4 flex items-center justify-between">
                    <span className="font-semibold">عدد مرات التكرار :</span>
                    <button
                      onClick={() => decreaseCount(zekr.zekr)}
                      className={`text-white text-xl font-semibold size-10 flex items-center justify-center ms-2 rounded-full transition-all ${
                        isCompleted 
                          ? 'bg-green-600 hover:bg-green-700' 
                          : 'bg-indigo-700 hover:bg-indigo-800'
                      } cursor-pointer`}
                    >
                      {currentCount}
                    </button>
                  </div>
                  {isCompleted && (
                    <div className="text-green-600 font-semibold text-center p-2">
                      تم الانتهاء من هذا الذكر
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Azkar;