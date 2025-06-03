import { useBooking } from "@/context/bookingContext";
import { BookingData, Location } from "@/data/type/QuoteFormData";
// import type { BookingData, Location } from "@/type/QuoteFormData";

const vanSizeLabels: Record<string, string> = {
  small: "Small Van",
  medium: "Medium Van",
  large: "Large Van",
  luton: "Luton Van",
};

export default function Step6() {
  const { bookingData } = useBooking();

  if (!bookingData?.pickupLocation?.place) {
    return (
      <div className="text-center py-10 font-semibold">
        Loading booking summary...
      </div>
    );
  }

  const data: BookingData = bookingData;

  const {
    pickupLocation,
    dropoffLocation,
    viaLocations = [],
    date,
    time,
    name,
    email,
    phone,
    vanSize,
    durationHours,
    menRequired,
    totalCost,
  } = data;

  const pickupFloors = pickupLocation.floorCount;
  const dropoffFloors = dropoffLocation.floorCount;
  const viaFloors = viaLocations.reduce((sum, loc) => sum + loc.floorCount, 0);
  const viaCount = viaLocations.length;

  const baseCost = 50;
  const floorCost = (pickupFloors + dropoffFloors + viaFloors) * 10;
  const viaCost = viaCount * 15;
  const displayCost = totalCost ?? baseCost + floorCost + viaCost;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-8 sm:space-y-10">
      <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-left">
        Summary & Cost
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <LocationCard title="Pickup Location" loc={pickupLocation} />
        <LocationCard title="Dropoff Location" loc={dropoffLocation} />

        {viaCount > 0 && (
          <div className="col-span-full">
            <ViaLocations viaLocations={viaLocations} />
          </div>
        )}
      </div>
      <DetailCard title="Date & Time">
        {date} at {time}
      </DetailCard>

      <DetailCard title="Contact Information">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
      </DetailCard>

      <DetailCard title="Booking Details">
        <p>
          Van Size:{" "}
          <span className="capitalize font-medium">
            {vanSizeLabels[vanSize]}
          </span>
        </p>
        <p>
          Duration:{" "}
          <span className="font-medium">
            {durationHours} {durationHours === 1 ? "hour" : "hours"}
          </span>
        </p>
        <p>
          Helpers Required: <span className="font-medium">{menRequired}</span>
        </p>
      </DetailCard>

      <div className="col-span-full text-center sm:text-right text-3xl font-extrabold text-green-700">
        Total Cost: <span className="text-4xl">£{displayCost.toFixed(2)}</span>
      </div>
    </div>
  );
}

function LocationCard({ title, loc }: { title: string; loc: Location }) {
  return (
    <section className="bg-gray-50 p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-700 font-medium">{loc.place}</p>
      <p className="text-gray-600 text-sm mb-1">{loc.fullAddress}</p>
      <p className="text-sm text-gray-500">
        Access: <span className="capitalize">{loc.stairs || "None"}</span>
      </p>
      <p className="text-sm text-gray-500">
        {loc.floorCount} {loc.floorCount === 1 ? "floor" : "floors"}
      </p>
    </section>
  );
}

function ViaLocations({ viaLocations }: { viaLocations: Location[] }) {
  return (
    <section className="bg-gray-50 p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Via Locations
      </h3>
      {viaLocations.length > 0 ? (
        <div className="space-y-3">
          {viaLocations.map((loc, idx) => (
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
  );
}

function DetailCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-50 p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <div className="text-gray-700 text-base space-y-1">{children}</div>
    </section>
  );
}
