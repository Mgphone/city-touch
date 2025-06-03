import type { VercelRequest, VercelResponse } from "@vercel/node";
import connect from "../lib/mongoose";
import Booking from "../models/Booking";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await connect();

  const id = req.query.id as string | undefined;

  switch (req.method) {
    case "GET":
      if (id) {
        const booking = await Booking.findById(id);
        if (!booking)
          return res.status(404).json({ message: "Booking not found" });
        return res.status(200).json(booking);
      }
      const allBookings = await Booking.find({});
      return res.status(200).json(allBookings);

    case "POST":
      try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        return res.status(201).json(newBooking);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }

    case "PUT":
      if (!id) return res.status(400).json({ message: "Booking id required" });
      try {
        const updatedBooking = await Booking.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!updatedBooking)
          return res.status(404).json({ message: "Booking not found" });
        return res.status(200).json(updatedBooking);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }

    case "DELETE":
      if (!id) return res.status(400).json({ message: "Booking id required" });
      await Booking.findByIdAndDelete(id);
      return res.status(204).end();

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
