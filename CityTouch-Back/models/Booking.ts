import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBooking extends Document {
  name: string;
  vanSize: "small" | "medium" | "large" | "luton";
  date: string;
  stairs: "lift" | "stairs" | "";
  floorCount: number;
  // add other fields as needed
}

const BookingSchema: Schema = new Schema({
  name: { type: String, required: true },
  vanSize: {
    type: String,
    enum: ["small", "medium", "large", "luton"],
    required: true,
  },
  date: { type: String, required: true },
  stairs: { type: String, enum: ["lift", "stairs", ""], default: "" },
  floorCount: { type: Number, default: 0 },
});

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;
