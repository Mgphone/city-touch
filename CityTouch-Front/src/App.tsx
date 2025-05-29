// import { Navbar } from "./components/NavBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { FAQ } from "./FAQ";
import { HeroSection } from "./components/HeroSection";
import { ScrollToTop } from "./components/ScrollToTop";

function App() {
  return (
    <>
      <NavBar />

      <HeroSection />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
