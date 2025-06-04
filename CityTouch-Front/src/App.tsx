// import { Navbar } from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import { ScrollToTop } from "./components/ScrollToTop";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPages";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
        <ScrollToTop />
      </Router>
    </>
  );
}

export default App;
