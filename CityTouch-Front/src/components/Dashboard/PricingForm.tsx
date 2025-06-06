import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Prices } from "@/data/type/backComingData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface Props {
  prices: Prices & { _id?: string };
  setPrices: (prices: Prices) => void;
  fetchPrices: () => Promise<void>;
}

export default function PricingForm({ prices, setPrices, fetchPrices }: Props) {
  const [formData, setFormData] = useState(prices);

  useEffect(() => {
    setFormData(prices);
  }, [prices]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev!,
      [name]: parseFloat(value),
    }));
  };

  const handleVanSizeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    size: string
  ) => {
    const value = parseFloat(e.target.value);
    setFormData((prev) => ({
      ...prev!,
      vanSizeRates: {
        ...prev!.vanSizeRates,
        [size]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    if (!formData?._id) return;
    const token = localStorage.getItem("authToken");
    const API_URL = import.meta.env.VITE_BACK_URL;
    const fullURL = `${API_URL}pricingRules`;
    const updated = await axios.put(fullURL, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPrices(updated.data); // sync parent
    fetchPrices();
  };

  if (!formData) return null;

  return (
    <section className="mb-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Update Pricing</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div>
              <Label htmlFor="stairPerFloor">Stair per floor</Label>
              <Input
                id="stairPerFloor"
                name="stairPerFloor"
                type="number"
                min={1}
                value={formData.stairPerFloor}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="mileRate">Mile rate</Label>
              <Input
                id="mileRate"
                name="mileRate"
                type="number"
                value={formData.mileRate}
                onChange={handleChange}
                min={0}
                step="0.01"
              />
            </div>

            <div>
              <Label htmlFor="manPerHour">Man per hour</Label>
              <Input
                id="manPerHour"
                name="manPerHour"
                type="number"
                min={1}
                value={formData.manPerHour}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label htmlFor="halfHourRate">Half hour rate</Label>
              <Input
                id="halfHourRate"
                name="halfHourRate"
                type="number"
                min={1}
                value={formData.halfHourRate}
                onChange={handleChange}
              />
            </div>

            {Object.entries(formData.vanSizeRates).map(([size, rate]) => (
              <div key={size}>
                <Label htmlFor={size}>
                  {size.charAt(0).toUpperCase() + size.slice(1)} van rate
                </Label>
                <Input
                  id={size}
                  type="number"
                  min={1}
                  value={rate}
                  onChange={(e) => handleVanSizeChange(e, size)}
                />
              </div>
            ))}

            <div className="sm:col-span-2">
              <Button type="submit" className="w-full sm:w-fit">
                Update Pricing
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
