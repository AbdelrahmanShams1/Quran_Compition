import { useState, useRef , useEffect } from "react";
import {
  FaCalendar,
  FaMoon,
  FaSave,
  FaBookOpen,
  FaSun,
  FaCheckCircle,
  FaInfoCircle,
  FaBolt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const dateRef = useRef();
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
  const tahagodRed=useRef();
  const morningAdhkarRef=useRef();
  const eveningAdhkarRef=useRef();
  const generalAdhkarRef=useRef();
  const questionRef = useRef();
  const sheikhRef = useRef();
  const iftarRef = useRef();
  const visitPatientRef = useRef();
  const charityRef = useRef();
  const funeralRef = useRef();
  const prayForRef = useRef();
  const [userGender, setUserGender] = useState("");

  const [activitiesPoints, setActivitiesPoints] = useState({
    data: {
      date: "",
      fajr: { type: "", azkar: false, points: 0 },
      dhuhr: { type: "", azkar: false, points: 0 },
      asr: { type: "", azkar: false, points: 0 },
      maghrib: { type: "", azkar: false, points: 0 },
      isha: { type: "", azkar: false, points: 0 },
      quran: { numOfPages: 0, points: 0 },
      duha: { numOfPray: 0, points: 0 },
      taraweeh: { type: "", numOfPray: 0, witr: false, points: 0 },
      tahajjud: { numOfPray: 0, points: 0 },
      adhkar: { 
        morning: false, 
        evening: false, 
        general: 0, 
        points: 0 
      }, // تمت إضافة الأذكار
      extra: {
        question: false,
        sheikh: false,
        iftar: 0,
        visitPatient: false,
        charity: false,
        funeral: false,
        prayFor: false,
        points: 0,
      },
      totalPoints: 0,
    },
  });
  
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserGender(parsedUser.type); 
    }
  }, []);
  
  function handleSaveData() {
    const todayDate = new Date().toISOString();
    const data = {
      date: todayDate,
      fajr: {
        type: fajrRef.current.value,
        azkar: fajrAzkarRef.current.checked,
        points: +fajrRef.current.value + (fajrAzkarRef.current.checked ? 50 : 0),
      },
      dhuhr: {
        type: dhuhrRef.current.value,
        azkar: dhuhrAzkarRef.current.checked,
        points: +dhuhrRef.current.value + (dhuhrAzkarRef.current.checked ? 50 : 0),
      },
      asr: {
        type: asrRef.current.value,
        azkar: asrAzkarRef.current.checked,
        points: +asrRef.current.value + (asrAzkarRef.current.checked ? 50 : 0),
      },
      maghrib: {
        type: maghribRef.current.value,
        azkar: maghribAzkarRef.current.checked,
        points: +maghribRef.current.value + (maghribAzkarRef.current.checked ? 50 : 0),
      },
      isha: {
        type: ishaRef.current.value,
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
        type: taraweehPlaceRef.current.value,
        numOfPray: +taraweehRakaatRef.current.value,
        witr: witrRef.current.checked,
        points: (+taraweehRakaatRef.current.value * (taraweehPlaceRef.current.value ? +taraweehPlaceRef.current.value : 0)) +
          (witrRef.current.checked ? 80 : 0),
      },
      tahajjud: {
        numOfPray: +tahagodRed.current.value,
        points: +tahagodRed.current.value * 70,
      },
      adhkar: {
        morning: morningAdhkarRef.current.checked,
        evening: eveningAdhkarRef.current.checked,
        general: +generalAdhkarRef.current.value,
        points: 
          (morningAdhkarRef.current.checked ? 200 : 0) +
          (eveningAdhkarRef.current.checked ? 200 : 0) +
          (+generalAdhkarRef.current.value / 1000) * 200,
      },
      extra: {
        question: questionRef.current.checked,
        sheikh: sheikhRef.current.checked,
        iftar: +iftarRef.current.value,
        visitPatient: visitPatientRef.current.checked,
        charity: charityRef.current.checked,
        funeral: funeralRef.current.checked,
        prayFor: prayForRef.current.checked,
        points: (questionRef.current.checked ? 300 : 0) +
          (sheikhRef.current.checked ? 100 : 0) +
          (+iftarRef.current.value * 100) +
          (visitPatientRef.current.checked ? 200 : 0) +
          (charityRef.current.checked ? 100 : 0) +
          (funeralRef.current.checked ? 200 : 0) +
          (prayForRef.current.checked ? 200 : 0),
      },
    };
    
    
    data.totalPoints =
      data.fajr.points +
      data.dhuhr.points +
      data.asr.points +
      data.maghrib.points +
      data.isha.points +
      data.quran.points +
      data.duha.points +
      data.taraweeh.points +
      data.extra.points +
       data.tahajjud.points +
       data.adhkar.points;
    
    setActivitiesPoints({ data });
    console.log(data);
  }
  const prayers = [
    { id: "fajr", value: "الفجر", salahRef: fajrRef, azkarRef: fajrAzkarRef },
    {
      id: "dhuhr",
      value: "الظهر",
      salahRef: dhuhrRef,
      azkarRef: dhuhrAzkarRef,
    },
    { id: "asr", value: "العصر", salahRef: asrRef, azkarRef: asrAzkarRef },
    {
      id: "maghrib",
      value: "المغرب",
      salahRef: maghribRef,
      azkarRef: maghribAzkarRef,
    },
    { id: "isha", value: "العشاء", salahRef: ishaRef, azkarRef: ishaAzkarRef },
  ];
  console.log(visitPatientRef.current?.checked);
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 py-6 px-4">
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center mb-6 border-b pb-4">
          <FaMoon className="text-yellow-400 w-12 h-12" />
          <h1 className="text-3xl font-bold text-center mt-2 text-indigo-900">
            تسجيل نقاط مسابقة رمضان
          </h1>
        </div>

        <div className="space-y-8" dir="rtl">
        <div>
  <Link
    to={"/Quran_Compition/instraction"}
    className="col-span-2 text-center bg-gradient-to-b from-purple-600 to-indigo-900 hover:from-purple-700 hover:to-indigo-800 text-white py-3 px-2 rounded-md font-bold text-lg flex items-center justify-center"
  >
    <FaInfoCircle className="ml-2" />
    التعليمات والشروط
  </Link>
</div>
        

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
    <option value={1000}>جماعة في المسجد (1000 نقطة)</option>
    <option value={700}>حاضر (700 نقطة)</option>
    <option value={300}>تأخير (300 نقطة)</option>
    <option value={100}>قضاء (100 نقطة)</option>
  </select>
) : (
  <select
    ref={prayer.salahRef}
    className="w-full px-4 py-2 border border-gray-300 rounded-md"
  >
    <option value={900}>في الوقت (900 نقطة)</option>
    <option value={300}>متأخر (300 نقطة)</option>
    <option value={100}>قضاء (100 نقطة)</option>
    <option value={900}>عذر قهري (900 نقطة)</option>
    <option value={1000}>جماعة (بونص) (1000 نقطة)</option>
  </select>
)}

                      
                    </div>
                    <div className="flex items-center bg-indigo-50 p-3 rounded-md">
                      <input
                        ref={prayer.azkarRef}
                        type="checkbox"
                        className="ml-2 h-5 w-5 text-indigo-600 outline-none "
                      />
                      <label className="text-gray-700">
                        أذكار الصلاة (50 نقطة)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
              <FaBookOpen className="ml-2" />
              القرآن الكريم
            </h2>
            <div>
              <label className="block text-gray-700 mb-2">
                عدد الصفحات (30 نقطة لكل صفحة):
              </label>
              <input
                ref={quranRef}
                type="number"
                min="0"
                className=" outline-none w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="bg-amber-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
              <FaSun className="ml-2" />
              صلاة الضحى
            </h2>
            <div>
              <label className="block text-gray-700 mb-2">
                عدد الركعات (50 نقطة لكل ركعة):
              </label>
              <input
                ref={duhaRef}
                type="number"
                min="0"
                max="8"
                className=" outline-none w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
              <FaMoon className="ml-2" />
              صلاة التراويح
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">مكان الصلاة:</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none "
                  ref={taraweehPlaceRef}
                >
                  <option value={60}>في المسجد (60 نقطة لكل ركعة)</option>
                  <option value={50}>في البيت (50 نقطة لكل ركعة)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">عدد الركعات:</label>
                <input
                  ref={taraweehRakaatRef}
                  type="number"
                  min="0"
                 
                  className=" outline-none w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="ml-2 h-5 w-5 outline-none "
                  ref={witrRef}
                />
                <label className="text-gray-700">صلاة الوتر (80 نقطة)</label>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
              <FaMoon className="ml-2" />
              صلاة التهجد
            </h2>
            <div>
              <label className="block text-gray-700 mb-2">عدد الركعات (70 نقطة لكل ركعة):</label>
              <input
                type="number"
                min="0"
               
               ref={tahagodRed}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="bg-teal-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-teal-800 mb-4 flex items-center">
              <FaBolt className="ml-2" />
              الأذكار
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="morningAdhkar"
                     ref={morningAdhkarRef}
                  className="ml-2 h-5 w-5"
                />
                <label htmlFor="morningAdhkar" className="text-gray-700">أذكار الصباح (200 نقطة)</label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="eveningAdhkar"
                  ref={eveningAdhkarRef}
                  className="ml-2 h-5 w-5"
                />
                <label htmlFor="eveningAdhkar" className="text-gray-700">أذكار المساء (200 نقطة)</label>
              </div>
              
              
              
              <div>
                <label className="block text-gray-700 mb-2">عدد مرات الذكر العام (200 نقطة لكل 1000 مرة):</label>
                <input
                  type="number"
                  min="0"
                  step="100"
                  ref={generalAdhkarRef}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
              <FaCalendar className="ml-2" />
              أنشطة إضافية
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="ml-2 h-5 w-5 outline-none "
                  ref={questionRef}
                />
                <label className="text-gray-700">
                  السؤال اليومي (300 نقطة)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="ml-2 h-5 w-5 outline-none "
                  ref={sheikhRef}
                />
                <label className="text-gray-700">
                  تقييم الشيخ الأسبوعي (100 نقطة)
                </label>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  عدد الأشخاص الذين تم إفطارهم (100 نقطة لكل شخص):
                </label>
                <input
                  ref={iftarRef}
                  type="number"
                  min="0"
                  className=" outline-none w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                <span className="text-sm text-red-500 block mt-1">
                  * من غير الأسرة الرئيسية{" "}
                </span>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="ml-2 h-5 w-5 outline-none "
                  ref={visitPatientRef}
                />
                <label className="text-gray-700">عيادة مريض (200 نقطة)</label>
                <span className="text-sm text-red-500 block mr-6">
                  * من غير الأسرة الرئيسية{" "}
                </span>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="ml-2 h-5 w-5 outline-none "
                  ref={charityRef}
                />
                <label className="text-gray-700">تصدقت اليوم (100 نقطة)</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="ml-2 h-5 w-5 outline-none "
                  ref={funeralRef}
                />
                <label className="text-gray-700">شهادة جنازة (200 نقطة)</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="ml-2 h-5 w-5 outline-none "
                  ref={prayForRef}
                />
                <label className="text-gray-700">
                  الدعاء بظهر الغيب بالخير (200 نقطة)
                </label>
                <span className="text-sm text-gray-500 block mr-6">
                  * ادعُ للقائمين على التطبيق بالزواج العاجل بست الكل الزوجة
                  الصالحة 💍
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                مجموع النقاط اليومي:
              </h2>
              <span className="text-2xl font-bold text-indigo-600">
                {activitiesPoints.data.totalPoints}
              </span>
            </div>

            <button
              onClick={handleSaveData}
              className=" outline-none w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md font-bold text-lg flex items-center justify-center"
            >
              <FaSave className="ml-2" />
              حفظ النقاط
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
