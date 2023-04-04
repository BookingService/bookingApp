import axiosInstance from "../../../api/axios";
import { useQuery } from "react-query";
import { showNotification } from "../../../shared/notification";
import { text } from "../../../shared/constant";
import { IFlat } from "../../../types/flat.types";

export const useFlats = () => {
  const { isLoading, isError, data } = useQuery(
    "getFlats",
    () => axiosInstance.get<IFlat[]>("/flats"),
    {
      onError: () => {
        showNotification("error", text.error_while_fetching_flats);
      },
    }
  );
  return { flats: data, isError, isLoading };
};
