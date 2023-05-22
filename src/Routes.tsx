import { Outlet, RootRoute, Route, Router } from "@tanstack/router";
import { Home } from './pages/Home/Index'
import { Login, EsqueciSenha } from './pages/Auth/components'

const rootRoute = new RootRoute({
    component: () => (
        <>
            <Outlet />
        </>
    )
});

const loginRoute = new Route({
    path: "/login",
    component: () => <Login />,
    getParentRoute: () => rootRoute
});

const homeRoute = new Route({
    path: "/",
    component: () => <Home />,
    getParentRoute: () => rootRoute
});

const forgotPasswordRoute = new Route({
    path: "/esqueci-a-senha",
    component: () => <EsqueciSenha />,
    getParentRoute: () => rootRoute
});

const routeTree = rootRoute.addChildren([
    loginRoute,
    forgotPasswordRoute,
    homeRoute
]);

export const router = new Router({
    routeTree
});

declare module "@tanstack/router" {
    interface Register {
        router: typeof router;
    }
}