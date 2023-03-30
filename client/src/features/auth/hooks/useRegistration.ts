import { TRegistration } from "./../components/RegistrationForm/RegistrationForm";
import { useMutation } from "react-query";
import axiosInstance from "../../../api/axios";
import { notificationMessages } from "../../../shared/constant";
import { showNotification } from "../../../shared/notification";

export const useRegistration = () => {
  const { isLoading, isError, isSuccess, mutate } = useMutation(
    "registration",
    (data: TRegistration) => axiosInstance.post("/auth/registration", data),
    {
      onSuccess: () => {
        showNotification("success", notificationMessages.success_operation);
      },
      onError: () => {
        showNotification("error", notificationMessages.error);
      },
    }
  );
  return { mutate, isError, isLoading, isSuccess };
};
