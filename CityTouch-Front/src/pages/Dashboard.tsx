// import BookingsList from "@/components/Dashboard/BookingsList";
import BookingsList from "@/components/Dashboard/BookingsList";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import Pricing from "@/components/Dashboard/Pricing";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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

      <BookingsList />
    </main>
  );
}
