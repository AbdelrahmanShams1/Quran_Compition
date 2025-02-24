import { FaTrophy, FaCrown } from "react-icons/fa"; 
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Standing = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => {
          console.log(doc.data());
          return {
            id: doc.id, 
            name: doc.data().name,
            totalPoints: doc.data().totalPoints,
          };
        });

        const sortedUsers = usersData
          .sort((a, b) => b.totalPoints - a.totalPoints)
          .map((user, index) => ({
            ...user,
            rank: index + 1,
          }));

        setLeaderboard(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

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
              key={player.id} // ✅ استخدام مفتاح فريد لتجنب المشاكل
              className="flex items-center justify-between p-4 rounded-lg bg-white/50 hover:bg-white/80 transition-all shadow"
            >
              <div className="flex items-center gap-4">
                {player.rank === 1 && <FaCrown className="w-6 h-6 text-yellow-500" />}
                <span className="font-bold text-lg">{player.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-lg font-bold text-indigo-600">{player.totalPoints} نقطة</span>
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
