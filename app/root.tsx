import {cssBundleHref} from "@remix-run/css-bundle";
import type {LinksFunction, MetaFunction} from "@remix-run/node";
import {json} from "@remix-run/node";
import navStyles from "@navikt/ds-css/dist/index.css";
import "react-toastify/dist/ReactToastify.css"
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useRouteError,
} from "@remix-run/react";
import styles from "~/styles/main.css";
import {BodyShort, Box, Page} from "@navikt/ds-react";
import {AppBar} from "~/components/app-bar/AppBar";
import type {IMeInfo} from "~/data/types";
import {fetchMeInfo} from "~/data/fetch-me-info";
import meStyles from "~/components/app-bar/appBar.css";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {ToastContainer} from "react-toastify";

//import {err} from "@remix-run/dev/dist/result";


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
    ...(cssBundleHref
            ?
            [
                {rel: "stylesheet", href: cssBundleHref},
            ]
            :
            []
    ),
];

export async function loader({request}: LoaderFunctionArgs) {
    const response = await fetchMeInfo(request.headers.get("Authorization"));
    return json(await response.json());
}

export default function App() {
    const me = useLoaderData<IMeInfo>();

    return (
        <html lang="no">
        <head>
            <Meta/>
            <Links/>
        </head>
        <body>
        <ToastContainer autoClose={5000} newestOnTop={true} role="alert" />
        <Page
            footer={
                <Box className={"footer"} padding="8" as="footer">
                    <Page.Block width="2xl">
                        <BodyShort>Footer</BodyShort>
                    </Page.Block>
                </Box>
            }
        >
            <Box className={"footer"} as="header">
                <Page.Block width="2xl">
                    <AppBar me={me}/>
                </Page.Block>
            </Box>
            <Box
                padding="1"
                paddingBlock="16"
                as="main"
            >
                <Page.Block gutters>
                    <Outlet/>
                </Page.Block>
            </Box>
        </Page>
        <ScrollRestoration getKey={location => location.pathname}/>
        <Scripts/>
        <LiveReload/>
        </body>
        </html>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    console.error(error);
    return (
        <html>
        <head>
            <title>Oh no!</title>
            <Meta/>
            <Links/>
        </head>
        <body>
        Shit granitt!!!
        <div>{error.message}</div>
        <Scripts/>
        </body>
        </html>
    );
}
