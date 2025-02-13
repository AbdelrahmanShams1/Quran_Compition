import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; 
import { doc, getDoc, setDoc } from "firebase/firestore"; 

const SignUp = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();



  const handleSignUp = async (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      email: email,
      password: password,
      activities: []
    };

   
    const userRef = doc(db, "users", email);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
     
      alert("البريد الإلكتروني مسجل مسبقاً. يرجى استخدام بريد آخر.");
      return;
    }

    
    try {
      await setDoc(userRef, newUser);
      alert("تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.");
      navigate('/Quran_Compition');
    } catch (error) {
      console.error("Error saving user to Firestore:", error.message);
      alert("حدث خطأ أثناء التسجيل. حاول مرة أخرى.");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSignUp} className="w-[30rem] h-[26rem] flex flex-col justify-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          تسجيل الدخول بحساب جديد
        </h2>
        <div className="mb-4">
          <label htmlFor="userFullName" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            الاسم كامل
          </label>
          <input
            type="text"
            id="userFullName"
            name="userFullName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            placeholder="ادخل الاسم كامل"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            اسم المستخدم
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            placeholder="ادخل اسم المستخدم"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            الباسورد
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            placeholder="ادخل الباسورد"
          />
        </div>
        <button
          type="submit"
          aria-label="تسجيل الدخول"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500 transition"
        >
          تسجيل
        </button>
      </form>
    </div>
  );
};

export default SignUp;
