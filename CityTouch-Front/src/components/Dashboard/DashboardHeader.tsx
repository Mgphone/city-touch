import { Button } from "@/components/ui/button";
import { getUserName, logout } from "@/lib/authUtils";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader() {
  const username = getUserName();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="text-gray-600 bg-white p-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto rounded-md shadow-md mb-12">
      <h1 className="text-4xl font-extrabold mb-4 md:mb-0">
        Welcome to Dashboard{" "}
        <span className="inline-block animate-pulse text-yellow-400">
          {username ? username : "guest"}
        </span>
      </h1>
      <Button onClick={handleLogout} className="whitespace-nowrap px-6 py-3">
        Logout
      </Button>
    </header>
  );
}
