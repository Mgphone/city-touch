interface Booking {
  id: string;
  customerName: string;
  date: string;
  price: number;
  status: "paid" | "quotation";
}

interface BookingsListProps {
  bookings: Booking[];
}

export default function BookingsList({ bookings }: BookingsListProps) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="space-y-4 max-w-3xl">
          {bookings.map(({ id, customerName, date, price, status }) => (
            <li
              key={id}
              className={`p-4 rounded-md shadow-md flex justify-between items-center ${
                status === "paid" ? "bg-green-100" : "bg-yellow-100"
              }`}
            >
              <div>
                <p className="font-semibold">{customerName}</p>
                <p className="text-sm text-gray-700">Date: {date}</p>
                <p className="text-sm text-gray-700">Price: £{price}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-white font-semibold ${
                  status === "paid" ? "bg-green-600" : "bg-yellow-600"
                }`}
              >
                {status === "paid" ? "Paid" : "Quotation"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
