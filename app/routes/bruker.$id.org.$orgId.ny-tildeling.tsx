import { AssignResourceToUserTable } from '~/components/user/AssignResourceToUserTable';
import { Link, useLoaderData, useParams, useRouteError } from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/router';
import { fetchUserById } from '~/data/fetch-users';
import { fetchAllOrgUnits, fetchResources } from '~/data/fetch-resources';
import { fetchAssignedResourcesForUser } from '~/data/fetch-assignments';
import { json } from '@remix-run/node';
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
    const orgUnits = url.searchParams.get('orgUnits')?.split(',') ?? [];
    const applicationcategory = url.searchParams.get('applicationcategory') ?? '';
    const accessType = url.searchParams.get('accesstype') ?? '';

    const user = await fetchUserById(request, params.id);
    const resourceList = await fetchResources(
        request,
        size,
        page,
        search,
        orgUnits,
        applicationcategory,
        accessType,
        user.userType
    );

    const filter = resourceList.resources.map((value) => `&resourcefilter=${value.id}`).join('');

    const [orgUnitTree, assignedResourceListForUser, applicationCategoriesKodeverk] =
        await Promise.all([
            fetchAllOrgUnits(request),
            fetchAssignedResourcesForUser(request, params.id, size, '0', 'ALLTYPES', filter),
            fetchApplicationCategories(request),
        ]);

    const assignedResourcesMap: Map<number, IResourceAssignment> = new Map(
        assignedResourceListForUser.resources.map((resource) => [resource.resourceRef, resource])
    );
    const isAssignedResources: IResourceForList[] = resourceList.resources.map((resource) => {
        return {
            ...resource,
            assigned: assignedResourcesMap.has(resource.id),
        };
    });

    return json({
        responseCode: url.searchParams.get('responseCode') ?? undefined,
        resourceList,
        orgUnitList: orgUnitTree.orgUnits,
        assignedResourceList: assignedResourceListForUser,
        isAssignedResources,
        size,
        user,
        applicationCategories: applicationCategoriesKodeverk.map((ac) => ac.name),
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    });
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
                        basePath={data.basePath}
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
