import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase"; // استيراد إعداد Firebase

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [azkarCount, setAzkarCount] = useState("");
  const [prayerCount, setPrayerCount] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // جلب البيانات من Firebase
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };
    fetchUsers();
  }, []);

  // دالة لإضافة النشاط إلى Firebase
  const handleAddActivity = async (e) => {
    e.preventDefault();

    if (!selectedUser || !azkarCount || !prayerCount || !date) {
      alert("يرجى ملء جميع الحقول.");
      return;
    }

    // البحث عن المستخدم المحدد في الـ users
    const userIndex = users.findIndex(user => user.id === selectedUser);

    if (userIndex === -1) {
      alert("المستخدم غير موجود.");
      return;
    }

    // إضافة النشاط إلى Firebase
    const newActivity = {
      date,
      azkarCount: parseInt(azkarCount),
      prayerCount: parseInt(prayerCount),
    };

    // تحديث بيانات المستخدم في Firebase
    const userRef = doc(db, "users", selectedUser); // استخدم doc لتحديد المستند بناءً على ID المستخدم

    try {
      // تحديث الأنشطة الموجودة بدلاً من إضافتها
      await updateDoc(userRef, {
        activities: [...users[userIndex].activities, newActivity],
      });

      alert("تم إضافة النشاط بنجاح!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">الأنشطة</h1>

      {/* نموذج إضافة النشاط */}
      <form onSubmit={handleAddActivity} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-700">اختر المستخدم:</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">اختر مستخدم</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">عدد الأذكار:</label>
          <input
            type="number"
            value={azkarCount}
            onChange={(e) => setAzkarCount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">عدد الصلوات:</label>
          <input
            type="number"
            value={prayerCount}
            onChange={(e) => setPrayerCount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">التاريخ:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          إضافة النشاط
        </button>
      </form>

      {/* عرض الأنشطة */}
      {users.length === 0 ? (
        <p>لا توجد بيانات لعرضها.</p>
      ) : (
        users.map((user) => (
          <div key={user.id} className="user-activities bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-600">البريد الإلكتروني: {user.email}</p>
            <div className="activities mt-4">
              {user.activities.length > 0 ? (
                user.activities.map((activity, index) => (
                  <div key={index} className="activity-item border-b py-2">
                    <p className="font-medium text-gray-700">التاريخ: {activity.date}</p>
                    <p className="text-gray-600">عدد الأذكار: {activity.azkarCount}</p>
                    <p className="text-gray-600">عدد الصلوات: {activity.prayerCount}</p>
                  </div>
                ))
              ) : (
                <p>لا توجد أنشطة لعرضها.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
