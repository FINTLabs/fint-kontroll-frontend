import {
    ActionFunctionArgs,
    Link,
    LinksFunction,
    LoaderFunctionArgs,
    redirect,
    useLoaderData,
    useNavigation,
} from 'react-router';
import React from 'react';
import { HStack, Loader } from '@navikt/ds-react';
import { IValidForOrgUnits } from '~/components/service-admin/types';
import resourceAdmin from '~/components/service-admin/serviceAdmin.css?url';
import { fetchAllOrgUnits, fetchResourceById, updateResource } from '~/data/fetch-resources';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import {
    fetchApplicationCategories,
    fetchLicenseEnforcements,
    fetchUserTypes,
} from '~/data/fetch-kodeverk';
import { ResourceForm } from '~/components/service-admin/resourceForm/ResourceForm';
import { getEditResourceUrl, getResourceByIdUrl, SERVICE_ADMIN } from '~/data/paths';
import { prepareQueryParamsWithResponseCode } from '~/utils/searchParamsHelpers';

export const handle = {
    breadcrumb: ({ params }: { params: any }) => (
        <HStack align={'start'}>
            <HStack justify={'center'} align={'center'}>
                <Link to={SERVICE_ADMIN} className={'breadcrumb-link'}>
                    Ressursadministrasjon
                </Link>
                <ArrowRightIcon fontSize="1.5rem" />
                <Link to={getResourceByIdUrl(params.id)} className={'breadcrumb-link'}>
                    Ressursinfo
                </Link>
                <ArrowRightIcon fontSize="1.5rem" />
                <Link to={getEditResourceUrl(params.id)} className={'breadcrumb-link'}>
                    Rediger ressurs
                </Link>
            </HStack>
        </HStack>
    ),
};

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: resourceAdmin }];

export async function loader({ params, request }: LoaderFunctionArgs) {
    const auth = request;

    const [allOrgUnits, resource, applicationCategories, userTypes, licenseEnforcements] =
        await Promise.all([
            fetchAllOrgUnits(auth),
            fetchResourceById(request, params.id),
            fetchApplicationCategories(auth),
            fetchUserTypes(auth),
            fetchLicenseEnforcements(auth),
        ]);

    return {
        resource,
        applicationCategories,
        userTypes,
        allOrgUnits,
        licenseEnforcements,
    };
}

export default function EditApplikasjonsRessurs() {
    const { resource, applicationCategories, userTypes, allOrgUnits, licenseEnforcements } =
        useLoaderData<typeof loader>();
    const response = useNavigation();

    if (response.state === 'loading') {
        return (
            <div className={'spinner'}>
                <Loader size="3xlarge" title="Venter..." />
            </div>
        );
    }
    return (
        <ResourceForm
            resource={resource}
            allOrgUnits={allOrgUnits.orgUnits}
            applicationCategories={applicationCategories}
            userTypes={userTypes}
            licenseEnforcements={licenseEnforcements}
        />
    );
}

export async function action({ request }: ActionFunctionArgs) {
    const data = await request.formData();
    const { searchParams } = new URL(request.url);
    const id = parseInt(data.get('id') as string);
    const resourceId = data.get('resourceId') as string;
    const resourceName = data.get('resourceName') as string;
    const resourceType = data.get('resourceType') as string;
    const platform = String(data.get('platform')).split(',') ?? [];
    const accessType = data.get('accessType') as string;
    const resourceLimit = parseInt(data.get('resourceLimit') as string);
    const resourceOwnerOrgUnitId = data.get('resourceOwnerOrgUnitId') as string;
    const resourceOwnerOrgUnitName = data.get('resourceOwnerOrgUnitName') as string;
    let validForOrgUnits: IValidForOrgUnits[] = [];
    const validForOrgUnitsString = data.get('validForOrgUnits') as string | null;

    if (validForOrgUnitsString) {
        validForOrgUnits = JSON.parse(validForOrgUnitsString);
    }

    const validForRoles = String(data.get('validForRoles')).split(',') ?? [];
    const applicationCategory = String(data.get('applicationCategory')).split(',') ?? [];
    const hasCost = data.get('hasCost') === 'true';
    const licenseEnforcement = data.get('licenseEnforcement') as string;
    const unitCost = data.get('unitCost') as string;
    const status = data.get('status') as string;
    const response = await updateResource(
        request.headers.get('Authorization'),
        id,
        resourceId,
        resourceName,
        resourceType,
        platform,
        accessType,
        resourceLimit,
        resourceOwnerOrgUnitId,
        resourceOwnerOrgUnitName,
        validForOrgUnits,
        validForRoles,
        applicationCategory,
        hasCost,
        licenseEnforcement,
        unitCost,
        status
    );

    return redirect(
        `${getResourceByIdUrl(Number(data.get('id')))}${prepareQueryParamsWithResponseCode(searchParams).length > 0 ? prepareQueryParamsWithResponseCode(searchParams) + '&responseCode=' + response.status : '?responseCode=' + response.status}`
    );
}
