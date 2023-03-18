import nodeGeocoder from "node-geocoder";
import { ERROR_MESSAGES } from "../utils/messages.js";

const options = {
  provider: "opencage",
  apiKey: process.env.API_KEY,
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
