import { Outlet, Route } from "@tanstack/router";
import { rootRoute } from ".";
import { Layout } from "../components/Layout";
import { StudentsPage } from "../pages/Students/Students";

// TODO: validar caminho das rotas

export const studentsRoute = new Route({
    path: "/alunos",
    component: () => (
        <Layout>
            <Outlet />
        </Layout>
    ),
    getParentRoute: () => rootRoute,
});

export const studentsIndexRoute = new Route({
    path: "/",
    component: () => <StudentsPage />,
    getParentRoute: () => studentsRoute,
});

studentsRoute.addChildren([studentsIndexRoute]);
