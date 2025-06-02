import mongoose, { Schema, Document, Model } from "mongoose";
import { IPricingRules } from "../type/IPricingRules";

const PricingRulesSchema: Schema<IPricingRules> = new Schema({
  stairPerFloor: { type: Number, required: true, default: 10 },
  mileRate: { type: Number, required: true, default: 2 },
  manPerHour: { type: Number, required: true, default: 15 },
  vanSizeRates: {
    small: { type: Number, required: true, default: 50 },
    medium: { type: Number, required: true, default: 70 },
    large: { type: Number, required: true, default: 100 },
    luton: { type: Number, required: true, default: 130 },
  },
  halfHourRate: { type: Number, required: true, default: 20 },
});

const PricingRules: Model<IPricingRules> =
  mongoose.models.PricingRules ||
  mongoose.model<IPricingRules>("PricingRules", PricingRulesSchema);

export default PricingRules;
