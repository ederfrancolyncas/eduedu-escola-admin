import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Auth/Login";

export function AuthRoutes() {
  return (
    <Routes>
      <Route index Component={Login} />
    </Routes>
  );
}
