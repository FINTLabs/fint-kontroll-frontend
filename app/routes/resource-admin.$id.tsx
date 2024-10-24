import styles from "../components/resource/resource.css?url"
import {Alert, Box, Button, Heading, HStack, VStack} from "@navikt/ds-react";
import {Link as RemixLink, Links, Meta, Scripts, useLoaderData, useNavigate, useRouteError} from "@remix-run/react";
import {IResource} from "~/data/types";
import {json} from "@remix-run/node";
import {LoaderFunctionArgs} from "@remix-run/router";
import {fetchResourceById} from "~/data/fetch-resources";
import {ResourceInfoBlock} from "~/components/resource-admin/ResourceInfoBlock";
import {ResourceDetailTable} from "~/components/resource-admin/ResourceDetailTable";
import {StatusTag} from "~/components/resource-admin/StatusTag";
import {ArrowRightIcon, PencilIcon} from "@navikt/aksel-icons";
import {ResponseAlert} from "~/components/common/ResponseAlert";
import {fetchResourceDataSource} from "~/data/fetch-kodeverk";

export function links() {
    return [{rel: 'stylesheet', href: styles}]
}

export async function loader({params, request}: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const [resource, source] = await Promise.all([
        fetchResourceById(request, params.id),
        fetchResourceDataSource(request)
    ]);

    return json({
        responseCode: url.searchParams.get("responseCode") ?? undefined,
        resource: await resource.json(),
        source
    })
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({params}) => (
        <HStack align={"start"}>
            <HStack justify={"center"}>
                <RemixLink to={`/resource-admin`}>Ressursadministrasjon</RemixLink>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem"/>
                <RemixLink to={`/resource-admin/${params.id}`}>Ressursinfo</RemixLink>
            </HStack>
        </HStack>
    )
}

export default function ResourceById() {
    const loaderData = useLoaderData<typeof loader>();
    const resource: IResource = loaderData.resource
    const source = loaderData.source
    const responseCode: string | undefined = loaderData.responseCode
    const navigate = useNavigate()

    return (
        <VStack gap="8">
            <VStack gap="4">
                {source === "gui" && (
                    <HStack justify={"end"} align={"end"}>
                        <Button role="link"
                                className={"no-underline-button"}
                                variant={"secondary"}
                                iconPosition="right" icon={<PencilIcon aria-hidden/>}
                                onClick={() => navigate(`/resource-admin/edit/resource/${resource.id}`)}>
                            Rediger ressurs
                        </Button>
                    </HStack>
                )}
                <HStack gap="8" align={"center"} justify={"center"}>
                    <Heading className={"heading"}
                             level="1"
                             size="xlarge"
                    >
                        {resource.resourceName}
                    </Heading>
                    <StatusTag status={resource.status}/>
                </HStack>
                <ResponseAlert
                    responseCode={responseCode}
                    successText={"Ressursen ble oppdatert!"}
                    deleteText={"Ressursen ble slettet!"}
                />
                <ResourceInfoBlock resource={resource}/>
            </VStack>

            <VStack gap="4">
                <Heading level="2" size="xlarge" align={"center"}>Tilgjengelig for følgende orgenheter</Heading>
                <HStack justify={"end"} align={"end"}>
                    <Button role="link"
                            className={"no-underline-button"}
                            variant={"secondary"}
                            iconPosition="right" icon={<PencilIcon aria-hidden/>}
                            onClick={() => navigate(`/resource-admin/resource/${resource.id}/edit/orgUnits`)}>
                        Rediger orgenheter
                    </Button>
                </HStack>
                <ResourceDetailTable resource={resource}/>
            </VStack>
        </VStack>
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