import './App.css';
import LoginAndRegistration from './pages/LoginAndRegistration';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from './helpers/ProtectedRoutes';
import Navbar from './components/Navbar';
import { getJWT } from './lib/userService';
import httpService from './lib/httpService';
import 'react-toastify/dist/ReactToastify.css';
import { pages } from './lib/pages';
import Footer from './components/Footer';

function App() {
  // set x-auth-token if token exists in localStorage
  const token = getJWT();
  if (token) httpService.setAuthToken(token);

  const mainRoutes = pages.map(page => {
    return <Route key={page.path} path={page.nested || page.path} element={page.element} />;
  });

  return (
    <>
      <div className='h-full'>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <header className="w-full bg-slate-30">
          <Navbar />
        </header>
        <Routes>
          <Route path="/login" element={<LoginAndRegistration formType="login" />} exact />
          <Route path="/register" element={<LoginAndRegistration formType="register" />} exact />

          <Route element={<ProtectedRoutes />}>{mainRoutes}</Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
