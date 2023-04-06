import { TRegistration } from "./../components/RegistrationForm/RegistrationForm";
import { useMutation } from "react-query";
import axiosInstance from "../../../api/axios";
import { notificationMessages } from "../../../shared/constant";
import { showNotification } from "../../../shared/notification";
import { AxiosResponse } from "axios";
import { IUserData } from "../../../types/user.types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export const useRegistration = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const { isLoading, isError, isSuccess, mutate, data } = useMutation(
    "registration",
    (data: TRegistration): Promise<AxiosResponse<IUserData>> =>
      axiosInstance.post("/auth/registration", data),
    {
      onSuccess: (d) => {
        showNotification("success", notificationMessages.success_operation);
        setToken(Cookies.set("token", d.data.token) ?? null);
        navigate("/");
      },
      onError: () => {
        showNotification("error", notificationMessages.error);
      },
    }
  );
  return { mutate, isError, isLoading, isSuccess, data };
};
