import { Outlet, RootRoute, Route, Router } from "@tanstack/router";

const rootRoute = new RootRoute({
    component: () => (
        <>
            <Outlet />
        </>
    )
});

const indexRoute = new Route({
    path: "/",
    component: () => <h1>Home</h1>,
    getParentRoute: () => rootRoute
});

const testRoute = new Route({
    path: "/test",
    component: () => <h1>Test page</h1>,
    getParentRoute: () => rootRoute
});

const routeTree = rootRoute.addChildren([indexRoute, testRoute]);

export const router = new Router({
    routeTree
});

declare module "@tanstack/router" {
    interface Register {
        router: typeof router;
    }
}