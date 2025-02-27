import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Home from "./component/Home";
import Instructions from "./component/Instructions";
import Welcome from "./component/welcome";
import Standing from "./component/Standing";
import Question from "./component/Question";


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="Quran_Compition/login" element={<Login />} />
        <Route path="Quran_Compition/signup" element={<SignUp />} />
        <Route path="Quran_Compition/home" element={<Home />} />
        <Route path="Quran_Compition/instraction" element={<Instructions />} />
        <Route path="Quran_Compition" element={<Welcome />} />
        <Route path="Quran_Compition/standing" element={<Standing/>} />
        <Route path="Quran_Compition/dayly-question" element={<Question/>} />
      </>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
