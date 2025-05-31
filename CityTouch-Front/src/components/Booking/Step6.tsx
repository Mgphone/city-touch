import { QuoteFormData } from "@/data/type/QuoteFormData";

interface Props {
  formData: QuoteFormData;
}

export default function Step6({ formData }: Props) {
  // Example cost calculation logic
  const baseCost = 50;
  const floorCost = formData.floorCount * 10;
  const viaCost = (formData.viaLocations?.length || 0) * 15;
  const totalCost = baseCost + floorCost + viaCost;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Summary & Cost</h2>

      <div>
        <h3 className="font-semibold">Pickup Location</h3>
        <p>{formData.pickupLocation.place}</p>
        <p>{formData.pickupLocation.fullAddress}</p>
      </div>

      {formData.viaLocations?.length > 0 && (
        <div>
          <h3 className="font-semibold">Via Locations</h3>
          {formData.viaLocations.map((loc, idx) => (
            <p key={idx}>
              {loc.place} — {loc.fullAddress}
            </p>
          ))}
        </div>
      )}

      <div>
        <h3 className="font-semibold">Dropoff Location</h3>
        <p>{formData.dropoffLocation.place}</p>
        <p>{formData.dropoffLocation.fullAddress}</p>
      </div>

      <div>
        <h3 className="font-semibold">Date & Time</h3>
        <p>
          {formData.date} at {formData.time}
        </p>
      </div>

      <div>
        <h3 className="font-semibold">Stairs & Floor Count</h3>
        <p>{formData.stairs}</p>
        <p>
          {formData.floorCount} {formData.floorCount === 1 ? "floor" : "floors"}
        </p>
      </div>

      <div>
        <h3 className="font-semibold">Contact Information</h3>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
        <p>Phone: {formData.phone}</p>
      </div>

      <div className="mt-6 text-xl font-bold">
        Total Cost: £{totalCost.toFixed(2)}
      </div>
    </div>
  );
}
