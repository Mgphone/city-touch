import { QuoteFormData } from "@/data/type/QuoteFormData";

interface Props {
  formData: QuoteFormData;
}

export default function Step6({ formData }: Props) {
  const baseCost = 50;

  // Always present
  const pickupFloors = formData.pickupLocation.floorCount;
  const dropoffFloors = formData.dropoffLocation.floorCount;

  // Optional via locations floor count total
  let viaFloors = 0;
  let viaCount = 0;

  if (formData.viaLocations && formData.viaLocations.length > 0) {
    viaFloors = formData.viaLocations.reduce(
      (sum, loc) => sum + loc.floorCount,
      0
    );
    viaCount = formData.viaLocations.length;
  }

  const floorCost = (pickupFloors + dropoffFloors + viaFloors) * 10;
  const viaCost = viaCount * 15;
  const totalCost = baseCost + floorCost + viaCost;

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-50 rounded-md shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Summary & Cost</h2>

      <div>
        <h3 className="font-semibold">Pickup Location</h3>
        <p>{formData.pickupLocation.place}</p>
        <p>{formData.pickupLocation.fullAddress}</p>
        <p>Access: {formData.pickupLocation.stairs}</p>
        <p>
          {pickupFloors} {pickupFloors === 1 ? "floor" : "floors"}
        </p>
      </div>

      {viaCount > 0 ? (
        <div>
          <h3 className="font-semibold">Via Locations</h3>
          {formData.viaLocations!.map((loc, idx) => (
            <div key={idx}>
              <p>
                {loc.place} — {loc.fullAddress}
              </p>
              <p>Access: {loc.stairs}</p>
              <p>
                {loc.floorCount} {loc.floorCount === 1 ? "floor" : "floors"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h3 className="font-semibold">Via Locations</h3>
          <p>None</p>
        </div>
      )}

      <div>
        <h3 className="font-semibold">Dropoff Location</h3>
        <p>{formData.dropoffLocation.place}</p>
        <p>{formData.dropoffLocation.fullAddress}</p>
        <p>Access: {formData.dropoffLocation.stairs}</p>
        <p>
          {dropoffFloors} {dropoffFloors === 1 ? "floor" : "floors"}
        </p>
      </div>

      <div>
        <h3 className="font-semibold">Date & Time</h3>
        <p>
          {formData.date} at {formData.time}
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
