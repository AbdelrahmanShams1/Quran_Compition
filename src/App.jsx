import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Login from './component/login';
import SignUp from './component/SignUp';
import Home from './component/home';


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
    <>
    <Route path='/Quran_Compition' element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/home" element={<Home />} />
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
