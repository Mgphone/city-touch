import { isLoggedIn } from "@/lib/authUtils";
import { Navigate, Outlet } from "react-router-dom";
// import { isLoggedIn } from "./auth"; // Path to your auth util

export default function PrivateRoute() {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
}
