import { API_URL_FOR_UPLOADS } from "./constant";

export const getImageUrl = (imageUrl: string): string => {
  return API_URL_FOR_UPLOADS + "/" + imageUrl;
};
