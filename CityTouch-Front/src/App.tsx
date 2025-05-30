// import { Navbar } from "./components/NavBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { ScrollToTop } from "./components/ScrollToTop";
import { HowItWorks } from "./components/HowItWorks";
import { About } from "./components/About";
import ServicesSection from "./components/Services";
import { FAQ } from "./components/FAQ";

function App() {
  return (
    <>
      <NavBar />
      <HeroSection />
      <HowItWorks />
      <About />
      <ServicesSection />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
