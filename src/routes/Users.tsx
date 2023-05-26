import { Outlet, Route } from "@tanstack/router";
import { rootRoute } from ".";
import { Layout } from "../components/Layout";
import { UsersPage } from "../pages/Users/Users";

// TODO: validar caminho das rotas

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
  component: () => <UsersPage />,
  getParentRoute: () => usersRoute,
});

usersRoute.addChildren([usersIndexRoute]);
