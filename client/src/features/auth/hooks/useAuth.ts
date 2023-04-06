import { TLogin } from "../components/LoginForm/LoginForm";
import axiosInstance from "../../../api/axios";
import { useMutation } from "react-query";
import { showNotification } from "../../../shared/notification";
import { notificationMessages } from "../../../shared/constant";
import { AxiosResponse } from "axios";
import { IUserData } from "@/types/user.types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const { mutate, isLoading } = useMutation(
    "auth",
    (requestData: TLogin): Promise<AxiosResponse<IUserData>> =>
      axiosInstance.post("/auth/login", requestData),
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
  return { login: mutate, isLoading };
};
