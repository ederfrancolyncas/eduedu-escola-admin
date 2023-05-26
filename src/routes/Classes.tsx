import { Outlet, Route } from "@tanstack/router";
import { rootRoute } from ".";
import { Layout } from "../components/Layout";
import { ClassesPage } from "../pages/Classes/Classes";

// TODO: validar caminho das rotas

export const classesRoute = new Route({
    path: "/turmas",
    component: () => (
        <Layout>
            <Outlet />
        </Layout>
    ),
    getParentRoute: () => rootRoute,
});

export const classesIndexRoute = new Route({
    path: "/",
    component: () => <ClassesPage />,
    getParentRoute: () => classesRoute,
});

classesRoute.addChildren([classesIndexRoute]);
