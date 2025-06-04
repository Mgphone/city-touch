import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILocation {
  place: string;
  fullAddress: string;
  stairs: string;
  floorCount: number;
  latitude: number;
  longitude: number;
}

export interface IRules {
  vanSizeRates: {
    small: number;
    medium: number;
    large: number;
    luton: number;
  };
  stairPerFloor: number;
  mileRate: number;
  manPerHour: number;
  halfHourRate: number;
}

export interface IBreakdown {
  stairCost: number;
  mileageCost: number;
  vanCost: number;
  menCost: number;
  durationCost: number;
  miles: number;
}

export interface IBooking extends Document {
  bookingCode: string;
  pickupLocation: ILocation;
  viaLocations?: ILocation[]; // optional
  dropoffLocation: ILocation;
  date: string;
  time: string;
  vanSize: "small" | "medium" | "large" | "luton";
  durationHours: number;
  menRequired: number;
  name: string;
  email: string;
  phone: string;
  breakdown: IBreakdown;
  rules: IRules;
  totalCost: number;
  totalMiles: number;
  paymentStatus: "unpaid" | "35" | "70" | "full"; // payment progress
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<ILocation>({
  place: { type: String, required: true },
  fullAddress: { type: String, required: true },
  stairs: { type: String, required: true },
  floorCount: { type: Number, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const RulesSchema = new Schema<IRules>({
  vanSizeRates: {
    small: { type: Number, required: true },
    medium: { type: Number, required: true },
    large: { type: Number, required: true },
    luton: { type: Number, required: true },
  },
  stairPerFloor: { type: Number, required: true },
  mileRate: { type: Number, required: true },
  manPerHour: { type: Number, required: true },
  halfHourRate: { type: Number, required: true },
});

const BreakdownSchema = new Schema<IBreakdown>({
  stairCost: { type: Number, required: true },
  mileageCost: { type: Number, required: true },
  vanCost: { type: Number, required: true },
  menCost: { type: Number, required: true },
  durationCost: { type: Number, required: true },
  miles: { type: Number, required: true },
});

const BookingSchema = new Schema<IBooking>(
  {
    bookingCode: {
      type: String,
      required: true,
      unique: true,
    },
    pickupLocation: { type: LocationSchema, required: true },
    viaLocations: { type: [LocationSchema], required: false, default: [] },
    dropoffLocation: { type: LocationSchema, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    vanSize: {
      type: String,
      enum: ["small", "medium", "large", "luton"],
      required: true,
    },
    durationHours: { type: Number, required: true },
    menRequired: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    breakdown: { type: BreakdownSchema, required: true },
    rules: { type: RulesSchema, required: true },
    totalCost: { type: Number, required: true },
    totalMiles: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "35", "70", "full"],
      required: true,
      default: "unpaid",
    },
  },
  { timestamps: true }
);

const Booking: Model<IBooking> =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;
