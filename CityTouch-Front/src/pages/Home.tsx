import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";
import ServicesSection from "@/components/Services";

const Home = () => {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <About />
      <ServicesSection />
      <FAQ />
    </>
  );
};

export default Home;

//    <HeroSection />
//       <HowItWorks />
//       <About />
//       <ServicesSection />
//       <FAQ />
