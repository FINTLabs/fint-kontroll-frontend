import React from 'react';
import {UserTable} from "~/components/user/UserTable";
import {UserSearch} from "~/components/user/UserSearch";
import {Box, Button, Heading} from "@navikt/ds-react";
import {Buldings3Icon} from "@navikt/aksel-icons";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {fetchUsers} from "~/data/fetch-users";
import type {IUserPage} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";

export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const response = await fetchUsers(request.headers.get("Authorization"), size, page, search);
    return json(await response.json());
}

export default function UsersIndex() {
    const userPage = useLoaderData<IUserPage>();

    return (
        <div className={"content"}>
            <div className={"toolbar"}>
                <Heading className={"heading"} level="1" size="xlarge">Brukere</Heading>
                <Box className={"filters"} paddingBlock={"4 16"}>
                    <div>
                        <Button
                            variant={"secondary"}
                            icon={<Buldings3Icon title="a11y-title" fontSize="1.5rem"/>}
                            iconPosition={"right"}
                            onClick={() => {
                            }}
                        >
                            Velg orgenhet
                        </Button>
                    </div>
                    <div>
                        <UserSearch/>
                    </div>
                </Box>
            </div>
            <UserTable userPage={userPage}/>
        </div>
    );
}