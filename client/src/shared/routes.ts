import MainPage from "../pages/MainPage";
import { ComponentType } from "react";
import { LoginPage } from "../pages/LoginPage";
interface IRoutes {
  component: ComponentType;
  path: string;
}

export const routes: IRoutes[] = [
  { path: "/auth", component: LoginPage },
  { path: "/", component: MainPage },
];
