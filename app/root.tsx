import {json, LinksFunction, MetaFunction} from "@remix-run/node";
import navStyles from "@navikt/ds-css/dist/index.css?url";
import "react-toastify/dist/ReactToastify.css"
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, UIMatch,
    useLoaderData,
    useMatches,
    useRouteError,
} from "@remix-run/react";
import styles from "~/styles/main.css?url";
import {fetchMeInfo} from "~/data/fetch-me-info";
import meStyles from "~/components/app-bar/appBar.css?url";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {ToastContainer} from "react-toastify";
import {Alert, Box, HStack, Page} from "@navikt/ds-react";
import {AppBar} from "~/components/app-bar/AppBar";
import {BASE_PATH} from "../environment";
import React, {ReactElement} from "react";
import {fetchResourceDataSource} from "~/data/fetch-kodeverk";
import {RouteHandle} from "@remix-run/react/dist/routeModules";

interface CustomRouteHandle {
    breadcrumb?: (match: UIMatch<unknown, RouteHandle>) => ReactElement;
}

export const meta: MetaFunction = () => {
    return [
        {
            charset: "utf-8",
        },
        {
            name: "viewport",
            content: "width=device-width,initial-scale=1",
        },
        {title: "FINT Kontroll"},
        {
            property: "og:title",
            content: "FINT Kontroll",
        },
        {
            name: "description",
            content: "FINT Kontroll",
        },
    ];
};

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: navStyles},
    {rel: 'stylesheet', href: styles},
    {rel: 'stylesheet', href: meStyles},
];

export async function loader({request}: LoaderFunctionArgs) {
    const response = await fetchMeInfo(request);
    const me = await response.json();
    const source = await fetchResourceDataSource(request)
    return json({
        me,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH,
        source: source,
    });
}

export default function App() {
    const {me, basePath, source} = useLoaderData<typeof loader>();
    const matches = useMatches();
    return (
        <html lang="no">
        <head>
            <Meta/>
            <Links/>
        </head>
        <body>
        <ToastContainer autoClose={5000} newestOnTop={true} role="alert"/>

        <Layout me={me} basePath={basePath} source={source}>
            <HStack>
                {matches
                    .filter((match: any) =>
                        match.handle && match.handle.breadcrumb
                    )
                    .map((match: any, index) => (
                        <span key={index}>{match.handle.breadcrumb(match)}</span>
                    ))
                    // Use reducer to add separator between each breadcrumb element
                    .reduce((acc: ReactElement[], curr: ReactElement, index, array) => {
                        if (index < array.length - 1) {
                            return acc.concat(curr, <span key={`sep-${index}`}> &gt; </span>);
                        } else {
                            return acc.concat(curr);
                        }
                    }, [])}
            </HStack>
            <Outlet/>
        </Layout>

        <ScrollRestoration getKey={location => location.pathname}/>
        <Scripts/>
        </body>
        </html>
    );
}

interface LayoutProps {
    children: any
    me?: any
    basePath?: string
    source?: string
}

const Layout = ({children, me, basePath, source}: LayoutProps) => {
    return (
        <Page
            footer={
                <Box className={"footer"} padding="8" as="footer">
                </Box>
            }
        >
            <Box className={"footer"} as="header">
                <Page.Block width="2xl">
                    <AppBar me={me} basePath={basePath} source={source}/>
                </Page.Block>
            </Box>
            <Box
                padding="1"
                paddingBlock="16"
                as="main"
            >
                <Page.Block gutters>
                    {children}
                </Page.Block>
            </Box>
        </Page>
    )
}


export function ErrorBoundary() {
    const error: any = useRouteError();
    console.error(error);

    const me = null

    return (
        <html lang={"no"}>
        <head>
            <title>Feil oppstod</title>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Layout me={me}>
            <Box paddingBlock="8">
                <Alert variant="error">
                    Det oppsto en feil med følgende melding:
                    <div>{error.message}</div>
                </Alert>
            </Box>
            <Scripts/>
        </Layout>
        </body>
        </html>
    );
}
