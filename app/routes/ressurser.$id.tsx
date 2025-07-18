import React, { useCallback, useEffect, useState } from 'react';
import styles from '../components/resource/resource.css?url';
import { HStack, Loader, Tabs, VStack } from '@navikt/ds-react';
import type { LoaderFunctionArgs } from 'react-router';
import {
    Link,
    Outlet,
    useLoaderData,
    useLocation,
    useNavigate,
    useParams,
    useRouteError,
} from 'react-router';
import { fetchResourceById } from '~/data/fetch-resources';
import { BASE_PATH } from '../../environment';
import { fetchUserTypes } from '~/data/fetch-kodeverk';
import { TableHeader } from '~/components/common/Table/Header/TableHeader';
import { PersonGroupIcon, PersonIcon } from '@navikt/aksel-icons';
import { useLoadingState } from '~/utils/customHooks';
import { getResourceNewAssignmentUrl, RESOURCES } from '~/data/paths';
import { IResource } from '~/data/types/resourceTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import { SecondaryAddNewLinkButton } from '~/components/common/Buttons/SecondaryAddNewLinkButton';
import { ResourceLicenseTable } from '~/components/resource/ResourceLicenseTable';
import { InfoBox } from '~/components/common/InfoBox';
import { translateUserTypeToLabel } from '~/utils/translators';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export async function loader({ params, request }: LoaderFunctionArgs) {
    const [resource, userTypeKodeverk] = await Promise.all([
        fetchResourceById(request, params.id),
        fetchUserTypes(request),
    ]);

    return {
        resource,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
        userTypeKodeverk,
    };
}

export const handle = {
    breadcrumb: () => (
        <Link to={RESOURCES} className={'breadcrumb-link'}>
            Ressurser
        </Link>
    ),
};

// TODO: remove commented code when licence is ready in backend
export default function ResourceById() {
    const loaderData = useLoaderData<typeof loader>();
    const resource: IResource = loaderData.resource;
    const { userTypeKodeverk } = loaderData;

    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const { loading, fetching } = useLoadingState();

    const [state, setState] = useState(
        location.pathname.includes('/bruker-tildelinger')
            ? 'bruker-tildelinger'
            : 'gruppe-tildelinger'
    );

    const handleChangeTab = useCallback(
        (value: string) => {
            navigate(`/ressurser/${params.id}/${value}`);
            setState(value);
        },
        [navigate, params.id]
    );

    useEffect(() => {
        if (location.pathname.includes('/bruker-tildelinger')) {
            setState('bruker-tildelinger');
        } else {
            setState('gruppe-tildelinger');
        }
    }, [location.pathname]);

    return (
        <section className={'content'}>
            <VStack gap="4">
                <InfoBox
                    title={resource.resourceName}
                    info={[
                        {
                            label: 'Applikasjonskategori',
                            value: resource.applicationCategory.join(', '),
                        },
                        { label: 'Ressurstype', value: resource.resourceType },
                        { label: 'Ressurseier', value: resource.resourceOwnerOrgUnitName },
                        { label: 'Antall lisenser', value: resource.resourceLimit.toString() },
                        {
                            label: 'Gyldig for',
                            value:
                                resource.validForRoles
                                    .map((role) => translateUserTypeToLabel(role, userTypeKodeverk))
                                    .join(', ') + '.',
                        },
                        ...(resource.validForOrgUnits.length === 1
                            ? [
                                  {
                                      label: `Lisenser for ${resource.validForOrgUnits[0].orgUnitName}`,
                                      value: resource.validForOrgUnits[0].assignedResources
                                          ? `${resource.validForOrgUnits[0].assignedResources} er tildelt av ${resource.validForOrgUnits[0].resourceLimit} tilgjengelige.`
                                          : resource.validForOrgUnits[0].resourceLimit
                                            ? `${resource.validForOrgUnits[0].resourceLimit} lisenser`
                                            : '',
                                  },
                              ]
                            : []),
                    ]}
                    moreInfo={[
                        {
                            label: 'KildesystemID',
                            value: resource.resourceId,
                        },
                        {
                            label: 'Gruppenavn Entra ID',
                            value: resource.identityProviderGroupName,
                        },
                    ]}
                    moreInfoComponent={
                        resource.validForOrgUnits.length > 1 &&
                        resource.validForOrgUnits.some((unit) => !!unit.resourceLimit) ? (
                            <ResourceLicenseTable resource={resource} />
                        ) : undefined
                    }
                />

                <HStack paddingBlock={'8 0'}>
                    <TableHeader
                        isSubHeader={true}
                        title={'Tildelinger'}
                        HeaderButton={
                            <SecondaryAddNewLinkButton
                                label="Ny tildeling"
                                handleOnClick={() =>
                                    navigate(
                                        `${getResourceNewAssignmentUrl(resource.id)}/${state === 'bruker-tildelinger' ? 'brukere' : 'grupper'}`
                                    )
                                }
                            />
                        }
                    />
                </HStack>
                <Tabs value={state} onChange={handleChangeTab}>
                    <Tabs.List>
                        <Tabs.Tab
                            value="bruker-tildelinger"
                            label="Brukere"
                            icon={<PersonIcon fontSize="1.2rem" />}
                        />
                        <Tabs.Tab
                            value="gruppe-tildelinger"
                            label="Grupper"
                            icon={<PersonGroupIcon fontSize="1.2rem" />}
                        />
                    </Tabs.List>

                    {loading && !fetching && (
                        <HStack margin={'4'} width="100%" justify="center">
                            <Loader size="2xlarge" title="Venter..." />
                        </HStack>
                    )}
                    <Outlet context={{ resource }} />
                </Tabs>
            </VStack>
        </section>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
