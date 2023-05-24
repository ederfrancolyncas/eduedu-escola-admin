import { Outlet, Route } from "@tanstack/router";
import { rootRoute } from ".";
import { DashboardPage } from "../pages/Dashboard";
import { Layout } from "../components/Layout";

export const dashboardRoute = new Route({
  path: "/dashboard",
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
  getParentRoute: () => rootRoute,
});

const dashboardIndexRoute = new Route({
  path: "/",
  component: () => <DashboardPage />,
  getParentRoute: () => dashboardRoute,
});

dashboardRoute.addChildren([dashboardIndexRoute]);
