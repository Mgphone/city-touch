import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPages";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";

import PrivateRoute from "./components/PrivateRoute";
import ToastProvider from "./components/ToastProvider";
import { ScrollToTop } from "./components/ScrollToTop";

function Layout() {
  const location = useLocation();

  // Pages where NavBar and Footer should NOT show
  const noNavFooterPaths = ["/dashboard"];

  const hideNavFooter = noNavFooterPaths.includes(location.pathname);

  return (
    <>
      {!hideNavFooter && <NavBar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add more protected routes here */}
        </Route>
      </Routes>
      {!hideNavFooter && <Footer />}
      <ScrollToTop />
    </>
  );
}

function App() {
  return (
    <Router>
      <ToastProvider />
      <Layout />
    </Router>
  );
}

export default App;
