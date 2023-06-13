import { Outlet, Route } from "@tanstack/router";
import { rootRoute } from ".";
import { Layout } from "../components/Layout";
import { ClassesPage, DetailsPage, FormPage } from "../pages/Classes";

// TODO: validate caminho das rotas

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

export const newClassIndexRoute = new Route({
    path: "nova-turma",
    component: () => <FormPage />,
    getParentRoute: () => classesRoute,
});

export const editClassIndexRoute = new Route({
    path: "editar/$classId",
    component: () => <FormPage />,
    getParentRoute: () => classesRoute,
});

export const seeClassIndexRoute = new Route({
    path: "visualizar/$classId",
    component: () => <DetailsPage />,
    getParentRoute: () => classesRoute,
});

classesRoute.addChildren([
    classesIndexRoute,
    editClassIndexRoute,
    newClassIndexRoute,
    seeClassIndexRoute
]);
