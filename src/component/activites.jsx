<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendar,
  FaTrophy,
  FaChartLine,
  FaPrayingHands,
  FaBook,
  FaMoon,
  FaSun,
  FaBolt,
} from "react-icons/fa";
=======
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendar, FaTrophy, FaStar, FaChartLine, FaPrayingHands, FaBook, FaMoon, FaSun, FaBolt } from 'react-icons/fa';
>>>>>>> e6121df72a5fae135241420b5c5d24ff24808346

const Index = () => {
  const [activitiesHistory, setActivitiesHistory] = useState([]);
  const [quetionHistory, setQuetionHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selecteQuetion, setQuetion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);

  // Fetch user activity history
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem("loggedInUser");
        if (storedUser) {
          // Check if the data is in the expected format
          const userData = JSON.parse(storedUser);
<<<<<<< HEAD
          setTotalPoints(userData.totalPoints);

=======
          setTotalPoints(userData.totalPoints)
          setQuetionHistory(userData.questions);
          
>>>>>>> e6121df72a5fae135241420b5c5d24ff24808346
          // Check if activities is an array
          if (userData.activities && Array.isArray(userData.activities)) {
            setActivitiesHistory(userData.activities);
            console.log(1);
            if (userData.activities.length > 0) {
              setSelectedDate(userData.activities[0].date);
            }
          } else if (userData.data) {
            // If the data is in the format you provided in your message
            // Convert single data object to an array format
            console.log(2);
            const formattedActivity = {
              date: userData.data.date,
              totalPoints: userData.data.totalPoints,
              prayers: {
                fajr: {
                  type: userData.data.fajr.type,
                  azkar: userData.data.fajr.azkar,
                  points: userData.data.fajr.points,
                },
                dhuhr: {
                  type: userData.data.dhuhr.type,
                  azkar: userData.data.dhuhr.azkar,
                  points: userData.data.dhuhr.points,
                },
                asr: {
                  type: userData.data.asr.type,
                  azkar: userData.data.asr.azkar,
                  points: userData.data.asr.points,
                },
                maghrib: {
                  type: userData.data.maghrib.type,
                  azkar: userData.data.maghrib.azkar,
                  points: userData.data.maghrib.points,
                },
                isha: {
                  type: userData.data.isha.type,
                  azkar: userData.data.isha.azkar,
                  points: userData.data.isha.points,
                },
              },
              quran: {
                pages: userData.data.quran.numOfPages,
                points: userData.data.quran.points,
              },
              duha: {
                rakaat: userData.data.duha.numOfPray,
                points: userData.data.duha.points,
              },
              taraweeh: {
                place: userData.data.taraweeh.type,
                rakaat: userData.data.taraweeh.numOfPray,
                witr: userData.data.taraweeh.witr,
                points: userData.data.taraweeh.points,
              },
              tahajjud: {
                rakaat: userData.data.tahajjud.numOfPray,
                points: userData.data.tahajjud.points,
              },
              adhkar: {
                morning: userData.data.adhkar.morning,
                evening: userData.data.adhkar.evening,
                general: userData.data.adhkar.general,
                points: userData.data.adhkar.points,
              },
              additional: {
                iftar: userData.data.extra.iftar,
                visitPatient: userData.data.extra.visitPatient,
                charity: userData.data.extra.charity,
                funeral: userData.data.extra.funeral,
                prayFor: userData.data.extra.prayFor,
                points: userData.data.extra.points,
              },
              dailyQuestion: {
                answered: false,
                correct: false,
                points: 0,
              },
            };
            setActivitiesHistory([formattedActivity]);
            setSelectedDate(formattedActivity.date);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const getSelectedDateData = () => {
    return activitiesHistory.find((activity) => {
      if (!activity.date || !selectedDate) return false;

      const activityDate = new Date(activity.date);
      const selected = new Date(selectedDate);
      return (
        activityDate.toISOString().split("T")[0] ===
        selected.toISOString().split("T")[0]
      );
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 py-6 px-4 flex items-center justify-center">
        <div className="text-white text-2xl">جاري تحميل البيانات...</div>
      </div>
    );
  }

  if (activitiesHistory.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 py-6 px-4 flex items-center justify-center">
        <div className="text-white text-2xl">لا توجد بيانات متاحة.</div>
      </div>
    );
  }

  const selectedActivity = getSelectedDateData();
<<<<<<< HEAD
  console.log(selectedActivity);
=======
  console.log(selectedActivity)
  console.log(quetionHistory)
>>>>>>> e6121df72a5fae135241420b5c5d24ff24808346

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 py-6 px-4">
      <Link
        className="inline-flex mb-6 items-center text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm transition-all"
        to="/Quran_Compition/routinPage"
      >
        <FaArrowRight className="ml-1" />
        العودة إلى الصفحة الرئيسية
      </Link>

      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center mb-6 border-b pb-4">
          <FaChartLine className="text-indigo-600 w-12 h-12" />
          <h1 className="text-3xl font-bold text-center mt-2 text-indigo-900">
            سجل أنشطتي
          </h1>
        </div>

        <div dir="rtl">
          {/* Date selector */}
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex space-x-2 space-x-reverse">
              {activitiesHistory.map((activity, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(activity.date)}
                  className={`px-4 py-2 rounded-md flex items-center whitespace-nowrap ${
                    selectedDate === activity.date
                      ? "bg-indigo-600 text-white"
                      : "bg-indigo-100 text-indigo-800 hover:bg-indigo-200"
                  }`}
                >
                  <FaCalendar className="ml-2" />
                  {new Date(activity.date).toISOString().split("T")[0]}
                </button>
              ))}
            </div>
          </div>

          {selectedActivity && (
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaCalendar className="ml-2 w-6 h-6" />
                    <h2 className="text-xl font-bold">
                      {" "}
                      {
                        new Date(selectedActivity.date)
                          .toISOString()
                          .split("T")[0]
                      }
                    </h2>
                  </div>
                  <div className="flex items-center">
                    <FaTrophy className="ml-2 w-6 h-6 text-yellow-300" />
                    <span className="text-2xl font-bold">
                      {selectedActivity.totalPoints} نقطة
                    </span>
                  </div>
                </div>
              </div>

              {/* Prayers Section */}
              <div className="bg-indigo-50 p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                  <FaPrayingHands className="ml-2" />
                  الصلوات
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["fajr", "dhuhr", "asr", "maghrib", "isha"].some(
                    (prayer) => selectedActivity[prayer]
                  ) &&
                    ["fajr", "dhuhr", "asr", "maghrib", "isha"].map(
                      (prayer) => {
                        const data = selectedActivity[prayer];
                        return data ? (
                          <div
                            key={prayer}
                            className="bg-white p-3 rounded border border-indigo-100"
                          >
                            <div className="flex justify-between items-center">
                              <h3 className="font-bold text-indigo-700">
                                صلاة{" "}
                                {prayer === "fajr"
                                  ? "الفجر"
                                  : prayer === "dhuhr"
                                  ? "الظهر"
                                  : prayer === "asr"
                                  ? "العصر"
                                  : prayer === "maghrib"
                                  ? "المغرب"
                                  : "العشاء"}
                              </h3>
                              <span className="font-bold text-indigo-600">
                                {data.points} نقطة
                              </span>
                            </div>
                            <div className="mt-2 text-gray-600 text-sm">
                              <div>النوع: {data.type}</div>
                              <div>
                                الأذكار: {data.azkar ? "تمت ✓" : "لم تتم ✗"}
                              </div>
                            </div>
                          </div>
                        ) : null;
                      }
                    )}
                </div>
              </div>

              {/* Quran Section */}
              <div className="bg-green-50 p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <FaBook className="ml-2" />
                  القرآن الكريم
                </h2>
                <div className="bg-white p-3 rounded border border-green-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-green-700">قراءة القرآن</h3>
                    <span className="font-bold text-green-600">
                      {selectedActivity.quran?.points} نقطة
                    </span>
                  </div>
                  <div className="mt-2 text-gray-600">
                    عدد الصفحات: {selectedActivity.quran?.numOfPages} صفحة
                  </div>
                </div>
              </div>

              {/* Rawatib Section */}
              {selectedActivity.rawatib && (
  <div className="bg-indigo-50 p-4 rounded-lg shadow">
    <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
      <FaPrayingHands className="ml-2" />
      سنن الرواتب
    </h2>
    <div className="bg-white p-3 rounded border border-indigo-100">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-indigo-700">إجمالي سنن الرواتب</h3>
        <span className="font-bold text-indigo-600">{selectedActivity.rawatib.points} نقطة</span>
      </div>
      <div className="mt-2 text-gray-600 text-sm">
        <div>عدد الركعات: {selectedActivity.rawatib.numOfPray}</div>
      </div>
    </div>
  </div>
)}


              {/* Duha Section */}
              <div className="bg-amber-50 p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
                  <FaSun className="ml-2" />
                  صلاة الضحى
                </h2>
                <div className="bg-white p-3 rounded border border-amber-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-amber-700">صلاة الضحى</h3>
                    <span className="font-bold text-amber-600">
                      {selectedActivity.duha?.points} نقطة
                    </span>
                  </div>
                  <div className="mt-2 text-gray-600">
                    عدد الركعات: {selectedActivity.duha?.numOfPray} ركعة
                  </div>
                </div>
              </div>

              {/* Taraweeh Section */}
              <div className="bg-indigo-50 p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                  <FaMoon className="ml-2" />
                  صلاة التراويح
                </h2>
                <div className="bg-white p-3 rounded border border-indigo-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-indigo-700">صلاة التراويح</h3>
                    <span className="font-bold text-indigo-600">
                      {selectedActivity.taraweeh?.points} نقطة
                    </span>
                  </div>
                  <div className="mt-2 text-gray-600">
                    <div>المكان: {selectedActivity.taraweeh?.type}</div>
                    <div>
                      عدد الركعات: {selectedActivity.taraweeh?.numOfPray} ركعة
                    </div>
                    <div>
                      صلاة الوتر:{" "}
                      {selectedActivity.taraweeh?.witr ? "تمت ✓" : "لم تتم ✗"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tahajjud Section */}
              <div className="bg-purple-50 p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                  <FaMoon className="ml-2" />
                  صلاة التهجد
                </h2>
                <div className="bg-white p-3 rounded border border-purple-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-purple-700">صلاة التهجد</h3>
                    <span className="font-bold text-purple-600">
                      {selectedActivity.tahajjud?.points} نقطة
                    </span>
                  </div>
                  <div className="mt-2 text-gray-600">
                    عدد الركعات: {selectedActivity.tahajjud?.numOfPray} ركعة
                  </div>
                </div>
              </div>

              {/* Adhkar Section */}
              <div className="bg-teal-50 p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold text-teal-800 mb-4 flex items-center">
                  <FaBolt className="ml-2" />
                  الأذكار
                </h2>
                <div className="bg-white p-3 rounded border border-teal-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-teal-700">الأذكار</h3>
                    <span className="font-bold text-teal-600">
                      {selectedActivity.adhkar?.points} نقطة
                    </span>
                  </div>
                  <div className="mt-2 text-gray-600">
                    <div>
                      أذكار الصباح:{" "}
                      {selectedActivity.adhkar?.morning ? "تمت ✓" : "لم تتم ✗"}
                    </div>
                    <div>
                      أذكار المساء:{" "}
                      {selectedActivity.adhkar?.evening ? "تمت ✓" : "لم تتم ✗"}
                    </div>
                    <div>
                      الذكر العام: {selectedActivity.adhkar?.general} مرة
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Activities Section */}
              <div className="bg-blue-50 p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                  <FaCalendar className="ml-2" />
                  أنشطة إضافية
                </h2>
                <div className="bg-white p-3 rounded border border-blue-100">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-blue-700">أنشطة إضافية</h3>
                    <span className="font-bold text-blue-600">
                      {selectedActivity.extra?.points} نقطة
                    </span>
                  </div>
                  <div className="mt-2 text-gray-600">
                    <div>إفطار: {selectedActivity.extra?.iftar} شخص</div>
                    <div>
                      عيادة مريض:{" "}
                      {selectedActivity.extra?.visitPatient
                        ? "تمت ✓"
                        : "لم تتم ✗"}
                    </div>
                    <div>
                      الصدقة:{" "}
                      {selectedActivity.extra?.charity ? "تمت ✓" : "لم تتم ✗"}
                    </div>
                    <div>
                      شهادة جنازة:{" "}
                      {selectedActivity.extra?.funeral ? "تمت ✓" : "لم تتم ✗"}
                    </div>
                    <div>
                      الدعاء بظهر الغيب:{" "}
                      {selectedActivity.extra?.prayFor ? "تم ✓" : "لم يتم ✗"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Daily Question Section - optional section that might not exist in your data */}
<<<<<<< HEAD
              {selectedActivity.dailyQuestion && (
                <div className="bg-yellow-50 p-4 rounded-lg shadow">
                  <h2 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                    <FaCalendar className="ml-2" />
                    السؤال اليومي
                  </h2>
                  <div className="bg-white p-3 rounded border border-yellow-100">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-yellow-700">
                        السؤال اليومي
                      </h3>
                      <span className="font-bold text-yellow-600">
                        {selectedActivity.dailyQuestion.points} نقطة
                      </span>
                    </div>
                    <div className="mt-2 text-gray-600">
                      <div>
                        تمت الإجابة:{" "}
                        {selectedActivity.dailyQuestion.answered
                          ? "نعم ✓"
                          : "لا ✗"}
                      </div>
                      {selectedActivity.dailyQuestion.answered && (
                        <div>
                          الإجابة:{" "}
                          {selectedActivity.dailyQuestion.correct
                            ? "صحيحة ✓"
                            : "خاطئة ✗"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
=======
              {quetionHistory?.length > 0 && selectedDate && (
  <div className="bg-indigo-50 p-4 rounded-lg shadow">
    <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
      <FaBook className="ml-2" />
      الأسئلة اليومية - {new Date(selectedDate).toLocaleDateString()}
    </h2>

    {quetionHistory
      .filter(q => new Date(q.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString())
      .map((q, index) => (
        <div key={index} className="bg-white p-3 rounded-md shadow-md mb-2">
          <p className="font-bold text-indigo-700">السؤال: {q.question}</p>
          <p className="text-gray-800">الإجابة: {q.answer}</p>
          <p className="text-sm text-gray-500">التاريخ: {new Date(q.date).toLocaleDateString()}</p>
          <p className="text-sm font-semibold text-indigo-600 flex items-center">
            <FaStar className="ml-1 text-yellow-500" />
            النقاط: {q.points}
          </p>
        </div>
      ))
    }

    {quetionHistory.filter(q => new Date(q.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()).length === 0 && (
      <p className="text-gray-600">لا توجد أسئلة لهذا التاريخ.</p>
    )}
  </div>
)}


>>>>>>> e6121df72a5fae135241420b5c5d24ff24808346
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
