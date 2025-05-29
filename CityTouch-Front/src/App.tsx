import { Button } from "@/components/ui/button";
// import { Navbar } from "./components/NavBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { FAQ } from "./FAQ";

function App() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Button>Click me</Button>
      </div>
      <FAQ />

      <Footer />
    </>
  );
}

export default App;
