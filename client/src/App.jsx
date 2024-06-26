import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';
import Admin from './pages/AdminLogin';
import AdminHome from './pages/AdminHome';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  const location = useLocation();
  const path = location.pathname;
  const isAdminRoute = path.startsWith('/admin') && path !== '/admin';

  return (
    <div>
      {path !== '/admin' && (isAdminRoute ? <AdminHeader /> : <Header />)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/adminhome" element={<AdminHome />} />
      </Routes>
    </div>
  );
};

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
