// interface Booking {
//   id: string;
//   customerName: string;
//   date: string;
//   price: number;
//   status: "paid" | "quotation";
// }

import { BookingData } from "@/data/type/QuoteFormData";
import axios from "axios";
import { useEffect, useState } from "react";

// interface BookingsListProps {
//   bookings: Booking[];
// }

export default function BookingsList() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [bookings, setBookings] = useState<BookingData[]>([]);
  async function fetchPrices() {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const url = `${import.meta.env.VITE_BACK_URL}booking`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setBookings(response.data);
    } catch (error) {
      console.error("Error fetching pricing rules:", error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    fetchPrices();
  }, []);
  return (
    <>
      {isLoading ? (
        <p>Loading..</p>
      ) : (
        <section>
          <h2 className="text-2xl font-semibold mb-4">Bookings</h2>

          {bookings.length === 0 ? (
            <p>No bookings yet.</p>
          ) : (
            <ul className="space-y-4 max-w-3xl">
              {bookings.map((booking) => {
                const {
                  bookingCode,
                  name,
                  date,
                  totalCost,
                  paymentPercentage,
                } = booking;

                const status = paymentPercentage === 100 ? "paid" : "quotation";
                const price = totalCost ?? 0;

                return (
                  <li
                    key={bookingCode}
                    className={`p-4 rounded-md shadow-md flex justify-between items-center ${
                      status === "paid" ? "bg-green-100" : "bg-yellow-100"
                    }`}
                  >
                    <div>
                      <p className="font-semibold">{name}</p>
                      <p className="text-sm text-gray-700">Date: {date}</p>
                      <p className="text-sm text-gray-700">
                        Price: £{price.toFixed(2)}
                      </p>
                      <p>
                        From:{" "}
                        <span className="font-medium">
                          {booking.pickupLocation.place}
                        </span>
                      </p>
                      <p>
                        To:{" "}
                        <span className="font-medium">
                          {booking.dropoffLocation.place}
                        </span>
                      </p>
                      {booking.viaLocations &&
                        booking.viaLocations.length > 0 && (
                          <div>
                            <p>
                              Via {booking.viaLocations.length} stop
                              {booking.viaLocations.length > 1 ? "s" : ""}:
                            </p>
                            <ul className="list-disc list-inside text-sm text-gray-700 ml-2">
                              {booking.viaLocations.map((via, index) => (
                                <li key={index}>{via.place}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-white font-semibold ${
                        status === "paid" ? "bg-green-600" : "bg-yellow-600"
                      }`}
                    >
                      {status === "paid" ? "Paid" : "Quotation"}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}
    </>
  );
}
