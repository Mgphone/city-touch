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
      <Card className="shadow-lg rounded-lg border">
        <CardHeader className="bg-muted/50 p-6 rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-primary">
            Current Booking Prices
          </CardTitle>
          <CardDescription className="text-muted-foreground mt-1">
            View the latest configured rates for bookings.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-primary">
            <div>
              <p className="font-semibold text-sm">Stair Per Floor (£)</p>
              <p className="mt-1 text-xl font-medium">{prices.stairPerFloor}</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Mile Rate (£)</p>
              <p className="mt-1 text-xl font-medium">{prices.mileRate}</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Man Per Hour (£)</p>
              <p className="mt-1 text-xl font-medium">{prices.manPerHour}</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Half Hour Rate (£)</p>
              <p className="mt-1 text-xl font-medium">{prices.halfHourRate}</p>
            </div>
          </div>

          <div className="border-t mt-8 pt-6">
            <h3 className="text-lg font-semibold mb-4">Van Size Rates (£)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {Object.entries(prices.vanSizeRates).map(([size, rate]) => (
                <div
                  key={size}
                  className="bg-muted p-4 rounded-md text-center shadow-sm"
                >
                  <p className="font-semibold capitalize text-sm">{size}</p>
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
