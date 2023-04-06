import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";

const client = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <AuthContextProvider>
    <QueryClientProvider client={client}>
      <MantineProvider withCSSVariables withGlobalStyles withNormalizeCSS>
        <Notifications position="top-right" />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </AuthContextProvider>
);
