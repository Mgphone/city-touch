// /api/status.ts
import type { VercelRequest, VercelResponse } from "vercel";

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.status(200).json({ message: "Server is running 🚀" });
}
