import { Outlet, Route } from "@tanstack/router";
import { rootRoute } from ".";
import { Layout } from "../components/Layout";
import { SchoolYearPage } from "../pages/SchoolYear/SchoolYear";

// TODO: validar caminho das rotas

export const schoolYearRoute = new Route({
    path: "/ano-letivo",
    component: () => (
        <Layout>
            <Outlet />
        </Layout>
    ),
    getParentRoute: () => rootRoute,
});

export const schoolYearIndexRoute = new Route({
    path: "/",
    component: () => <SchoolYearPage />,
    getParentRoute: () => schoolYearRoute,
});

schoolYearRoute.addChildren([schoolYearIndexRoute]);
