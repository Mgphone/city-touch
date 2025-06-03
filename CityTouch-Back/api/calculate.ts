import type { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch"; // For Node < 18
import sampleData from "../data/sampleData.json";
import connect from "../lib/mongoose";
import PricingRules from "../models/PricingRules";
import { QuoteFormData } from "../type/QuoteFormData";
import { handleCors } from "../util/cors";
const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN!;

const getDrivingDistanceMiles = async (
  locations: { latitude: number; longitude: number }[]
): Promise<{ distanceInMiles: number; coordinates: string }> => {
  const coordinates = locations
    .map((loc) => `${loc.longitude},${loc.latitude}`)
    .join(";");

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?overview=false&access_token=${MAPBOX_TOKEN}`;

  const response = await fetch(url);
  const data = await response.json();

  if (response.status !== 200) {
    throw new Error(data.message || "Failed to fetch distance from Mapbox API");
  }

  if (!data.routes || !data.routes.length) {
    throw new Error("No route found");
  }

  const distanceInMeters = data.routes[0].distance;
  const distanceInMiles = distanceInMeters / 1609.34;

  return { distanceInMiles, coordinates };
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (handleCors(req, res)) {
    return; // Preflight done, stop here
  }
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST method is allowed." });
  }
  try {
    await connect();

    const rules = await PricingRules.findOne();
    if (!rules) {
      return res.status(404).json({ message: "Pricing rules not found" });
    }

    const {
      pickupLocation,
      dropoffLocation,
      viaLocations = [],
      durationHours,
      vanSize,
      menRequired,
    } = req.body as QuoteFormData;

    const allLocations = [pickupLocation, ...viaLocations, dropoffLocation];

    const totalFloors = allLocations.reduce((sum, loc) => {
      if (loc.stairs === "stairs") return sum + loc.floorCount;
      return sum;
    }, 0);
    const stairCost = totalFloors * rules.stairPerFloor;

    const pathLocations = allLocations.map((loc) => ({
      latitude: loc.latitude!,
      longitude: loc.longitude!,
    }));
    if (
      pathLocations.some((loc) => loc.latitude == null || loc.longitude == null)
    ) {
      return res
        .status(400)
        .json({ message: "All locations must have latitude and longitude." });
    }
    if (pathLocations.length < 2) {
      return res.status(400).json({
        message: "At least two locations are required to calculate distance.",
      });
    }

    const { distanceInMiles, coordinates } = await getDrivingDistanceMiles(
      pathLocations
    );

    const mileageCost = parseFloat(
      (distanceInMiles * rules.mileRate).toFixed(2)
    );
    const vanCost = rules.vanSizeRates[vanSize];
    const menCost = rules.manPerHour * durationHours * menRequired;
    const durationCost = durationHours * 2 * rules.halfHourRate;

    const totalCost =
      stairCost + mileageCost + vanCost + menCost + durationCost;

    return res.status(200).json({
      success: true,
      totalCost: parseFloat(totalCost.toFixed(2)),
      totalMiles: parseFloat(distanceInMiles.toFixed(2)),
      breakdown: {
        stairCost: parseFloat(stairCost.toFixed(2)),
        mileageCost: parseFloat(mileageCost.toFixed(2)),
        vanCost: parseFloat(vanCost.toFixed(2)),
        menCost: parseFloat(menCost.toFixed(2)),
        durationCost: parseFloat(durationCost.toFixed(2)),
        miles: parseFloat(distanceInMiles.toFixed(2)),
      },
      rules: rules,
      routeCoordinates: coordinates,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "Error calculating quote",
      error: error.message,
    });
  }
}
