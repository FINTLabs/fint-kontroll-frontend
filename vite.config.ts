import {vitePlugin as remix} from "@remix-run/dev";
import {installGlobals} from "@remix-run/node";
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {BASE_PATH} from "./environment";

installGlobals();


export default defineConfig({
    base: `${BASE_PATH === "/" ? "" : BASE_PATH}/`,
    plugins: [
        remix({
            basename: `${BASE_PATH.replace(/\/$/, '')}`,
            routes(defineRoutes) {
                return defineRoutes((route) => {
                    route('users/:userId/orgunit/:orgId', 'routes/reusablePages/userInformation.tsx', {id: 'users/:userId/orgunit/:orgId'});
                    route('roles/:roleId/members/:userId/orgunit/:orgId', 'routes/reusablePages/userInformation.tsx', {id: 'roles/:roleId/members/:userId/orgunit/:orgId'});
                });
            },
        }),
        tsconfigPaths()
    ]
})