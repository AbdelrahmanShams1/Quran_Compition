import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Home from "./component/Home";
import Instructions from "./component/Instructions";
import Welcome from "./component/Welcome";
import Standing from "./component/Standing";
import Question from "./component/Question";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/Quran_Compition/login" element={<Login />} />
        <Route path="/Quran_Compition/signup" element={<SignUp />} />
        <Route path="/Quran_Compition/home" element={<Home />} />
        <Route path="/Quran_Compition/instraction" element={<Instructions />} />
        <Route path="/Quran_Compition" element={<Welcome />} />
        <Route path="/Quran_Compition/standing" element={<Standing />} />
        <Route path="/Quran_Compition/dayly-question" element={<Question />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
