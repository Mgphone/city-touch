import type { VercelRequest, VercelResponse } from "@vercel/node";
import connect from "../lib/mongoose";
import Booking from "../models/Booking";
import { handleCors } from "../util/cors";
import { verifyToken } from "../util/verifyToken";
import jwt from "jsonwebtoken";
import { generateSuccessEmailText } from "../data/success-mail";
import { sendEmail } from "../util/mailer";
export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connect();

  if (handleCors(req, res)) return; // Handle preflight

  // const token = req.headers.authorization?.split(" ")[1];
  // if (!token) {
  //   return res.status(401).json({ message: "No token provided" });
  // }

  // try {
  //   jwt.verify(token, process.env.JWT_SECRET!);
  // } catch (err) {
  //   return res.status(403).json({ message: "Invalid or expired token" });
  // }

  const id = req.query.id as string | undefined;

  // 🔍 GET request
  if (req.method === "GET") {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    const { valid, error } = verifyToken(token);
    if (!valid) {
      return res
        .status(error === "No token provided" ? 401 : 403)
        .json({ message: error });
    }
    try {
      const allBookings = await Booking.find({});
      return res.status(200).json(allBookings);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // 🆕 POST request
  if (req.method === "POST") {
    try {
      const {
        bookingCode,
        pickupLocation,
        dropoffLocation,
        date,
        time,
        vanSize,
        durationHours,
        menRequired,
        name,
        email,
        phone,
        paymentPercentage,
        totalCost,
      } = req.body;

      if (
        !bookingCode ||
        !pickupLocation ||
        !dropoffLocation ||
        !date ||
        !time ||
        !vanSize ||
        !durationHours ||
        !menRequired ||
        !name ||
        !email ||
        !phone
      ) {
        return res
          .status(400)
          .json({ message: "Missing required booking fields" });
      }
      const payableNow = totalCost * (paymentPercentage / 100);
      const outstandingBalance = totalCost - payableNow;
      req.body.payableNow = payableNow;
      req.body.outstandingBalance = outstandingBalance;
      const existing = await Booking.findOne({ bookingCode });
      if (existing) {
        const updated = await Booking.findOneAndUpdate(
          { bookingCode },
          req.body,
          { new: true }
        );

        if (!updated) {
          return res.status(500).json({ message: "Failed to update booking." });
        }

        const emailContent = generateSuccessEmailText(req.body); // use the saved data
        await sendEmail(
          req.body.email,
          "Your Booking Confirmation",
          emailContent
        );

        return res
          .status(200)
          .json({ message: "Booking updated", booking: updated });
      } else {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        return res
          .status(201)
          .json({ message: "Booking created", booking: newBooking });
      }
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  // 📝 PUT request
  // if (req.method === "PUT") {
  //   if (!id) return res.status(400).json({ message: "Booking id required" });
  //   try {
  //     const updated = await Booking.findByIdAndUpdate(id, req.body, {
  //       new: true,
  //     });
  //     if (!updated)
  //       return res.status(404).json({ message: "Booking not found" });
  //     return res
  //       .status(200)
  //       .json({ message: "Booking updated", booking: updated });
  //   } catch (error: any) {
  //     return res.status(500).json({ message: error.message });
  //   }
  // }

  // // ❌ DELETE request
  // if (req.method === "DELETE") {
  //   if (!id) return res.status(400).json({ message: "Booking id required" });
  //   try {
  //     await Booking.findByIdAndDelete(id);
  //     return res.status(204).end();
  //   } catch (error: any) {
  //     return res.status(500).json({ message: error.message });
  //   }
  // }
}
