// import { Navbar } from "./components/NavBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { FAQ } from "./FAQ";
import { HeroSection } from "./components/HeroSection";
import { ScrollToTop } from "./components/ScrollToTop";
import { HowItWorks } from "./components/HowItWorks";
import { About } from "./components/About";

function App() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <HowItWorks />
      <About />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
