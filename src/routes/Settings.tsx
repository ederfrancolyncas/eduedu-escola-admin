import { Outlet, Route } from "@tanstack/router";
import { rootRoute } from ".";
import { Layout } from "../components/Layout";
import { SettingsPage } from "../pages/Settings/Settings";

// TODO: validar caminho das rotas

export const settingsRoute = new Route({
    path: "/configuracoes",
    component: () => (
        <Layout>
            <Outlet />
        </Layout>
    ),
    getParentRoute: () => rootRoute,
});

export const settingsIndexRoute = new Route({
    path: "/",
    component: () => <SettingsPage />,
    getParentRoute: () => settingsRoute,
});

settingsRoute.addChildren([settingsIndexRoute]);
