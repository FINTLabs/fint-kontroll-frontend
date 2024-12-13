import React from 'react';
import {Alert, Box, Detail, Heading, HStack, Tabs, VStack} from "@navikt/ds-react";
import {Link, Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchMembers} from "~/data/fetch-roles";
import {json} from "@remix-run/node";
import {MemberTable} from "~/components/role/MemberTable";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {Search} from "~/components/common/Search";
import ChipsFilters from "~/components/common/ChipsFilters";
import {fetchResourceDataSource, fetchUserTypes} from "~/data/fetch-kodeverk";
import {IKodeverkUserType} from "~/data/types";
import {getRoleMembersUrl} from "~/data/paths";

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const search = url.searchParams.get("search") ?? "";
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const members = await fetchMembers(request, params.id, size, page, search);

    const source = await fetchResourceDataSource(request)
    let userTypes: IKodeverkUserType[] = []
    if (source === "gui") {
        userTypes = await fetchUserTypes(request)
    }

    return json({
        members,
        size,
        userTypes
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({params}) => <Link to={getRoleMembersUrl(params.id)} className={"breadcrumb-link"}>Medlemmer</Link>
}

export default function Members() {
    const loaderData = useLoaderData<typeof loader>();
    const members = loaderData.members

    return (
        <section>
            <Tabs value={"members"}>
                <VStack gap="4">
                    <Heading className={"heading"} level={"2"} size={"large"}>Medlemmer av gruppen</Heading>
                    <HStack justify="space-between" gap="4">
                        <Detail>Antall medlemmer i gruppen: {members.totalItems}</Detail>
                        <Search label={"Søk etter medlemmer"} id={"search-member"}/>
                    </HStack>
                    <ChipsFilters/>
                    <Tabs.Panel value="members">
                        <MemberTable/>
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