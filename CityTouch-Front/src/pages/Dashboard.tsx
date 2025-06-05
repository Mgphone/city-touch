// import BookingsList from "@/components/Dashboard/BookingsList";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import PricingCard from "@/components/Dashboard/PricingCard";
import { Prices } from "@/data/type/backComingData";
import axios from "axios";
import { useEffect, useState } from "react";

interface Booking {
  id: string;
  customerName: string;
  date: string;
  price: number;
  status: "paid" | "quotation";
}

// const sampleBookings: Booking[] = [
//   {
//     id: "b1",
//     customerName: "Alice",
//     date: "2025-06-01",
//     price: 120,
//     status: "paid",
//   },
//   {
//     id: "b2",
//     customerName: "Bob",
//     date: "2025-06-05",
//     price: 80,
//     status: "quotation",
//   },
//   {
//     id: "b3",
//     customerName: "Charlie",
//     date: "2025-06-10",
//     price: 200,
//     status: "paid",
//   },
// ];

export default function Dashboard() {
  const [prices, setPrices] = useState<Prices | null>(null);
  const [isPriceLoading, setIsPriceLoading] = useState<boolean>(true);
  // const [bookings] = useState<Booking[]>(sampleBookings);

  useEffect(() => {
    async function fetchPrices() {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setIsPriceLoading(false);
        return;
      }

      try {
        setIsPriceLoading(true);

        const url = `${import.meta.env.VITE_BACK_URL}pricingRules`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPrices(response.data[0]);
      } catch (error) {
        console.error("Error fetching pricing rules:", error);
        setPrices(null);
      } finally {
        setIsPriceLoading(false);
      }
    }

    fetchPrices();
  }, []); // Run once on mount

  return (
    <div className="max-w-5xl mx-auto p-6">
      <DashboardHeader />
      {/* Show the PricingCard only when prices are loaded */}
      {isPriceLoading && <p>Loding...</p>}
      {!isPriceLoading && prices && <PricingCard prices={prices} />}

      {/* <BookingsList bookings={bookings} /> */}
    </div>
  );
}
