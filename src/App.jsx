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
import Welcome from "./component/Welcome";
import Standing from "./component/Standing";
import Question from "./component/Question";
import RoutingPage from "./component/routingPage";
import Activity from "./component/activites";
import Azkar from "./component/Azkar";
import Master from "./component/master";
import Khatma from "./component/khatma";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="" element={<Welcome />} />
        <Route path="/standing" element={<Standing />} />
        <Route path="/dayly-question" element={<Question />} />
        <Route path="/routinPage" element={<RoutingPage />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/azkar" element={<Azkar />} />
        <Route path="/master" element={<Master />} />
        <Route path="/khatma" element={<Khatma />} />
      </>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
