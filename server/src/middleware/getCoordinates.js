import nodeGeocoder from "node-geocoder";
import { ERROR_MESSAGES } from "../utils/messages.js";
import dotenv from "dotenv";
dotenv.config();
const options = {
  provider: "opencage",
  apiKey: "64f36bd033f446818abecd2c1e0f9357",
};
const geocoder = nodeGeocoder(options);
export async function getCoordinatesForAddress(address) {
  try {
    if (!address) throw new Error(ERROR_MESSAGES.no_address_error);
    const res = await geocoder.geocode(address);
    if (!res || res.length === 0)
      throw new Error(ERROR_MESSAGES.not_found_address);
    const { latitude, longitude } = res[0];

    return { latitude, longitude };
  } catch (e) {
    throw new Error(ERROR_MESSAGES.not_found_address);
  }
}
