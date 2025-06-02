import type { VercelRequest, VercelResponse } from "@vercel/node";
import PricingRules from "../models/PricingRules";
import connect from "../lib/mongoose";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connect();

  if (req.method === "GET") {
    const rules = await PricingRules.find({});
    return res.status(200).json(rules);
  }

  if (req.method === "POST") {
    try {
      const newRule = new PricingRules(req.body);
      const savedRule = await newRule.save();
      return res.status(201).json(savedRule);
    } catch (error) {
      return res.status(400).json({ message: "Invalid data", error });
    }
  }

  if (req.method === "PUT") {
    try {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ message: "Missing id" });

      const updatedRule = await PricingRules.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedRule)
        return res.status(404).json({ message: "Rule not found" });

      return res.status(200).json(updatedRule);
    } catch (error) {
      return res.status(400).json({ message: "Update failed", error });
    }
  }

  if (req.method === "DELETE") {
    try {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ message: "Missing id" });

      const deletedRule = await PricingRules.findByIdAndDelete(id);
      if (!deletedRule)
        return res.status(404).json({ message: "Rule not found" });

      return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      return res.status(400).json({ message: "Delete failed", error });
    }
  }

  res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
  return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
}
