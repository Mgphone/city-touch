import BookingsList from "@/components/Dashboard/BookingsList";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import PricingCard from "@/components/Dashboard/PricingCard";
import { useState } from "react";

type VanSize = "small" | "medium" | "large" | "luton";

interface Prices {
  stairPerFloor: number;
  mileRate: number;
  manPerHour: number;
  vanSizeRates: Record<VanSize, number>;
  halfHourRate: number;
}

interface Booking {
  id: string;
  customerName: string;
  date: string;
  price: number;
  status: "paid" | "quotation";
}

const initialPrices: Prices = {
  stairPerFloor: 10,
  mileRate: 2,
  manPerHour: 15,
  vanSizeRates: {
    small: 20,
    medium: 30,
    large: 40,
    luton: 50,
  },
  halfHourRate: 20,
};

const sampleBookings: Booking[] = [
  {
    id: "b1",
    customerName: "Alice",
    date: "2025-06-01",
    price: 120,
    status: "paid",
  },
  {
    id: "b2",
    customerName: "Bob",
    date: "2025-06-05",
    price: 80,
    status: "quotation",
  },
  {
    id: "b3",
    customerName: "Charlie",
    date: "2025-06-10",
    price: 200,
    status: "paid",
  },
];

export default function Dashboard() {
  const [prices] = useState<Prices>(initialPrices);
  const [bookings] = useState<Booking[]>(sampleBookings);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <DashboardHeader />
      <PricingCard prices={prices} />
      <BookingsList bookings={bookings} />
    </div>
  );
}
