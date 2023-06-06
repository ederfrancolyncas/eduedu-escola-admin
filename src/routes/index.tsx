import { Outlet, RootRoute, Route, Router } from "@tanstack/router";
import { Login } from "../pages/Auth/components";
import { classesRoute } from "./Classes";
import { dashboardRoute } from "./Dashboard";
import { usersRoute } from "./Users";
import { schoolYearRoute } from "./SchoolYear";
import { studentsRoute } from "./Students";
import { settingsRoute } from "./Settings";

export const rootRoute = new RootRoute({
  component: () => <Outlet />,
});

const loginRoute = new Route({
  path: "/login",
  component: () => <Login />,
  getParentRoute: () => rootRoute,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  classesRoute,
  dashboardRoute,
  usersRoute,
  schoolYearRoute,
  studentsRoute,
  settingsRoute,
]);

export const router = new Router({
  routeTree,
});

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
