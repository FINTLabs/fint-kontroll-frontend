import {json, LinksFunction, MetaFunction} from "@remix-run/node";
import navStyles from "@navikt/ds-css/dist/index.css?url";
import "react-toastify/dist/ReactToastify.css"
import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useMatches,
    useRouteError,
} from "@remix-run/react";
import styles from "~/styles/main.css?url";
import {fetchMeInfo} from "~/data/fetch-me-info";
import meStyles from "~/components/app-bar/appBar.css?url";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {ToastContainer} from "react-toastify";
import {Alert, Box, Page} from "@navikt/ds-react";
import {AppBar} from "~/components/app-bar/AppBar";
import {BASE_PATH} from "../environment";
import React from "react";

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
    const response = await fetchMeInfo(request.headers.get("Authorization"));
    const me = await response.json();
    return json({
        me,
        basePath: BASE_PATH === "/" ? "" : BASE_PATH
    });
}

export default function App() {
    const {me, basePath} = useLoaderData<typeof loader>();
    const matches = useMatches();
    // @ts-ignore
    return (
        <html lang="no">
        <head>
            <Meta/>
            <Links/>
        </head>
        <body>
        <ToastContainer autoClose={5000} newestOnTop={true} role="alert"/>

        <Layout me={me} basePath={basePath}>
            {/* @ts-ignore Ignore because this type of padding is legal for top-bottom relationship in padding, just not in the ts-spec from Aksel */}
            <Box padding={"0 8"}>
                {matches
                    .filter((match) =>
                        // @ts-ignore Ignore for now because breadcrumb does not exist on type 'handle'
                        match.handle && match.handle.breadcrumb
                    )
                    .map((match, index) => (
                        // @ts-ignore Ignore for now because match.handle is type 'unknown'
                        <span key={index}>{match.handle.breadcrumb(match)}</span>
                    ))
                    // Use reducer to add separator between each breadcrumb element
                    .reduce((acc, curr, index, array) => {
                        if (index < array.length - 1) {
                            return acc.concat(curr, <span key={`sep-${index}`}> &gt; </span>);
                        } else {
                            return acc.concat(curr);
                        }
                    }, [])}
            </Box>
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
}

const Layout = ({children, me, basePath}: LayoutProps) => {
    return (
        <Page
            footer={
                <Box className={"footer"} padding="8" as="footer">
                </Box>
            }
        >
            <Box className={"footer"} as="header">
                <Page.Block width="2xl">
                    <AppBar me={me} basePath={basePath}/>
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
