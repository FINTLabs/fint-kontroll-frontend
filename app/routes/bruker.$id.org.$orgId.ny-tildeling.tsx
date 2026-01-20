import { AssignResourceToUserTable } from '~/components/user/AssignResourceToUserTable';
import { Link, LoaderFunctionArgs, useLoaderData, useParams, useRouteError } from 'react-router';
import { fetchUserById } from '~/data/fetch-users';
import { fetchAllOrgUnits, fetchOrgUnitsWithParents, fetchResources } from '~/data/fetch-resources';
import { fetchAssignedResourcesForUser } from '~/data/fetch-assignments';
import { BASE_PATH } from '../../environment';
import { Alert, HStack, VStack } from '@navikt/ds-react';
import { ResourceSearch } from '~/components/resource/ResourceSearch';
import { ResponseAlert } from '~/components/common/ResponseAlert';
import { FilterByApplicationCategory } from '~/components/common/filter/FilterByApplicationCategory';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import React from 'react';
import { TableHeaderLayout } from '~/components/common/Table/Header/TableHeaderLayout';
import { getUserByIdUrl, getUserNewAssignmentUrl, USERS } from '~/data/paths';
import { IResourceAssignment, IResourceForList } from '~/data/types/resourceTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import { fetchApplicationCategories } from '~/data/fetch-kodeverk';
import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';

export async function loader({ params, request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '25';
    const page = url.searchParams.get('page') ?? '0';
    const search = url.searchParams.get('search') ?? '';
    const applicationcategory = url.searchParams.get('applicationcategory') ?? '';
    const accessType = url.searchParams.get('accesstype') ?? '';

    const user = await fetchUserById(request, params.id);

    const orgUnitTree = await fetchAllOrgUnits(request);

    const orgData = orgUnitTree.orgUnits.find((o) => o.organisationUnitId === params.orgId);

    if (!orgData) {
        throw new Response('Org unit not found', { status: 404 });
    }

    const orgId = orgData.id;

    const orgUnitParentsResponse = await fetchOrgUnitsWithParents(request, orgId);
    const parents = orgUnitParentsResponse.orgUnits ?? [];

    const allowedOrgUnitIds: string[] = [
        orgData.organisationUnitId,
        ...parents.map((o) => o.organisationUnitId),
    ];

    const resourceList = await fetchResources(
        request,
        size,
        page,
        search,
        allowedOrgUnitIds,
        applicationcategory,
        accessType,
        user.userType
    );

    const filter = resourceList.resources.map((value) => `&resourcefilter=${value.id}`).join('');

    const [assignedResourceListForUser, applicationCategoriesKodeverk] = await Promise.all([
        fetchAssignedResourcesForUser(request, params.id, size, '0', 'ALLTYPES', filter),
        fetchApplicationCategories(request),
    ]);

    const assignedResourcesMap: Map<number, IResourceAssignment> = new Map(
        assignedResourceListForUser.resources.map((resource) => [resource.resourceRef, resource])
    );

    const isAssignedResources: IResourceForList[] = resourceList.resources.map((resource) => ({
        ...resource,
        assigned: assignedResourcesMap.has(resource.id),
    }));

    return {
        responseCode: url.searchParams.get('responseCode') ?? undefined,
        resourceList,
        orgUnitList: orgUnitTree.orgUnits,
        assignedResourceList: assignedResourceListForUser,
        isAssignedResources,
        size,
        user,
        applicationCategories: applicationCategoriesKodeverk.map((ac) => ac.name),
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    };
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params }) => (
        <HStack align={'start'}>
            <HStack justify={'center'} align={'center'}>
                <Link to={USERS} className={'breadcrumb-link'}>
                    Brukere
                </Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem" />
                <Link to={getUserByIdUrl(params.id, params.orgId)} className={'breadcrumb-link'}>
                    Brukerinfo
                </Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem" />
                <Link
                    to={getUserNewAssignmentUrl(params.id, params.orgId)}
                    className={'breadcrumb-link'}>
                    Ny tildeling
                </Link>
            </HStack>
        </HStack>
    ),
};

export default function NewAssignmentForUser() {
    const data = useLoaderData<typeof loader>();
    const { id, orgId } = useParams<string>();

    return (
        <div className={'content'}>
            <TableHeaderLayout
                title={'Ny tildeling'}
                subTitle={data.user.fullName}
                FilterComponents={
                    <FilterByApplicationCategory
                        applicationCategories={data.applicationCategories}
                    />
                }
                SearchComponent={<ResourceSearch />}
            />
            <VStack gap="4">
                <ResponseAlert
                    responseCode={data.responseCode}
                    successText={'Tildelingen var vellykket!'}
                    deleteText={'Tildelingen ble slettet!'}
                />

                {id && orgId ? (
                    <AssignResourceToUserTable
                        isAssignedResources={data.isAssignedResources}
                        userId={id}
                        orgId={orgId}
                        size={data.size}
                        currentPage={data.resourceList.currentPage}
                        totalPages={data.resourceList.totalPages}
                        totalItems={data.resourceList.totalItems}
                    />
                ) : (
                    <>
                        <Alert variant="error">Data mangler for å hente ressurser.</Alert>
                    </>
                )}
            </VStack>
        </div>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
