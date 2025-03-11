import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  FaCalendar,
  FaMoon,
  FaSave,
  FaBookOpen,
  FaSun,
  FaCheckCircle,
  FaInfoCircle,
  FaBolt,
  FaQuestionCircle,
  FaArrowLeft,
  FaPray,
  FaUser,
  FaEdit,
  FaTrash
} from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, updateDoc, getDoc, collection, getDocs, deleteField } from "firebase/firestore";

const AdminDataEditor = () => {
  const navigate = useNavigate();
  // Form refs
  const fajrRef = useRef();
  const fajrAzkarRef = useRef();
  const dhuhrRef = useRef();
  const dhuhrAzkarRef = useRef();
  const asrRef = useRef();
  const asrAzkarRef = useRef();
  const maghribRef = useRef();
  const maghribAzkarRef = useRef();
  const ishaRef = useRef();
  const ishaAzkarRef = useRef();
  const quranRef = useRef();
  const duhaRef = useRef();
  const taraweehRakaatRef = useRef();
  const taraweehPlaceRef = useRef();
  const witrRef = useRef();
  const tahagodRed = useRef();
  const rawatibPrayersRef = useRef();
  const morningAdhkarRef = useRef();
  const eveningAdhkarRef = useRef();
  const generalAdhkarRef = useRef();
  const iftarRef = useRef();
  const visitPatientRef = useRef();
  const charityRef = useRef();
  const funeralRef = useRef();
  const prayForRef = useRef();
  
  // Admin states
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [newDate, setNewDate] = useState("");
  const [users, setUsers] = useState([]);
  const [userDates, setUserDates] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userGender, setUserGender] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const userSnapshot = await getDocs(usersCollection);
        const usersList = userSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setMessage({ text: "خطأ في جلب بيانات المستخدمين", type: "error" });
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Fetch user dates when a user is selected
  useEffect(() => {
    if (selectedUser) {
      const fetchUserDates = async () => {
        setLoading(true);
        try {
          const userRef = doc(db, "users", selectedUser);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserGender(userData.type || "male");
            
            // Get all dates for this user
            if (userData.activities) {
              const dates = Object.keys(userData.activities);
              setUserDates(dates);
            } else {
              setUserDates([]);
            }
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user dates:", error);
          setMessage({ text: "خطأ في جلب تواريخ النشاط", type: "error" });
          setLoading(false);
        }
      };

      fetchUserDates();
    }
  }, [selectedUser]);

  // Fetch user activity data when date is selected
  useEffect(() => {
    if (selectedUser && selectedDate) {
      const fetchUserActivityData = async () => {
        setLoading(true);
        try {
          const userRef = doc(db, "users", selectedUser);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            if (userData.activities && userData.activities[selectedDate]) {
              setUserData(userData.activities[selectedDate]);
              setNewDate(selectedDate);
              
              // Reset form values with the loaded data
              setTimeout(() => {
                fillFormWithData(userData.activities[selectedDate]);
              }, 100);
            } else {
              setUserData(null);
              setMessage({ text: "لم يتم العثور على بيانات لهذا التاريخ", type: "warning" });
            }
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user activity data:", error);
          setMessage({ text: "خطأ في جلب بيانات النشاط", type: "error" });
          setLoading(false);
        }
      };

      fetchUserActivityData();
    }
  }, [selectedUser, selectedDate]);

  // Fill form with loaded data
  const fillFormWithData = (data) => {
    if (!data) return;
    
    // Fill prayer data
    if (fajrRef.current) fajrRef.current.value = data.fajr?.points - (data.fajr?.azkar ? 50 : 0) || 0;
    if (fajrAzkarRef.current) fajrAzkarRef.current.checked = data.fajr?.azkar || false;
    
    if (dhuhrRef.current) dhuhrRef.current.value = data.dhuhr?.points - (data.dhuhr?.azkar ? 50 : 0) || 0;
    if (dhuhrAzkarRef.current) dhuhrAzkarRef.current.checked = data.dhuhr?.azkar || false;
    
    if (asrRef.current) asrRef.current.value = data.asr?.points - (data.asr?.azkar ? 50 : 0) || 0;
    if (asrAzkarRef.current) asrAzkarRef.current.checked = data.asr?.azkar || false;
    
    if (maghribRef.current) maghribRef.current.value = data.maghrib?.points - (data.maghrib?.azkar ? 50 : 0) || 0;
    if (maghribAzkarRef.current) maghribAzkarRef.current.checked = data.maghrib?.azkar || false;
    
    if (ishaRef.current) ishaRef.current.value = data.isha?.points - (data.isha?.azkar ? 50 : 0) || 0;
    if (ishaAzkarRef.current) ishaAzkarRef.current.checked = data.isha?.azkar || false;
    
    // Fill other activities
    if (quranRef.current) quranRef.current.value = data.quran?.numOfPages || 0;
    if (duhaRef.current) duhaRef.current.value = data.duha?.numOfPray || 0;
    if (taraweehRakaatRef.current) taraweehRakaatRef.current.value = data.taraweeh?.numOfPray || 0;
    
    if (taraweehPlaceRef.current) {
      taraweehPlaceRef.current.value = data.taraweeh?.type === "في المسجد " ? 60 : 50;
    }
    
    if (witrRef.current) witrRef.current.checked = data.taraweeh?.witr || false;
    if (tahagodRed.current) tahagodRed.current.value = data.tahajjud?.numOfPray || 0;
    if (rawatibPrayersRef.current) rawatibPrayersRef.current.value = data.rawatib?.numOfPray || 0;
    
    // Fill adhkar
    if (morningAdhkarRef.current) morningAdhkarRef.current.checked = data.adhkar?.morning || false;
    if (eveningAdhkarRef.current) eveningAdhkarRef.current.checked = data.adhkar?.evening || false;
    if (generalAdhkarRef.current) generalAdhkarRef.current.value = data.adhkar?.general || 0;
    
    // Fill extra activities
    if (iftarRef.current) iftarRef.current.value = data.extra?.iftar || 0;
    if (visitPatientRef.current) visitPatientRef.current.checked = data.extra?.visitPatient || false;
    if (charityRef.current) charityRef.current.checked = data.extra?.charity || false;
    if (funeralRef.current) funeralRef.current.checked = data.extra?.funeral || false;
    if (prayForRef.current) prayForRef.current.checked = data.extra?.prayFor || false;
  };

  // Handle save data
  const handleSaveData = async () => {
    if (!selectedUser || !selectedDate) {
      setMessage({ text: "يرجى اختيار مستخدم وتاريخ", type: "error" });
      return;
    }
    
    setLoading(true);
    
    try {
      const data = {
        date: new Date(selectedDate),
        fajr: {
            type: fajrRef.current.value == 1000 ? "في المسجد"
                : fajrRef.current.value == 900 && userGender == "female" ? "عذر قهري "
                : fajrRef.current.value == 910 ? "في الوقت"
                : fajrRef.current.value == 700 ? "حاضر"
                : fajrRef.current.value == 300 ? "تأخير "
                : fajrRef.current.value == 100 ? "قضاء " : "لم يحدد",
            azkar: fajrAzkarRef.current.checked,
            points: +fajrRef.current.value + (fajrAzkarRef.current.checked ? 50 : 0),
        },
        dhuhr: {
            type: dhuhrRef.current.value == 1000 ? "في المسجد"
                : dhuhrRef.current.value == 900 && userGender == "female" ? "عذر قهري "
                : dhuhrRef.current.value == 910 ? "في الوقت"
                : dhuhrRef.current.value == 700 ? "حاضر"
                : dhuhrRef.current.value == 300 ? "تأخير "
                : dhuhrRef.current.value == 100 ? "قضاء " : "لم يحدد",
            azkar: dhuhrAzkarRef.current.checked,
            points: +dhuhrRef.current.value + (dhuhrAzkarRef.current.checked ? 50 : 0),
        },
        asr: {
            type: asrRef.current.value == 1000 ? "في المسجد"
                : asrRef.current.value == 900 && userGender == "female" ? "عذر قهري "
                : asrRef.current.value == 910 ? "في الوقت"
                : asrRef.current.value == 700 ? "حاضر"
                : asrRef.current.value == 300 ? "تأخير "
                : asrRef.current.value == 100 ? "قضاء " : "لم يحدد",
            azkar: asrAzkarRef.current.checked,
            points: +asrRef.current.value + (asrAzkarRef.current.checked ? 50 : 0),
        },
        maghrib: {
            type: maghribRef.current.value == 1000 ? "في المسجد"
                : maghribRef.current.value == 900 && userGender == "female" ? "عذر قهري "
                : maghribRef.current.value == 910 ? "في الوقت"
                : maghribRef.current.value == 700 ? "حاضر"
                : maghribRef.current.value == 300 ? "تأخير "
                : maghribRef.current.value == 100 ? "قضاء " : "لم يحدد",
            azkar: maghribAzkarRef.current.checked,
            points: +maghribRef.current.value + (maghribAzkarRef.current.checked ? 50 : 0),
        },
        isha: {
            type: ishaRef.current.value == 1000 ? "في المسجد"
                : ishaRef.current.value == 900 && userGender == "female" ? "عذر قهري "
                : ishaRef.current.value == 910 ? "في الوقت"
                : ishaRef.current.value == 700 ? "حاضر"
                : ishaRef.current.value == 300 ? "تأخير "
                : ishaRef.current.value == 100 ? "قضاء " : "لم يحدد",
            azkar: ishaAzkarRef.current.checked,
            points: +ishaRef.current.value + (ishaAzkarRef.current.checked ? 50 : 0),
        },
        quran: {
            numOfPages: +quranRef.current.value,
            points: +quranRef.current.value * 30,
        },
        duha: {
            numOfPray: +duhaRef.current.value,
            points: +duhaRef.current.value * 50,
        },
        taraweeh: {
            type: taraweehPlaceRef.current.value == 60 ? "في المسجد " : "في البيت ",
            numOfPray: +taraweehRakaatRef.current.value,
            witr: witrRef.current.checked,
            points: +taraweehRakaatRef.current.value * (+taraweehPlaceRef.current.value) + (witrRef.current.checked ? 80 : 0),
        },
        tahajjud: {
            numOfPray: +tahagodRed.current.value,
            points: +tahagodRed.current.value * 70,
        },
        rawatib: {
            numOfPray: +rawatibPrayersRef.current.value,
            points: +rawatibPrayersRef.current.value * 50,
        },
        adhkar: {
            morning: morningAdhkarRef.current.checked,
            evening: eveningAdhkarRef.current.checked,
            general: +generalAdhkarRef.current.value,
            points: (morningAdhkarRef.current.checked ? 200 : 0) +
                (eveningAdhkarRef.current.checked ? 200 : 0) +
                (+generalAdhkarRef.current.value / 1000) * 200,
        },
        questionData: userData?.questionData || {
          question: "",
          answer: "",
          points: 0, 
          date: "", 
        },
        try: userData?.try !== undefined ? userData.try : 0,
        extra: {
            iftar: +iftarRef.current.value,
            visitPatient: visitPatientRef.current.checked,
            charity: charityRef.current.checked,
            funeral: funeralRef.current.checked,
            prayFor: prayForRef.current.checked,
            points: +iftarRef.current.value * 100 +
                (visitPatientRef.current.checked ? 200 : 0) +
                (charityRef.current.checked ? 100 : 0) +
                (funeralRef.current.checked ? 200 : 0) +
                (prayForRef.current.checked ? 200 : 0),
        },
      };

      // Calculate total points for this day
      const newDailyPoints = data.fajr.points + data.dhuhr.points + data.asr.points +
          data.maghrib.points + data.isha.points + data.quran.points +
          data.duha.points + data.taraweeh.points + data.tahajjud.points +
          data.rawatib.points + data.adhkar.points + data.extra.points;

      data.totalPointsPerDay = newDailyPoints;
      
      const userRef = doc(db, "users", selectedUser);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const oldTotalPoints = userData.totalPoints || 0;
        const oldDailyPoints = userData.activities[selectedDate]?.totalPointsPerDay || 0;
        
        // Calculate new total points
        const newTotalPoints = oldTotalPoints - oldDailyPoints + newDailyPoints;
        
        // 1. Are we updating the same date or moving to a new date?
        if (selectedDate === newDate) {
          // Just update the existing date
          await updateDoc(userRef, {
            [`activities.${selectedDate}`]: data,
            totalPoints: newTotalPoints,
            lastRecord: newDailyPoints
          });
          
          setMessage({ text: "تم تحديث البيانات بنجاح", type: "success" });
        } else {
          // Moving to a new date - we need to:
          // 1. Add the data to the new date
          // 2. Delete the old date
          await updateDoc(userRef, {
            [`activities.${newDate}`]: data,
            [`activities.${selectedDate}`]: deleteField(),
            totalPoints: newTotalPoints,
            lastRecord: newDailyPoints
          });
          
          // Refresh the user dates
          const updatedUserDoc = await getDoc(userRef);
          if (updatedUserDoc.exists()) {
            const updatedUserData = updatedUserDoc.data();
            if (updatedUserData.activities) {
              setUserDates(Object.keys(updatedUserData.activities));
            }
          }
          
          setSelectedDate(newDate);
          setMessage({ text: "تم تغيير التاريخ وتحديث البيانات بنجاح", type: "success" });
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error saving data:", error);
      setMessage({ text: "خطأ في حفظ البيانات", type: "error" });
      setLoading(false);
    }
  };

  // Handle delete activity
  const handleDeleteActivity = async () => {
    if (!selectedUser || !selectedDate) {
      setMessage({ text: "يرجى اختيار مستخدم وتاريخ", type: "error" });
      return;
    }
    
    if (!confirm("هل أنت متأكد من حذف نشاط هذا اليوم؟ لا يمكن التراجع عن هذا الإجراء.")) {
      return;
    }
    
    setLoading(true);
    
    try {
      const userRef = doc(db, "users", selectedUser);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const oldTotalPoints = userData.totalPoints || 0;
        const oldDailyPoints = userData.activities[selectedDate]?.totalPointsPerDay || 0;
        
        // Calculate new total points
        const newTotalPoints = oldTotalPoints - oldDailyPoints;
        
        // Delete the activity and update total points
        await updateDoc(userRef, {
          [`activities.${selectedDate}`]: deleteField(),
          totalPoints: newTotalPoints,
          lastRecord: userData.lastRecord === oldDailyPoints ? 0 : userData.lastRecord
        });
        
        // Refresh the user dates
        const updatedUserDoc = await getDoc(userRef);
        if (updatedUserDoc.exists()) {
          const updatedUserData = updatedUserDoc.data();
          if (updatedUserData.activities) {
            setUserDates(Object.keys(updatedUserData.activities));
          } else {
            setUserDates([]);
          }
        }
        
        setSelectedDate("");
        setUserData(null);
        setMessage({ text: "تم حذف النشاط بنجاح", type: "success" });
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error deleting activity:", error);
      setMessage({ text: "خطأ في حذف النشاط", type: "error" });
      setLoading(false);
    }
  };

  // Prayers array for mapping
  const prayers = [
    { id: "fajr", value: "الفجر", salahRef: fajrRef, azkarRef: fajrAzkarRef },
    { id: "dhuhr", value: "الظهر", salahRef: dhuhrRef, azkarRef: dhuhrAzkarRef },
    { id: "asr", value: "العصر", salahRef: asrRef, azkarRef: asrAzkarRef },
    { id: "maghrib", value: "المغرب", salahRef: maghribRef, azkarRef: maghribAzkarRef },
    { id: "isha", value: "العشاء", salahRef: ishaRef, azkarRef: ishaAzkarRef },
  ];
  
  // Format user display name
  const getUserDisplayName = (userId) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      return `${user.name || userId} (${user.type === 'female' ? 'أنثى' : 'ذكر'})`;
    }
    return userId;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 py-6 px-4">
      <Link
        className="inline-flex mb-1.5 items-center text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm transition-all"
        to={"/Quran_Compition/routinPage"}
      >
        العودة إلى الصفحة الرئيسية
      </Link>
      
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center mb-6 border-b pb-4">
          <FaEdit className="text-yellow-400 w-12 h-12" />
          <h1 className="text-3xl font-bold text-center mt-2 text-indigo-900">
            إدارة بيانات المستخدمين
          </h1>
        </div>

        {/* Status Message */}
        {message.text && (
          <div className={`mb-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : message.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        {/* Admin Selection Controls */}
        <div className="space-y-4 mb-8 bg-gray-50 p-4 rounded-lg" dir="rtl">
          <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
            <FaUser className="ml-2" />
            اختيار المستخدم والتاريخ
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* User Selection */}
            <div>
              <label className="block text-gray-700 mb-2">اختر المستخدم:</label>
              <select
                value={selectedUser}
                onChange={(e) => {
                  setSelectedUser(e.target.value);
                  setSelectedDate("");
                  setUserData(null);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">-- اختر مستخدم --</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name || user.id} ({user.type === 'female' ? 'أنثى' : 'ذكر'})
                  </option>
                ))}
              </select>
            </div>
            
            {/* Date Selection */}
            <div>
              <label className="block text-gray-700 mb-2">اختر التاريخ:</label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                disabled={!selectedUser || userDates.length === 0}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              >
                <option value="">-- اختر تاريخ --</option>
                {userDates.map(date => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {selectedDate && (
            <div>
              <label className="block text-gray-700 mb-2">تغيير التاريخ (اختياري):</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              <p className="text-sm text-gray-500 mt-1">
                إذا كنت تريد نقل البيانات إلى تاريخ آخر، قم بتغيير التاريخ هنا.
              </p>
            </div>
          )}
          
          <div className="bg-yellow-50 p-4 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>المستخدم الحالي:</strong> {selectedUser ? getUserDisplayName(selectedUser) : "لم يتم الاختيار"}
              <br />
              <strong>التاريخ المحدد:</strong> {selectedDate || "لم يتم الاختيار"}
              {selectedDate && newDate && selectedDate !== newDate && (
                <span className="block mt-1">
                  <strong>سيتم نقل البيانات إلى:</strong> {newDate}
                </span>
              )}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-700 mx-auto"></div>
            <p className="mt-3 text-indigo-700">جاري تحميل البيانات...</p>
          </div>
        ) : (
          <>
            {userData && (
              <div className="space-y-8" dir="rtl">
                {/* Points Summary */}
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h2 className="text-xl font-bold text-indigo-800 mb-2">
                    ملخص النقاط
                  </h2>
                  <p>
                    <strong>إجمالي نقاط اليوم:</strong> {userData.totalPointsPerDay || 0}
                  </p>
                </div>
              
                {/* Prayers Section */}
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                    <FaCheckCircle className="ml-2" />
                    الصلوات
                  </h2>

                  {prayers.map((prayer, index) => (
                    <div
                      key={prayer.id}
                      className="mb-6 border-b pb-4 last:border-b-0"
                    >
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <h3 className="text-lg font-bold text-indigo-700 mb-3 flex items-center">
                          <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center ml-2 text-indigo-600">
                            {index + 1}
                          </span>
                          صلاة {prayer.value}
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-700 mb-2">
                              نوع الصلاة:
                            </label>
                            {userGender === "male" ? (
                              <select
                                ref={prayer.salahRef}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                              >
                                <option value={0}>لم يتم الصلاه (0 نقطة)</option>
                                <option value={1000}>
                                  جماعة في المسجد (1000 نقطة)
                                </option>
                                <option value={700}>حاضر (700 نقطة)</option>
                                <option value={300}>تأخير (300 نقطة)</option>
                                <option value={100}>قضاء (100 نقطة)</option>
                              </select>
                            ) : (
                              <select
                                ref={prayer.salahRef}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                              >
                                <option value={0}>لم يتم الصلاه (0 نقطة)</option>
                                <option value={1000}>
                                  جماعة في المسجد (1000 نقطة)
                                </option>
                                <option value={910}>في الوقت (910 نقطة)</option>
                                <option value={300}>متأخر (300 نقطة)</option>
                                <option value={100}>قضاء (100 نقطة)</option>
                                <option value={900}>عذر قهري (900 نقطة)</option>
                              
                                <option value={300}>متأخر (300 نقطة)</option>
                                <option value={100}>قضاء (100 نقطة)</option>
                              </select>
                            )}
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              ref={prayer.azkarRef}
                              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label className="mr-2 text-gray-700">
                              أذكار بعد الصلاة (50 نقطة)
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quran Section */}
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                    <FaBookOpen className="ml-2" />
                    القرآن الكريم
                  </h2>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        عدد الصفحات (30 نقطة لكل صفحة):
                      </label>
                      <input
                        type="number"
                        min="0"
                        ref={quranRef}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Voluntary Prayers Section */}
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                    <FaPray className="ml-2" />
                    صلوات النوافل
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Duha Prayer */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-bold text-indigo-700 mb-3">
                        صلاة الضحى (50 نقطة لكل ركعة)
                      </h3>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          عدد الركعات:
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="12"
                          ref={duhaRef}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    {/* Taraweeh Prayer */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-bold text-indigo-700 mb-3">
                        صلاة التراويح
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 mb-2">
                            عدد الركعات:
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="20"
                            ref={taraweehRakaatRef}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-2">
                            مكان الصلاة:
                          </label>
                          <select
                            ref={taraweehPlaceRef}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                          >
                            <option value={60}>في المسجد (60 نقطة لكل ركعة)</option>
                            <option value={50}>في البيت (50 نقطة لكل ركعة)</option>
                          </select>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            ref={witrRef}
                            className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label className="mr-2 text-gray-700">
                            صلاة الوتر (80 نقطة)
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Tahajjud Prayer */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-bold text-indigo-700 mb-3">
                        صلاة التهجد (70 نقطة لكل ركعة)
                      </h3>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          عدد الركعات:
                        </label>
                        <input
                          type="number"
                          min="0"
                          ref={tahagodRed}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    {/* Rawatib Prayers */}
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h3 className="text-lg font-bold text-indigo-700 mb-3">
                        الرواتب (50 نقطة لكل ركعة)
                      </h3>
                      <div>
                        <label className="block text-gray-700 mb-2">
                          عدد الركعات:
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="12"
                          ref={rawatibPrayersRef}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Adhkar Section */}
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                    <FaBolt className="ml-2" />
                    الأذكار
                  </h2>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        ref={morningAdhkarRef}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label className="mr-2 text-gray-700">
                        أذكار الصباح (200 نقطة)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        ref={eveningAdhkarRef}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label className="mr-2 text-gray-700">
                        أذكار المساء (200 نقطة)
                      </label>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">
                        أذكار عامة (عدد):
                      </label>
                      <input
                        type="number"
                        min="0"
                        ref={generalAdhkarRef}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="عدد الأذكار (200 نقطة لكل 1000 ذكر)"
                      />
                    </div>
                  </div>
                </div>

                {/* Extra Activities Section */}
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                    <FaInfoCircle className="ml-2" />
                    أنشطة إضافية
                  </h2>
                  
                  <div className="bg-white rounded-lg p-4 shadow-sm space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        إفطار صائم (عدد الأشخاص):
                      </label>
                      <input
                        type="number"
                        min="0"
                        ref={iftarRef}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        placeholder="100 نقطة لكل شخص"
                      />
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        ref={visitPatientRef}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label className="mr-2 text-gray-700">
                        زيارة مريض (200 نقطة)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        ref={charityRef}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label className="mr-2 text-gray-700">
                        صدقة (100 نقطة)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        ref={funeralRef}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label className="mr-2 text-gray-700">
                        صلاة جنازة (200 نقطة)
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        ref={prayForRef}
                        className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label className="mr-2 text-gray-700">
                        الدعاء للآخرين (200 نقطة)
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveData}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-md flex items-center justify-center transition-all"
                    disabled={loading}
                  >
                    <FaSave className="ml-2" />
                    حفظ البيانات
                  </button>
                  
                  <button
                    onClick={handleDeleteActivity}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-md flex items-center justify-center transition-all"
                    disabled={loading}
                  >
                    <FaTrash className="ml-2" />
                    حذف النشاط
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDataEditor;