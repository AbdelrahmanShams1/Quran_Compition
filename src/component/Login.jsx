import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase"; // تأكد من أن ملف firebase يحتوي على الكود الخاص بـ Firestore

const Login = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map((doc) => doc.data());
        setUsers(usersData);
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      navigate("/home");
    } else {
      setError("إيميل أو كلمة مرور غير صحيحة");
    }
  };

  return (
    <div className="flex items-center justify-center h-[100vh] bg-gray-100 dark:bg-gray-900">
      <form
        method="post"
        onSubmit={handleSubmit}
        className="w-[30rem] h-[26rem] flex flex-col justify-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          تسجيل الدخول
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
          >
            البريد الإلكتروني
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            placeholder="ادخل البريد الإلكتروني"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
          >
            كلمة المرور
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 dark:focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            placeholder="ادخل كلمة المرور"
          />
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-500 transition"
        >
          تسجيل الدخول
        </button>

        <Link
          to="/signup"
          className="text-blue-500 hover:underline dark:text-blue-400 mt-5 mb-2 text-lg text-center"
        >
          التسجيل بحساب جديد
        </Link>
      </form>
    </div>
  );
};

export default Login;
