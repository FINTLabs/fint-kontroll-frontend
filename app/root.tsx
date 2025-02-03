import { json, LinksFunction, MetaFunction } from '@remix-run/node';
import navStyles from '@navikt/ds-css/dist/index.css?url';
import 'react-toastify/dist/ReactToastify.css';

import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    UIMatch,
    useLoaderData,
    useMatches,
    useRouteError,
} from '@remix-run/react';
import styles from '~/styles/main.css?url';
import { fetchMeInfo } from '~/data/fetch-me-info';
import meStyles from '~/components/app-bar/appBar.css?url';
import type { LoaderFunctionArgs } from '@remix-run/router';
import { ToastContainer } from 'react-toastify';
import { Alert, Box, HStack, Page } from '@navikt/ds-react';
import { AppBar } from '~/components/app-bar/AppBar';
import { BASE_PATH } from '../environment';
import React, { ReactElement } from 'react';
import { fetchResourceDataSource } from '~/data/fetch-kodeverk';
import { RouteHandle } from '@remix-run/react/dist/routeModules';
import './tailwind.css';
import './novari-theme.css';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { NovariIKS } from '~/components/images/NovariIKS';

interface CustomRouteHandle {
    breadcrumb?: (match: UIMatch<unknown, RouteHandle>) => ReactElement;
}

export const meta: MetaFunction = () => {
    return [
        {
            charset: 'utf-8',
        },
        {
            name: 'viewport',
            content: 'width=device-width,initial-scale=1',
        },
        { title: 'FINT Kontroll' },
        {
            property: 'og:title',
            content: 'FINT Kontroll',
        },
        {
            name: 'description',
            content: 'FINT Kontroll',
        },
    ];
};

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: navStyles },
    { rel: 'stylesheet', href: styles },
    { rel: 'stylesheet', href: meStyles },
];

export async function loader({ request }: LoaderFunctionArgs) {
    const [me, source] = await Promise.all([
        fetchMeInfo(request),
        fetchResourceDataSource(request),
    ]);
    return json({
        me,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
        source: source,
    });
}

export default function App() {
    const { me, basePath, source } = useLoaderData<typeof loader>();
    const matches = useMatches();
    return (
        <html lang="no">
            <head>
                <Meta />
                <Links />
            </head>
            <body data-theme="novari">
                <ToastContainer autoClose={5000} newestOnTop={true} role="alert" />

                <Layout me={me} basePath={basePath} source={source}>
                    {matches.find((match) => {
                        // @ts-ignore
                        return match.handle?.breadcrumb;
                    }) && (
                        <HStack paddingBlock={'4'}>
                            {matches
                                .filter((match: any) => match.handle && match.handle.breadcrumb)
                                .map((match: any, index) => (
                                    <span key={index}>{match.handle.breadcrumb(match)}</span>
                                ))
                                // Use reducer to add separator between each breadcrumb element
                                .reduce((acc: ReactElement[], curr: ReactElement, index, array) => {
                                    if (index < array.length - 1) {
                                        return acc.concat(
                                            curr,
                                            <ArrowRightIcon
                                                key={`sep-${index}`}
                                                title="a11y-title"
                                                fontSize="1.5rem"
                                            />
                                        );
                                    } else {
                                        return acc.concat(curr);
                                    }
                                }, [])}
                        </HStack>
                    )}
                    <Outlet />
                </Layout>

                <ScrollRestoration getKey={(location) => location.pathname} />
                <Scripts />
            </body>
        </html>
    );
}

interface LayoutProps {
    children: any;
    me?: any;
    basePath?: string;
    source?: string;
}

const Layout = ({ children, me, basePath, source }: LayoutProps) => {
    return (
        <Page
            footer={
                <Box className={'novari-footer'} padding="8" as="footer">
                    <NovariIKS width={'9em'} />
                </Box>
            }>
            <Box className={'novari-header'} as="header">
                <Page.Block width="2xl">
                    <AppBar me={me} basePath={basePath} source={source} />
                </Page.Block>
            </Box>
            <Box as="main">
                <Page.Block gutters>{children}</Page.Block>
            </Box>
        </Page>
    );
};

export function ErrorBoundary() {
    const error: any = useRouteError();
    console.error(error);
    const me = null;
    return (
        <Layout me={me}>
            <html lang={'no'}>
                <head>
                    <title>Feil oppstod</title>
                    <Meta />
                    <Links />
                </head>
                <body>
                    <Box paddingBlock="8">
                        <Alert variant="error">
                            Det oppsto en feil med følgende melding:
                            <div>{error.message}</div>
                        </Alert>
                    </Box>
                    <Scripts />
                </body>
            </html>
        </Layout>
    );
}
