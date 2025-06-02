export interface IPricingRules {
  stairPerFloor: number;
  mileRate: number;
  manPerHour: number;
  vanSizeRates: {
    small: number;
    medium: number;
    large: number;
    luton: number;
  };
  halfHourRate: number;
}
