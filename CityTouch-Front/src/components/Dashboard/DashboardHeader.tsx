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
    <header className="flex flex-col md:flex-row items-center justify-between gap-4">
      <h1 className="text-3xl font-bold">
        Welcome to Dashboard{" "}
        <span className="inline-block animate-pulse text-yellow-400">
          {username || "guest"}
        </span>
      </h1>
      <Button variant="destructive" onClick={handleLogout}>
        Logout
      </Button>
    </header>
  );
}
