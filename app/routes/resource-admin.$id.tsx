import styles from "../components/resource/resource.css?url"
import {Alert, Box, Button, Heading, HStack, VStack} from "@navikt/ds-react";
import {
    Link as RemixLink,
    Links,
    Meta,
    Scripts,
    useLoaderData,
    useNavigate,
    useRouteError
} from "@remix-run/react";
import {IKodeverkUserType, IResource} from "~/data/types";
import {json} from "@remix-run/node";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchResourceById} from "~/data/fetch-resources";
import {ResourceDetailTable} from "~/components/resource-admin/ResourceDetailTable";
import {ArrowRightIcon, PencilIcon} from "@navikt/aksel-icons";
import {ResponseAlert} from "~/components/common/ResponseAlert";
import {fetchResourceDataSource, fetchUserTypes} from "~/data/fetch-kodeverk";
import {ResourceInfoBox} from "~/components/common/ResourceInfoBox";
import React from "react";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const [resource, source] = await Promise.all([
        fetchResourceById(request, params.id),
        fetchResourceDataSource(request)
    ]);

    let userTypes: IKodeverkUserType[] = []
    if (source === "gui") {
        userTypes = await fetchUserTypes(request)
    }

    return json({
        responseCode: url.searchParams.get("responseCode") ?? undefined,
        resource: await resource.json(),
        source,
        userTypes
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({params}) => (
        <HStack align={"start"}>
            <HStack justify={"center"} align={"center"}>
                <RemixLink to={`/resource-admin`} className={"breadcrumb-link"}>Ressursadministrasjon</RemixLink>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <RemixLink to={`/resource-admin/${params.id}`} className={"breadcrumb-link"}>Ressursinfo</RemixLink>
            </HStack>
        </HStack>
    )
}

export default function ResourceById() {
    const loaderData = useLoaderData<typeof loader>();
    const {userTypes, source} = loaderData
    const resource: IResource = loaderData.resource
    const responseCode: string | undefined = loaderData.responseCode
    const navigate = useNavigate()

    return (
        <section className={"content"}>

            <VStack gap="12">
                <VStack gap="4">
                    {source === "gui" && (
                        <HStack justify={"end"} align={"end"}>
                            <Button
                                role="link"
                                className={"no-underline-button"}
                                variant={"secondary"}
                                iconPosition="right" icon={<PencilIcon aria-hidden/>}
                                onClick={() => navigate(`/resource-admin/edit/resource/${resource.id}`)}
                            >
                                Rediger ressurs
                            </Button>
                        </HStack>
                    )}
                    <ResponseAlert
                        responseCode={responseCode}
                        successText={"Ressursen ble oppdatert!"}
                        deleteText={"Ressursen ble slettet!"}
                    />

                    <ResourceInfoBox
                        resource={resource}
                        userTypes={userTypes}
                        isAdmin={true}
                    />

                </VStack>

                <VStack gap="4">
                    <Heading level="2" size="large" align={"center"} spacing>
                        Tilgjengelig for følgende organisasjonsenheter
                    </Heading>
                    {source === "gui" && (
                        <HStack justify={"end"} align={"end"}>
                            <Button
                                role="link"
                                className={"no-underline-button"}
                                variant={"secondary"}
                                iconPosition="right" icon={<PencilIcon aria-hidden/>}
                                onClick={() => navigate(`/resource-admin/resource/${resource.id}/edit/orgUnits`)}
                            >
                                Rediger organisasjonsenheter
                            </Button>
                        </HStack>
                    )}
                    <ResourceDetailTable resource={resource}/>
                </VStack>
            </VStack>
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