import React from 'react';
import {Box, Button, Heading} from "@navikt/ds-react";
import {Buldings3Icon} from "@navikt/aksel-icons";
import {json} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import type {IResourcePage} from "~/data/types";
import type {LoaderFunctionArgs} from "@remix-run/router";
import {fetchResources} from "~/data/fetch-resources";
import {ResourceTable} from "~/components/resource/ResourceTable";
import {ResourceSearch} from "~/components/resource/ResourceSearch";


export async function loader({params, request}: LoaderFunctionArgs): Promise<Omit<Response, "json"> & {
    json(): Promise<any>
}> {
    const url = new URL(request.url);
    const size = url.searchParams.get("size") ?? "10";
    const page = url.searchParams.get("page") ?? "0";
    const search = url.searchParams.get("search") ?? "";
    const response = await fetchResources(request.headers.get("Authorization"), size, page, search);
    return json(await response.json());
}

export default function Resource() {

    const resourcePage = useLoaderData<IResourcePage>();

    return (
        <div className={"content"}>
            <div className={"toolbar"}>
                <Heading className={"heading"} level="1" size="xlarge">Ressurser</Heading>
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
                        <ResourceSearch/>
                    </div>
                </Box>
            </div>
            <ResourceTable resourcePage={resourcePage}/>
        </div>
    );
}