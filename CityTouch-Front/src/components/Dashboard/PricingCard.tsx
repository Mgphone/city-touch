import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

type VanSize = "small" | "medium" | "large" | "luton";

interface Prices {
  stairPerFloor: number;
  mileRate: number;
  manPerHour: number;
  vanSizeRates: Record<VanSize, number>;
  halfHourRate: number;
}

interface PricingCardProps {
  prices: Prices;
}

export default function PricingCard({ prices }: PricingCardProps) {
  return (
    <section className="mb-12 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Current Booking Prices</CardTitle>
          <CardDescription>
            View the latest configured rates for bookings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 text-gray-800">
            <div>
              <p className="font-semibold">Stair Per Floor (£)</p>
              <p className="mt-1">{prices.stairPerFloor}</p>
            </div>
            <div>
              <p className="font-semibold">Mile Rate (£)</p>
              <p className="mt-1">{prices.mileRate}</p>
            </div>
            <div>
              <p className="font-semibold">Man Per Hour (£)</p>
              <p className="mt-1">{prices.manPerHour}</p>
            </div>
            <div>
              <p className="font-semibold">Half Hour Rate (£)</p>
              <p className="mt-1">{prices.halfHourRate}</p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3">Van Size Rates (£)</h3>
            <div className="grid grid-cols-4 gap-6 text-gray-800">
              {Object.entries(prices.vanSizeRates).map(([size, rate]) => (
                <div key={size}>
                  <p className="font-semibold">
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </p>
                  <p className="mt-1">{rate}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
