// utils/generateBookingCode.ts
export function generateBookingCode() {
  const timestamp = Date.now().toString().slice(-6); // e.g. last 6 digits of timestamp
  const random = Math.floor(100 + Math.random() * 900); // 3-digit random number
  return `BOOK-${timestamp}-${random}`; // e.g. BOOK-456789-123
}
