// cors.ts
import type { VercelResponse, VercelRequest } from "@vercel/node";

export function handleCors(req: VercelRequest, res: VercelResponse): boolean {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Change "*" to your domain in production
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true; // Indicate that the request was handled here
  }

  return false; // Not an OPTIONS request, proceed normally
}
