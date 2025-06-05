import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Prices } from "@/data/type/backComingData";

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
    const updated = await axios.put(
      `http://localhost:3000/api/pricingRules`,
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setPrices(updated.data); // sync parent
    fetchPrices();
  };

  if (!formData) return null;

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <Label htmlFor="stairPerFloor">Stair per floor</Label>
        <Input
          min={1}
          id="stairPerFloor"
          type="number"
          name="stairPerFloor"
          value={formData.stairPerFloor}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="mileRate">Mile rate</Label>
        <Input
          id="mileRate"
          type="number"
          name="mileRate"
          value={formData.mileRate}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="manPerHour">Man per hour</Label>
        <Input
          min={1}
          id="manPerHour"
          type="number"
          name="manPerHour"
          value={formData.manPerHour}
          onChange={handleChange}
        />
      </div>

      <div>
        <Label htmlFor="halfHourRate">Half hour rate</Label>
        <Input
          min={1}
          id="halfHourRate"
          type="number"
          name="halfHourRate"
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
            min={1}
            id={size}
            type="number"
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
  );
}
