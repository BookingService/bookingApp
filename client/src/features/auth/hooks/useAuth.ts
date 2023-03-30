import { TLogin } from "./../components/LoginForm/LoginForm";
import axiosInstance from "../../../api/axios";
import { useMutation } from "react-query";
import { showNotification } from "../../../shared/notification";
import { notificationMessages } from "../../../shared/constant";

export const useAuth = () => {
  const { mutate, isLoading } = useMutation(
    "auth",
    (requestData: TLogin) => axiosInstance.post("/auth/login", requestData),
    {
      onSuccess: () => {
        showNotification("success", notificationMessages.success_operation);
      },
      onError: () => {
        showNotification("error", notificationMessages.error);
      },
    }
  );
  return { login: mutate, isLoading };
};
