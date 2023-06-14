import { Outlet, Route, Routes } from "react-router-dom";
import { StudentsPage } from "../pages/Students/Students";

export function StudentsRoutes() {
  return (
    <Routes>
      <Route path="/" Component={Outlet}>
        <Route index Component={StudentsPage} />
      </Route>
    </Routes>
  );
}
