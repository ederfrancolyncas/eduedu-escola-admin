import { Outlet, RootRoute, Route, Router } from "@tanstack/router";
import { Login, EsqueciSenha } from "../pages/Auth/components";
import { dashboardRoute } from "./Dashboard";
import { usersRoute } from "./Users";

export const rootRoute = new RootRoute({
  component: () => <Outlet />,
});

const loginRoute = new Route({
  path: "/login",
  component: () => <Login />,
  getParentRoute: () => rootRoute,
});

const forgotPasswordRoute = new Route({
  path: "/esqueci-a-senha",
  component: () => <EsqueciSenha />,
  getParentRoute: () => rootRoute,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  forgotPasswordRoute,
  dashboardRoute,
  usersRoute,
]);

export const router = new Router({
  routeTree,
});

declare module "@tanstack/router" {
  interface Register {
    router: typeof router;
  }
}
