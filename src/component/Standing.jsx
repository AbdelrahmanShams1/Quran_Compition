import { FaTrophy } from 'react-icons/fa';
import { FaCrown } from "react-icons/fa"; // استيراد التاج من FontAwesome

const leaderboard = [
  { name: "أحمد محمد", points: 2500, rank: 1 },
  { name: "سارة أحمد", points: 2350, rank: 2 },
  { name: "عمر خالد", points: 2200, rank: 3 },
  { name: "نور علي", points: 2100, rank: 4 },
  { name: "نور علي", points: 2100, rank: 4 },
  { name: "نور علي", points: 2100, rank: 4 },
  { name: "نور علي", points: 2100, rank: 4 },
  { name: "ياسين محمود", points: 2000, rank: 5 },
  { name: "نور علي", points: 2100, rank: 4 },
  { name: "ياسين محمود", points: 2000, rank: 5 },
];

const Standing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
  
      <div className="text-2xl text-center flex items-center justify-center gap-2 font-bold text-indigo-700">
      <FaTrophy className="w-6 h-6 text-yellow-500" />
        المتصدرون
      </div>
      
      <div className="space-y-4 mt-4">
        {leaderboard.map((player) => (
          <div 
            key={player.rank}
            className="flex items-center justify-between p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-all shadow"
          >
            <div className="flex items-center gap-4">
              {player.rank === 1 && <FaCrown className="w-6 h-6 text-yellow-500" />}
              <span className="font-bold text-lg">{player.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-indigo-600">{player.points} نقطة</span>
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-full">#{player.rank}</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    </div>
  );
};

export default Standing;
