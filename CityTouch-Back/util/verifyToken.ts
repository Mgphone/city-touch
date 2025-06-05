import jwt from "jsonwebtoken";

export function verifyToken(token?: string): {
  valid: boolean;
  payload?: any;
  error?: string;
} {
  if (!token) {
    return { valid: false, error: "No token provided" };
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!);
    return { valid: true, payload };
  } catch (err) {
    return { valid: false, error: "Invalid or expired token" };
  }
}
