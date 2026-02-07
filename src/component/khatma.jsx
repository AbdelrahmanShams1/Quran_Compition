import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaQuran, FaPlay, FaPause } from "react-icons/fa";
import khatmahData from "../ad3ya.json";

const Khatmah = () => {
  const navigate = useNavigate();
  const data = khatmahData.ad3ya;

  // State to track which supplication is expanded
  const [expandedId, setExpandedId] = useState(null);

  // State to track if audio is playing
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to toggle expansion of supplication
  const toggleExpansion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Function to toggle audio play/pause
  const toggleAudio = () => {
    const audio = document.getElementById("khatmah-audio");

    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle audio end
  const handleAudioEnd = () => {
    setIsPlaying(false);
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

        {/* Audio player section */}
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg mt-4 text-center">
          <p className="text-xl text-indigo-800 font-bold mb-4">
            لمن لا يستطيع القراءة فليستمع
          </p>

          <div className="flex justify-center">
            <div className="bg-purple-50 p-3 rounded-lg shadow-md flex flex-col items-center">
              <button
                onClick={toggleAudio}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-all"
              >
                <FaQuran className="w-4 h-4" />
                <span>
                  {isPlaying ? "إيقاف دعاء الختمة" : "استماع لدعاء الختمة"}
                </span>
                {isPlaying ? (
                  <FaPause className="w-3 h-3" />
                ) : (
                  <FaPlay className="w-3 h-3" />
                )}
              </button>
              <audio
                id="khatmah-audio"
                className="mt-2 w-full"
                onEnded={handleAudioEnd}
              >
                <source
                  src="/Quran_Compition/audio/khatmaDo3a.mp3"
                  type="audio/mpeg"
                />
                متصفحك لا يدعم تشغيل الصوت
              </audio>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl p-6 rounded-lg mt-4">
          <div className="text-2xl text-center flex items-center justify-center gap-2 font-bold text-purple-900">
            <FaQuran className="w-6 h-6 text-indigo-600 me-2" />
            دعاء ختمة القرآن الكريم
          </div>

          <div className="space-y-6 mt-6">
            {data.map((dua) => {
              const isExpanded = expandedId === dua.id;

              return (
                <div
                  key={dua.id}
                  className={`${
                    isExpanded ? "bg-purple-50" : "bg-blue-50"
                  } p-4 rounded-lg space-y-2 shadow-md transition-all duration-300`}
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleExpansion(dua.id)}
                  >
                    <h3 className="text-lg font-semibold text-indigo-800">
                      {dua.title}
                    </h3>
                    <span
                      className={`text-indigo-700 transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </div>

                  {isExpanded &&
                    dua.items.map((item, index) => (
                      <div
                        key={index}
                        className="bg-white/80 p-3 rounded-md shadow-sm"
                      >
                        <p className="text-right text-gray-800">{item}</p>
                      </div>
                    ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Khatmah;
