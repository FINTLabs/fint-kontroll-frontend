import {UserTable} from "~/components/user/UserTable";
import {UserSearch} from "~/components/user/UserSearch";
import {Alert, Box} from "@navikt/ds-react";
import {json} from "@remix-run/node";
import {Links, Meta, Scripts, useLoaderData, useRouteError} from "@remix-run/react";
import {fetchUsers} from "~/data/fetch-users";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchAllOrgUnits} from "~/data/fetch-resources";
import {UserTypeFilter} from "~/components/user/UserTypeFilter";
import {getSizeCookieFromRequestHeader} from "~/components/common/CommonFunctions";
import {fetchUserTypes} from "~/data/fetch-kodeverk";
import {TableHeaderLayout} from "~/components/common/Table/Header/TableHeaderLayout";

export async function loader({request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? "25"
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const userType = url.searchParams.get("userType") ?? "";
    const orgUnits = url.searchParams.get("orgUnits")?.split(",") ?? [];
    const [userList, responseOrgUnits, userTypesKodeverk] = await Promise.all([
        fetchUsers(request, size, page, search, [userType], orgUnits),
        fetchAllOrgUnits(request),
        fetchUserTypes(request)
    ]);

    return json({
        userList,
        orgUnitList: responseOrgUnits.orgUnits,
        size,
        userTypesKodeverk
    })
}

export default function UsersIndex() {
    const data = useLoaderData<typeof loader>();

    return (
        <div className={"content"}>
            <TableHeaderLayout
                title={"Brukere"}
                orgUnitsForFilter={data.orgUnitList}
                SearchComponent={<UserSearch/>}
                FilterComponents={<UserTypeFilter kodeverk={data.userTypesKodeverk}/>}
            />
            <UserTable/>
        </div>
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