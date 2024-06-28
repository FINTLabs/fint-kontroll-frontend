import React from 'react';
import {Alert, Box, Detail, Heading, Tabs, VStack} from "@navikt/ds-react";
import {Link, Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import  {LoaderFunctionArgs} from "@remix-run/router";
import {fetchMembers} from "~/data/fetch-roles";
import {json} from "@remix-run/node";
import {MemberTable} from "~/components/role/MemberTable";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const response = await fetchMembers(request, params.id, size, page, search);

    const members = await response.json()

    return json({
        members,
        size
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params, data }) => <Link to={`/roles/${params.id}/members`}>Medlemmer</Link>
}

export default function Members() {
    const loaderData = useLoaderData<typeof loader>();
    const members = loaderData.members
    const size = loaderData.size

    return (
        <section>
            <Tabs value={"members"}>
                <VStack gap="4">
                    <Heading className={"heading"} level={"2"} size={"large"}>Medlemmer av gruppen</Heading>
                    <Detail>Antall medlemmer i gruppen: {members.totalItems}</Detail>
                    <Tabs.Panel value="members" className="h-24 w-full bg-gray-50 p-4">
                        <MemberTable memberPage={members} size={size} />
                    </Tabs.Panel>
                </VStack>
            </Tabs>
        </section>
    );
}
export function ErrorBoundary() {
    const error: any = useRouteError();
    // console.error(error);
    return (
        <html lang={"no"}>
        <head>
            <title>Feil oppstod</title>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Box paddingBlock="8">
            <Alert variant="error">
                Det oppsto en feil med følgende melding:
                <div>{error.message}</div>
            </Alert>
        </Box>
        <Scripts/>
        </body>
        </html>
    );
}