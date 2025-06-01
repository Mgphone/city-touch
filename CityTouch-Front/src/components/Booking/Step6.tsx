import { QuoteFormData } from "@/data/type/QuoteFormData";

interface Props {
  formData: QuoteFormData;
}

export default function Step6({ formData }: Props) {
  const baseCost = 50;

  const pickupFloors = formData.pickupLocation.floorCount;
  const dropoffFloors = formData.dropoffLocation.floorCount;

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

  // Friendly van size label formatting
  const vanSizeLabels: Record<string, string> = {
    small: "Small Van",
    medium: "Medium Van",
    large: "Large Van",
    luton: "Luton Van",
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-8 sm:space-y-10">
      <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-left">
        Summary & Cost
      </h2>

      {/* Locations Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Pickup */}
        <section className="bg-gray-50 p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Pickup Location
          </h3>
          <p className="text-gray-700 font-medium">
            {formData.pickupLocation.place}
          </p>
          <p className="text-gray-600 text-sm mb-1">
            {formData.pickupLocation.fullAddress}
          </p>
          <p className="text-sm text-gray-500">
            Access:{" "}
            <span className="capitalize">
              {formData.pickupLocation.stairs || "None"}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            {pickupFloors} {pickupFloors === 1 ? "floor" : "floors"}
          </p>
        </section>

        {/* Via Locations */}
        <section className="bg-gray-50 p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Via Locations
          </h3>
          {viaCount > 0 ? (
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {formData.viaLocations!.map((loc, idx) => (
                <div
                  key={idx}
                  className="border-b border-gray-200 pb-2 last:border-0"
                >
                  <p className="font-medium text-gray-700">{loc.place}</p>
                  <p className="text-gray-600 text-sm">{loc.fullAddress}</p>
                  <p className="text-sm text-gray-500">
                    Access:{" "}
                    <span className="capitalize">{loc.stairs || "None"}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    {loc.floorCount} {loc.floorCount === 1 ? "floor" : "floors"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">None</p>
          )}
        </section>

        {/* Dropoff */}
        <section className="bg-gray-50 p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Dropoff Location
          </h3>
          <p className="text-gray-700 font-medium">
            {formData.dropoffLocation.place}
          </p>
          <p className="text-gray-600 text-sm mb-1">
            {formData.dropoffLocation.fullAddress}
          </p>
          <p className="text-sm text-gray-500">
            Access:{" "}
            <span className="capitalize">
              {formData.dropoffLocation.stairs || "None"}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            {dropoffFloors} {dropoffFloors === 1 ? "floor" : "floors"}
          </p>
        </section>
      </div>

      {/* Date & Time */}
      <section className="bg-gray-50 p-4 rounded-md shadow-sm max-w-md mx-auto sm:mx-0">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Date & Time
        </h3>
        <p className="text-gray-700 text-base text-center sm:text-left">
          {formData.date} at {formData.time}
        </p>
      </section>

      {/* Contact Info */}
      <section className="bg-gray-50 p-4 rounded-md shadow-sm max-w-md mx-auto sm:mx-0 space-y-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Contact Information
        </h3>
        <p className="text-gray-700 text-base">Name: {formData.name}</p>
        <p className="text-gray-700 text-base">Email: {formData.email}</p>
        <p className="text-gray-700 text-base">Phone: {formData.phone}</p>
      </section>

      {/* Additional Booking Details */}
      <section className="bg-gray-50 p-4 rounded-md shadow-sm max-w-md mx-auto sm:mx-0 space-y-1">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Booking Details
        </h3>
        <p className="text-gray-700 text-base">
          Van Size:{" "}
          <span className="capitalize font-medium">
            {vanSizeLabels[formData.vanSize]}
          </span>
        </p>
        <p className="text-gray-700 text-base">
          Duration:{" "}
          <span className="font-medium">
            {formData.durationHours}{" "}
            {formData.durationHours === 1 ? "hour" : "hours"}
          </span>
        </p>
        <p className="text-gray-700 text-base">
          Helpers Required:{" "}
          <span className="font-medium">{formData.menRequired}</span>
        </p>
      </section>

      {/* Total Cost */}
      <div className="text-center sm:text-right text-2xl font-extrabold text-green-700">
        Total Cost: <span className="text-3xl">£{totalCost.toFixed(2)}</span>
      </div>
    </div>
  );
}
