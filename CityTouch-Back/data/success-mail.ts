// emailTemplates.js

import { QuoteFormData } from "../type/QuoteFormData";

export function generateSuccessEmailText(bookingData: QuoteFormData) {
  const {
    bookingCode,
    name,
    email,
    phone,
    pickupLocation,
    viaLocations,
    dropoffLocation,
    date,
    time,
    vanSize,
    durationHours,
    menRequired,
    halfHourCost,
    totalCost,
    paymentPercentage,
    payableNow,
    outstandingBalance,
  } = bookingData;

  const viaLocationsText =
    viaLocations && viaLocations.length > 0
      ? viaLocations
          .map(
            (loc, idx) =>
              `Via Location ${idx + 1}:
  - Place: ${loc.place}
  - Address: ${loc.fullAddress}
  - Stairs: ${loc.stairs}
  - Floors: ${loc.floorCount}
  - Lat/Lon: ${loc.latitude}, ${loc.longitude}`
          )
          .join("\n\n")
      : "No intermediate stops planned."; // More user-friendly text

  return `
Booking Confirmation - Success!
===============================

Dear ${name || "Customer"},

Thank you for your booking. Your booking has been successfully placed.

-------------------------------
Your Booking Details
-------------------------------
Booking Code:    ${bookingCode}
Contact Email:   ${email}
Phone:           ${phone}

-------------------------------
Pickup Location
-------------------------------
Place:           ${pickupLocation.place}
Address:         ${pickupLocation.fullAddress}
Stairs:          ${pickupLocation.stairs}
Floors:          ${pickupLocation.floorCount}
Lat/Lon:         ${pickupLocation.latitude}, ${pickupLocation.longitude}

${
  viaLocationsText
    ? `
-------------------------------
Intermediate Stops
-------------------------------
${viaLocationsText}`
    : ""
}

-------------------------------
Dropoff Location
-------------------------------
Place:           ${dropoffLocation.place}
Address:         ${dropoffLocation.fullAddress}
Stairs:          ${dropoffLocation.stairs}
Floors:          ${dropoffLocation.floorCount}
Lat/Lon:         ${dropoffLocation.latitude}, ${dropoffLocation.longitude}

-------------------------------
Service Details
-------------------------------
Date & Time:     ${date} at ${time}
Van Size:        ${vanSize}
Duration:        ${durationHours} hours
Men Required:    ${menRequired}

-------------------------------
Payment Summary
-------------------------------
Half Hour Cost:  £${halfHourCost?.toFixed(2) ?? "0.00"}
Total Cost:      £${totalCost?.toFixed(2) ?? "0.00"}
Payment Due Now: ${paymentPercentage ?? 0}% (£${
    payableNow?.toFixed(2) ?? "0.00"
  })
Outstanding:     £${outstandingBalance?.toFixed(2) ?? "0.00"}

We appreciate your trust in our services!

Best regards,
The Booking Team
`.trim();
}
