// File: api/user/register.ts

import { VercelRequest, VercelResponse } from "@vercel/node";
import bcrypt from "bcrypt";
import connect from "../../lib/mongoose"; // your DB connection util
import User from "../../models/User"; // your Mongoose User model

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const { username, password, creatorPassword } = req.body;

  if (!username || !password || !creatorPassword) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  console.log("this is creator" + creatorPassword);
  console.log("this is process" + process.env.PASS_CREATOR);
  if (creatorPassword !== process.env.PASS_CREATOR) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid creator password" });
  }

  await connect();

  const existing = await User.findOne({ username });
  if (existing) {
    return res.status(409).json({ error: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashed });
  await newUser.save();

  return res.status(201).json({ message: "User registered successfully" });
}
