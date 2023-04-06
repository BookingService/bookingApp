import { IFlat } from "@/types/flat.types";

export const countAverageRating = (array: IFlat): number => {
  const sum = array.reviews?.reduce((a, b) => a + b.rating, 0);
  const averageRating = sum / array.reviews.length;
  return Number(averageRating.toFixed(2)) || 0;
};
