import { useBooking } from "@/context/bookingContext";
import { BookingData, Location } from "@/data/type/QuoteFormData";
import { generateBookingCode } from "@/lib/generatingBookingCode";
import axios from "axios";
import { MapPin, Map, Calendar, User, Truck } from "lucide-react"; // import icons
import { useEffect } from "react";

const vanSizeLabels: Record<string, string> = {
  small: "Small Van",
  medium: "Medium Van",
  large: "Large Van",
  luton: "Luton Van",
};
const toUKDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};
async function createBookingInDB(bookingData: BookingData) {
  try {
    const API_URL = import.meta.env.VITE_BACK_URL;
    const fullURL = `${API_URL}booking`;
    const token = localStorage.getItem("authToken");

    const response = await axios.post(fullURL, bookingData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data; // or whatever your backend returns
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error; // rethrow so caller can handle it
  }
}
export default function Step6() {
  const { bookingData, setBookingData } = useBooking();
  useEffect(() => {
    if (!bookingData?.pickupLocation?.place) return;

    const timer = setTimeout(() => {
      const generatedCode = generateBookingCode();
      setBookingData((prev) => ({
        ...prev,
        bookingCode: generatedCode,
        paymentPercentage: 0,
      }));
    }, 3000); // runs once after 3 seconds

    return () => clearTimeout(timer);
  }, [bookingData?.pickupLocation?.place]);
  useEffect(() => {
    if (!bookingData.bookingCode) return;

    async function updateDB() {
      try {
        await createBookingInDB(bookingData);
      } catch (error) {
        console.error("Fail to update booking in DB", error);
      }
    }

    updateDB();
  }, [bookingData.bookingCode]);

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

  const viaCount = viaLocations.length;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-8 sm:space-y-10">
      <h2 className="text-3xl font-bold text-gray-900 text-center sm:text-left">
        Summary & Cost
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <LocationCard
          icon={<MapPin size={20} />}
          title="Pickup Location"
          loc={pickupLocation}
        />

        {viaCount > 0 && (
          <div>
            <ViaLocations
              icon={<Map size={20} />}
              viaLocations={viaLocations}
            />
          </div>
        )}
        <LocationCard
          icon={<MapPin size={20} />}
          title="Dropoff Location"
          loc={dropoffLocation}
        />
      </div>
      <DetailCard icon={<Calendar size={20} />} title="Date & Time">
        {toUKDate(date)} at {time}
      </DetailCard>

      <DetailCard icon={<User size={20} />} title="Contact Information">
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
      </DetailCard>

      <DetailCard icon={<Truck size={20} />} title="Booking Details">
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
        Total Cost: <span className="text-4xl">£{totalCost?.toFixed(2)}</span>
      </div>
    </div>
  );
}

function LocationCard({
  title,
  loc,
  icon,
}: {
  title: string;
  loc: Location;
  icon: React.ReactNode;
}) {
  return (
    <section className="bg-gray-50 p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
        {icon}
        {title}
      </h3>
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

function ViaLocations({
  viaLocations,
  icon,
}: {
  viaLocations: Location[];
  icon: React.ReactNode;
}) {
  return (
    <section className="bg-gray-50 p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
        {icon}
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
  icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <section className="bg-gray-50 p-4 rounded-md shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
        {icon}
        {title}
      </h3>
      <div className="text-gray-700 text-base space-y-1">{children}</div>
    </section>
  );
}
