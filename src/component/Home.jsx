import { FaCalendar, FaMoon, FaSave, FaHistory, FaBookOpen, FaSun, FaCheckCircle, FaDollarSign, FaRunning } from 'react-icons/fa';


const Home = () => {
  
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
       
          <div className="grid  grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2 font-bold">التاريخ:</label>
              <input
                type="date"
                value="2024-02-19"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-bold">الجنس:</label>
              <div className="flex space-x-4 space-x-reverse">
                <div className="mx-2">
                  <input type="radio" id="male" name="gender" checked className="ml-1" />
                  <label htmlFor="male">ذكر</label>
                </div>
                <div className="mx-2">
                  <input type="radio" id="female" name="gender" className="ml-1" />
                  <label htmlFor="female">أنثى</label>
                </div>
              </div>
            </div>
          </div>
  
         
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
              <FaCheckCircle className="ml-2" />
              الصلوات
            </h2>
            
         
            {['الفجر', 'الظهر', 'العصر', 'المغرب', 'العشاء'].map((prayer, index) => (
              <div key={prayer} className="mb-6 border-b pb-4 last:border-b-0">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="text-lg font-bold text-indigo-700 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center ml-2 text-indigo-600">
                      {index + 1}
                    </span>
                    صلاة {prayer}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-700 mb-2">نوع الصلاة:</label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white">
                        <option>جماعة في المسجد (1000 نقطة)</option>
                        <option>حاضر (700 نقطة)</option>
                        <option>تأخير (300 نقطة)</option>
                        <option>قضاء (100 نقطة)</option>
                      </select>
                    </div>
                    <div className="flex items-center bg-indigo-50 p-3 rounded-md">
                      <input type="checkbox" className="ml-2 h-5 w-5 text-indigo-600" />
                      <label className="text-gray-700">أذكار الصلاة (50 نقطة)</label>
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
              <label className="block text-gray-700 mb-2">عدد الصفحات (30 نقطة لكل صفحة):</label>
              <input type="number" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
  
      
          <div className="bg-amber-50 p-4 rounded-lg">
            <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center">
              <FaSun className="ml-2" />
              صلاة الضحى
            </h2>
            <div>
              <label className="block text-gray-700 mb-2">عدد الركعات (50 نقطة لكل ركعة):</label>
              <input type="number" min="0" max="8" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
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
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                  <option>في المسجد (60 نقطة لكل ركعة)</option>
                  <option>في البيت (50 نقطة لكل ركعة)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">عدد الركعات:</label>
                <input type="number" min="0" max="20" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
              </div>
              <div className="flex items-center">
                <input type="checkbox" className="ml-2 h-5 w-5" />
                <label className="text-gray-700">صلاة الوتر (80 نقطة)</label>
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
                <input type="checkbox" className="ml-2 h-5 w-5" />
                <label className="text-gray-700">السؤال اليومي (300 نقطة)</label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" className="ml-2 h-5 w-5" />
                <label className="text-gray-700">تقييم الشيخ الأسبوعي (100 نقطة)</label>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">عدد الأشخاص الذين تم إفطارهم (100 نقطة لكل شخص):</label>
                <input type="number" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                <span className="text-sm text-red-500 block mt-1">* من غير الأسرة الرئيسية </span>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" className="ml-2 h-5 w-5" />
                <label className="text-gray-700">عيادة مريض (200 نقطة)</label>
                <span className="text-sm text-red-500 block mr-6">* من غير الأسرة الرئيسية </span>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" className="ml-2 h-5 w-5" />
                <label className="text-gray-700">تصدقت اليوم (100 نقطة)</label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" className="ml-2 h-5 w-5" />
                <label className="text-gray-700">شهادة جنازة (200 نقطة)</label>
              </div>
              
              <div className="flex items-center">
                <input type="checkbox" className="ml-2 h-5 w-5" />
                <label className="text-gray-700">الدعاء بظهر الغيب بالخير (200 نقطة)</label>
                <span className="text-sm text-gray-500 block mr-6">* ادعُ للقائمين على التطبيق بالزواج العاجل بست الكل الزوجة الصالحة 💍</span>
              </div>
            </div>
          </div>
  
          <div className="mt-8 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">مجموع النقاط اليومي:</h2>
              <span className="text-2xl font-bold text-indigo-600">2150</span>
            </div>
            
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md font-bold text-lg flex items-center justify-center">
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
