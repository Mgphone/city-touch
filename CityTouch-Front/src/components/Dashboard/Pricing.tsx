import PricingCard from "@/components/Dashboard/PricingCard";
import PricingForm from "@/components/Dashboard/PricingForm";
import { Prices } from "@/data/type/backComingData";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "../ui/button";
type Props = {};

const Pricing: React.FC<Props> = () => {
  const [prices, setPrices] = useState<Prices | null>(null);
  const [isPriceLoading, setIsPriceLoading] = useState<boolean>(true);
  const [showPricing, setShowPricing] = useState(false);

  // const [bookings] = useState<Booking[]>(sampleBookings);

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
  useEffect(() => {
    fetchPrices();
  }, []); // Run once on mount
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <CardTitle>Current Pricing</CardTitle>
              <CardDescription>
                Your latest pricing information and controls.
              </CardDescription>
            </div>

            <Button
              className="w-full sm:w-1/4"
              onClick={() => setShowPricing(!showPricing)}
            >
              {showPricing ? "Hide Pricing" : "Show Full Pricing"}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {isPriceLoading ? (
            <p className="text-center text-gray-500 italic">
              Loading pricing...
            </p>
          ) : prices ? (
            <>
              {showPricing && (
                <>
                  <PricingCard prices={prices} />
                  <div className="mt-6">
                    <PricingForm
                      setPrices={setPrices}
                      prices={prices}
                      fetchPrices={fetchPrices}
                    />
                  </div>
                </>
              )}
            </>
          ) : (
            <p className="text-center text-gray-500 italic">
              No pricing found.
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default Pricing;
