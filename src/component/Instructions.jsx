import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaInfoCircle, FaCheckCircle } from "react-icons/fa";

const Instructions = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm transition-all"
        >
          <FaArrowLeft className="w-3 h-3 ml-1" />
          العودة الي الصفحه الرئيسية
        </button>
        <div className="bg-white/95 backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl p-6 rounded-lg mt-4">
          <div className="text-2xl text-center flex items-center justify-center gap-2 font-bold text-indigo-900">
            <FaInfoCircle className="w-6 h-6 text-blue-500 " />
            تعليمات المسابقة
          </div>

          <div className="space-y-6 mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-indigo-900">
                نظام النقاط للصلاة:
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <p className="flex items-center gap-2 transform transition-all duration-300 hover:translate-x-2">
                  <FaCheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-bold">30 نقطة:</span> الصلاة في المسجد
                  مع الجماعة
                </p>
                <p className="flex items-center gap-2 transform transition-all duration-300 hover:translate-x-2">
                  <FaCheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-bold">15 نقطة:</span> الصلاة في الوقت
                  (بدون جماعة)
                </p>
                <p className="flex items-center gap-2 transform transition-all duration-300 hover:translate-x-2">
                  <FaCheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-bold">10 نقاط:</span> الصلاة خارج الوقت
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-indigo-900">قواعد عامة:</h3>
              <ul className="list-disc list-inside space-y-2 pr-4">
                {[
                  "يجب تسجيل كل صلاة في وقتها",
                  "لا يمكن تعديل النقاط بعد تأكيد الصلاة",
                  "يتم تحديث قائمة المتصدرين يومياً",
                  "يجب الصدق في تسجيل المعلومات",
                ].map((rule, index) => (
                  <li
                    key={index}
                    className="transform transition-all duration-300 hover:translate-x-2"
                  >
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
