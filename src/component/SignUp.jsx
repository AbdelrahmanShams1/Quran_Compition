import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FaStar, FaUserPlus } from "react-icons/fa";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(""); // نوع المستخدم
  const [age, setAge] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const newUser = { name, email, password, type, age, activities: [] };
    const userRef = doc(db, "users", email);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      alert("البريد الإلكتروني مسجل مسبقاً. يرجى استخدام بريد آخر.");
      return;
    }

    try {
      await setDoc(userRef, newUser);
      alert("تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.");
      navigate("/Quran_Compition");
    } catch (error) {
      console.error("Error saving user to Firestore:", error.message);
      alert("حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <div className="flex flex-col items-center mb-6">
          <FaStar className="text-yellow-400 w-16 h-16" />
          <h1 className="text-2xl font-bold text-center mt-4 text-indigo-900">
            انضم إلى مسابقة رمضان
          </h1>
        </div>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-right"
            placeholder="الاسم الكامل"
            dir="rtl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* قائمة منسدلة لاختيار النوع */}
          <select
            className="w-full  px-4 py-2 border border-gray-300 rounded-md text-right "
            dir="rtl"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option  value="" disabled>اختر النوع</option>
            <option value="ذكر">ذكر</option>
            <option value="أنثى">أنثى</option>
          </select>

          <input
            type="number"
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-right"
            placeholder="العمر"
            dir="rtl"
            value={age} // إصلاح القيمة
            onChange={(e) => setAge(e.target.value)}
            required
          />

          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-right"
            type="text"
            placeholder="البريد الإلكتروني"
            dir="rtl"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md text-right"
            type="password"
            placeholder="كلمة المرور"
            dir="rtl"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md flex items-center justify-center"
          >
            <FaUserPlus className="ml-2 w-4 h-4" />
            إنشاء حساب
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
