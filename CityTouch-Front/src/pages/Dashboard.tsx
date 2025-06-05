// import BookingsList from "@/components/Dashboard/BookingsList";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import LastTransactions from "@/components/Dashboard/LastTransactions";
import Pricing from "@/components/Dashboard/Pricing";
// import PricingCard from "@/components/Dashboard/PricingCard";
// import PricingForm from "@/components/Dashboard/PricingForm";
// import { Prices } from "@/data/type/backComingData";
// import axios from "axios";
// import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
// interface Booking {
//   id: string;
//   customerName: string;
//   date: string;
//   price: number;
//   status: "paid" | "quotation";
// }

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
// const sampleTransactions = [
//   { id: "1", description: "Booking #123", date: "2025-05-20", amount: 120 },
//   { id: "2", description: "Refund #456", date: "2025-05-19", amount: -40 },
//   { id: "3", description: "Booking #789", date: "2025-05-18", amount: 85 },
//   { id: "4", description: "Booking #101", date: "2025-05-17", amount: 90 },
//   { id: "5", description: "Refund #112", date: "2025-05-16", amount: -25 },
//   { id: "6", description: "Booking #131", date: "2025-05-15", amount: 110 },
//   { id: "7", description: "Booking #415", date: "2025-05-14", amount: 70 },
//   { id: "8", description: "Booking #161", date: "2025-05-13", amount: 60 },
//   { id: "9", description: "Booking #718", date: "2025-05-12", amount: 130 },
// ];
export default function Dashboard() {
  return (
    <main className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Dashboard Header / Navbar */}
      <DashboardHeader />
      <Pricing />
      {/* Monthly Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
          <CardDescription>Summary of this month's activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
            Chart goes here
          </div>
        </CardContent>
      </Card>
      {/* Last 8 Transactions */}
      {/* <LastTransactions transactions={sampleTransactions} /> */}
    </main>
  );
}
