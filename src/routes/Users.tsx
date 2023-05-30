import { Outlet, Route } from "@tanstack/router";
import { rootRoute } from ".";
import { Layout } from "../components/Layout";
import { UsersPage } from "../pages/Users/Users/Users";
import { UserPage } from "../pages/Users/User/User";

// TODO: validate routes

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

export const newUserIndexRoute = new Route({
  path: "novo-usuario",
  component: () => <UserPage />,
  getParentRoute: () => usersRoute,
});

export const userProfileIndexRoute = new Route({
  path: "$userId",
  component: () => <UserPage />,
  getParentRoute: () => usersRoute,
});

usersRoute.addChildren([
  usersIndexRoute,
  newUserIndexRoute,
  userProfileIndexRoute,
]);
