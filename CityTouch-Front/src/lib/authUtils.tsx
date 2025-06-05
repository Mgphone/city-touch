import { jwtDecode } from "jwt-decode";
interface DecodedToken {
  username: string;
  exp: number;
}
export function getToken() {
  return localStorage.getItem("authToken");
}

export function isLoggedIn() {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = jwtDecode<DecodedToken>(token);
    if (Date.now() >= exp * 1000) {
      // Token expired
      localStorage.removeItem("token");
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function logout() {
  localStorage.removeItem("authToken");
}

export function getUserName(): string | false {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.username;
  } catch {
    return false;
  }
}
