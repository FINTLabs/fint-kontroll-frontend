import styles from '../components/user/user.css?url';
import { HStack, Tabs, VStack } from '@navikt/ds-react';
import {
    Link,
    LoaderFunctionArgs,
    useLoaderData,
    useNavigate,
    useParams,
    useRouteError,
} from 'react-router';
import { fetchUserById } from '~/data/fetch-users';
import { fetchAssignmentsForUser } from '~/data/fetch-assignments';
import { AssignmentsForUserTable } from '~/components/user/AssignmentsForUserTable';
import { BASE_PATH } from '../../environment';
import { ResponseAlert } from '~/components/common/ResponseAlert';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import {
    DEVICES,
    getDeviceGroupByIdUrl,
    getUserByIdUrl,
    getUserNewAssignmentUrl,
    USERS,
} from '~/data/paths';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import React from 'react';
import { TableHeader } from '~/components/common/Table/Header/TableHeader';
import { SecondaryAddNewLinkButton } from '~/components/common/Buttons/SecondaryAddNewLinkButton';
import { InfoBox } from '~/components/common/InfoBox';
import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';
import { TableHeaderLayout } from '~/components/common/Table/Header/TableHeaderLayout';
import { Search } from '~/components/common/Search';
import { MemberTable } from '~/components/role/MemberTable';
import { DeviceTable } from '~/components/device/DeviceTable';
import { DeviceUnitTable } from '~/components/device/DeviceUnitTable';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export const handle = {
    // @ts-ignore
    breadcrumb: ({ params }) => (
        <HStack align={'start'}>
            <HStack justify={'center'} align={'center'}>
                <Link to={getDeviceGroupByIdUrl(params.id)} className={'breadcrumb-link'}>
                    info
                </Link>
            </HStack>
        </HStack>
    ),
};

export default function DeviceGroupInfo() {
    const navigate = useNavigate();
    const params = useParams();

    return (
        <section>
            <Tabs value={'info'}>
                <VStack gap="4">
                    <Tabs.Panel value="info">
                        <InfoBox
                            title={'Informasjon om maskingruppen'}
                            info={[
                                { label: 'Navn', value: 'VGMIDT Utlånspc-er' },
                                { label: 'SystemId', value: '12_103' },
                                {
                                    label: 'Organisasjonsenhet',
                                    value: 'VGMIDT Midtbyen videregående skole',
                                },
                                { label: 'Plattform', value: 'MAC OS' },
                            ]}
                            maxColumns={2}
                        />
                    </Tabs.Panel>
                    <TableHeaderLayout
                        title={'Digitale enheter i maskingruppen'}
                        isSubHeader={true}
                        SearchComponent={<Search label={'Søk etter maskin'} id={'search-device'} />}
                    />
                    <DeviceUnitTable />
                </VStack>
            </Tabs>
        </section>
        /*<section className={'content'}>
            <VStack gap="12">
                <InfoBox
                    title={'Maskingruppeinformasjon'}
                    info={[
                        { label: 'Navn', value: 'VGMIDT Utlånspc-er' },
                        { label: 'SystemId', value: '12_103' },
                        {
                            label: 'Organisasjonsenhet',
                            value: 'VGMIDT Midtbyen videregående skole',
                        },
                        { label: 'Plattform', value: 'MAC OS' },
                    ]}
                    maxColumns={2}
                />

                <VStack gap="8">
                    <TableHeader
                        isSubHeader={true}
                        title={'Brukeren er tildelt følgende ressurser'}
                        HeaderButton={
                            <SecondaryAddNewLinkButton
                                label="Ny tildeling"
                                handleOnClick={() =>
                                    navigate(`${getUserNewAssignmentUrl(3, params.orgId)}`)
                                }
                            />
                        }
                    />
                    {/!*<ResponseAlert
                        responseCode={responseCode}
                        successText={'Tildelingen var vellykket!'}
                        deleteText={'Tildelingen ble slettet!'}
                    />*!/}
                </VStack>
            </VStack>
        </section>*/
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
