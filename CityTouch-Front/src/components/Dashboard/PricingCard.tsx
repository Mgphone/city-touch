import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { PricingCardProps } from "@/data/type/backComingData";

export default function PricingCard({ prices }: PricingCardProps) {
  // console.log(JSON.stringify(prices));
  return (
    <section className="mb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card className="shadow-lg rounded-lg border border-gray-200">
        <CardHeader className="bg-gray-50 p-6 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Current Booking Prices
          </CardTitle>
          <CardDescription className="text-gray-600 mt-1">
            View the latest configured rates for bookings.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-gray-900">
            <div>
              <p className="font-semibold text-lg">Stair Per Floor (£)</p>
              <p className="mt-1 text-xl font-medium">{prices.stairPerFloor}</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Mile Rate (£)</p>
              <p className="mt-1 text-xl font-medium">{prices.mileRate}</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Man Per Hour (£)</p>
              <p className="mt-1 text-xl font-medium">{prices.manPerHour}</p>
            </div>
            <div>
              <p className="font-semibold text-lg">Half Hour Rate (£)</p>
              <p className="mt-1 text-xl font-medium">{prices.halfHourRate}</p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Van Size Rates (£)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-gray-900">
              {Object.entries(prices.vanSizeRates).map(([size, rate]) => (
                <div
                  key={size}
                  className="bg-gray-100 p-4 rounded-md shadow-sm text-center"
                >
                  <p className="font-semibold capitalize">{size}</p>
                  <p className="mt-1 text-lg font-medium">{rate}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
