import { Outlet, Route } from "@tanstack/router";
import { rootRoute } from ".";
import { Layout } from "../components/Layout";

export const usersRoute = new Route({
  path: "/usuarios",
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
  getParentRoute: () => rootRoute,
});

export const usersIndexRoute = new Route({
  path: "/",
  component: () => <h1>Usuários</h1>,
  getParentRoute: () => usersRoute,
});

usersRoute.addChildren([usersIndexRoute]);
