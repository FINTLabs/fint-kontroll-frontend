import type { LoaderFunctionArgs } from 'react-router';
import {
    Links,
    LinksFunction,
    Meta,
    MetaFunction,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useMatches,
    useRouteError,
} from 'react-router';
import navStyles from '@navikt/ds-css/dist/index.css?url';
import styles from '~/styles/main.css?url';
import { fetchMeInfo } from '~/data/fetch-me-info';
import meStyles from '~/components/app-bar/appBar.css?url';
import { Box, HStack, Page } from '@navikt/ds-react';
import { AppBar } from '~/components/app-bar/AppBar';
import { BASE_PATH } from '../environment';
import React, { ReactElement } from 'react';
import './tailwind.css';
import './novari-theme.css';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import { NovariIKS } from '~/components/images/NovariIKS';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import { IMeInfo } from '~/data/types/userTypes';

//interface CustomRouteHandle {
//    breadcrumb?: (match: UIMatch<unknown, RouteHandle>) => ReactElement;
//}

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
    const me = await fetchMeInfo(request);

    return {
        me,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    };
}

export default function App() {
    const { me, basePath } = useLoaderData<typeof loader>();
    const matches = useMatches();
    return (
        <html lang="no">
            <head>
                <Meta />
                <Links />
            </head>
            <body data-theme="novari">
                <Layout me={me} basePath={basePath}>
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
    me?: IMeInfo;
    basePath?: string;
}

const Layout = ({ children, me, basePath }: LayoutProps) => {
    return (
        <Page
            footer={
                <Box className={'novari-footer'} padding="8" as="footer">
                    <NovariIKS width={'9em'} />
                </Box>
            }>
            <AppBar me={me} basePath={basePath} />
            <Page.Block as={'main'} gutters>
                {children}
            </Page.Block>
        </Page>
    );
};

export function ErrorBoundary() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <html lang="no">
            <head>
                <Meta />
                <Links />
            </head>
            <body data-theme="novari">
                <Layout>
                    <div className={'content'}>
                        <ErrorMessage error={error} />
                    </div>
                </Layout>
            </body>
        </html>
    );
}
