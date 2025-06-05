export type VanSize = "small" | "medium" | "large" | "luton";

export interface Prices {
  stairPerFloor: number;
  mileRate: number;
  manPerHour: number;
  vanSizeRates: Record<VanSize, number>;
  halfHourRate: number;
}

export interface PricingCardProps {
  prices: Prices;
}
