import { LoginPage } from "./pages/LoginPage";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import { routes } from "./shared/routes";
import { Header } from "./shared/Header/Header";
function App() {
  return (
    <>
      <Header />
      <div className="p-4 my-0 mx-auto w-11/12">
        <Routes>
          {routes.map((route) => (
            <Route
              element={<route.component />}
              path={route.path}
              key={route.path}
            />
          ))}
        </Routes>
      </div>
    </>
  );
}

export default App;
