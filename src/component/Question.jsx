import { useNavigate } from "react-router-dom";
import { FaQuestionCircle, FaArrowLeft, FaSave } from "react-icons/fa";
import { useEffect, useState } from "react";
import QuestionsData from "../Questions.json";
const Question = () => {
  const navigate = useNavigate();
  const [randomQuestion, setRandomQuestion] = useState();
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    // const today = new Date().toISOString().split("T")[0];
    const today = "2025-03-01";
    const selectedQuestions = Object.entries(QuestionsData).filter(
      ([date, questions]) => {
        if (date === today) {
          const QuestionsArray = Object.entries(questions);
          console.log("questions:", questions);
          const todayQuestions = QuestionsArray.map(([, value]) => {
            return {
              ...value,
            };
          });
          return [date, [...todayQuestions]];
        }
      }
    );
    console.log("selected:", selectedQuestions);
    const [[, todayQuestions]] = selectedQuestions;
    console.log("todayQuestions:", todayQuestions);

    const todaysrandomQuestion =
      todayQuestions[
        Math.floor(Math.random() * Object.keys(todayQuestions).length)
      ];
    setRandomQuestion(todaysrandomQuestion);
  }, []);
  const handleSaveAnswer = () => {};
  return (
    <>
      {randomQuestion && (
        <div className="min-h-screen bg-gradient-to-b from-purple-600 to-indigo-900 p-4">
          <div className="container mx-auto max-w-4xl">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md text-sm transition-all"
            >
              <FaArrowLeft className="w-3 h-3 ml-1" />
              العودة إلى الصفحة الرئيسية
            </button>
            <div className="bg-white/95 backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl p-6 rounded-lg mt-4">
              <div className="text-2xl text-center flex items-center justify-center gap-2 font-bold text-indigo-900">
                <FaQuestionCircle className="w-6 h-6 text-blue-500" />
                سؤال اليوم
              </div>
              <div className="space-y-6 mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-indigo-900">
                    - {randomQuestion.question}؟
                  </h3>
                  <div className="mt-4">
                    <label className="block text-gray-700 mb-2">إجابتك:</label>
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:border-indigo-600 transition-all"
                      rows="2"
                    ></textarea>
                  </div>
                  <button
                    onClick={handleSaveAnswer}
                    className="outline-none w-[80%] mx-auto bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md font-bold text-lg flex items-center justify-center"
                  >
                    <FaSave className="w-4 h-4 ml-1" />
                    حفظ الإجابة
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Question;
