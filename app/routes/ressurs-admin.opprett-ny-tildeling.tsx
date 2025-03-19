import { Button, ExpansionCard, HStack, Switch, VStack } from '@navikt/ds-react';
import {
    Form,
    useActionData,
    useLoaderData,
    useNavigate,
    useRouteError,
    useSearchParams,
} from '@remix-run/react';
import { LoaderFunctionArgs } from '@remix-run/router';
import { useEffect, useState } from 'react';
import { fetchAllOrgUnits } from '~/data/fetch-resources';
import { fetchAccessRoles } from '~/data/kontrollAdmin/kontroll-admin-define-role';
import { IResourceModuleAssignment, IResourceModuleUser } from '~/data/types/resourceTypes';
import TildelUsersTable from '../components/resource-module-admin/opprettTildeling/TildelUsersTable';
import {
    fetchUsersWhoCanGetAssignments,
    postNewTildelingForUser,
} from '~/data/resourceAdmin/resource-admin';
import styles from '../components/resource-module-admin/resourceModuleAdmin.css?url';
import OrgUnitTreeSelector from '../components/org-unit-selector/OrgUnitTreeSelector';
import SummaryOfTildeling from '../components/resource-module-admin/opprettTildeling/SummaryOfTildeling';
import ChooseAccessRole from '../components/resource-module-admin/opprettTildeling/ChooseAccessRole';
import { CheckmarkCircleIcon } from '@navikt/aksel-icons';
import { ActionFunctionArgs } from '@remix-run/node';
import { toast } from 'react-toastify';
import { RESOURCE_ADMIN } from '~/data/paths';
import { IUnitItem, IUnitTree } from '~/data/types/orgUnitTypes';
import { ErrorMessage } from '~/components/common/ErrorMessage';
import { getErrorTextFromResponse } from '~/data/helpers';
import { TableHeader } from '~/components/common/Table/Header/TableHeader';

import { getSizeCookieFromRequestHeader } from '~/utils/cookieHelpers';

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

const loopAndSetIsCheck = (orgUnitTree: IUnitTree): IUnitTree => {
    const newList = orgUnitTree.orgUnits.map((orgUnit) => ({
        ...orgUnit,
        isChecked: false,
    }));
    return {
        ...orgUnitTree,
        orgUnits: newList,
    };
};

export async function loader({ request }: LoaderFunctionArgs) {
    const auth = request;
    const url = new URL(request.url);
    const currentPage = url.searchParams.get('page') ?? '0';
    const orgUnitIds = url.searchParams.get('orgUnits')?.split(',') ?? [];
    const name = url.searchParams.get('search') ?? '';
    const roleFilter = url.searchParams.get('accessroleid') ?? '';
    const size = getSizeCookieFromRequestHeader(request)?.value ?? '10';

    const [usersPage, accessRoles, allOrgUnits] = await Promise.all([
        fetchUsersWhoCanGetAssignments(
            auth,
            Number(currentPage),
            Number(size),
            orgUnitIds,
            name,
            roleFilter
        ),
        fetchAccessRoles(auth),
        fetchAllOrgUnits(auth),
    ]);

    const orgUnitsWithIsChecked = loopAndSetIsCheck(allOrgUnits);

    return {
        usersPage: usersPage,
        accessRoles: accessRoles,
        allOrgUnits: orgUnitsWithIsChecked.orgUnits,
        size: size,
    };
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const resourceId = formData.get('resourceId') as string; // resourceId is the unique ID of a user
    const accessRoleId = formData.get('accessRoleId') as string;
    const scopeId = formData.get('scopeId') as string;
    const orgUnits = String(formData.get('orgUnits')).split(',') ?? [];
    let includeSubOrgUnits: string | boolean = formData.get('includeSubOrgUnits') as string;
    includeSubOrgUnits = includeSubOrgUnits === 'true';

    const res = await postNewTildelingForUser(
        request.headers.get('Authorization'),
        resourceId,
        accessRoleId,
        scopeId,
        orgUnits,
        includeSubOrgUnits
    );

    if (res?.ok) {
        return {
            status: true,
            redirect: RESOURCE_ADMIN,
            message: 'Tildeling gjennomført!',
        };
    } else {
        const errorMessage = await getErrorTextFromResponse(res);
        if (errorMessage.includes('User already has assignments for this role')) {
            return {
                status: false,
                redirect: null,
                message: 'Brukeren har allerede tildelinger for denne rollen.',
            };
        }

        return {
            status: false,
            redirect: null,
            message: 'En feil oppstod ved forsøkt lagring. Prøv igjen.',
        };
    }
};

export default function ResourceModuleAdminTabTildel() {
    const { usersPage, accessRoles, allOrgUnits, size } = useLoaderData<typeof loader>();

    const actionData = useActionData<typeof action>();
    const navigate = useNavigate();

    const [newAssignment, setNewAssignment] = useState<IResourceModuleAssignment>({
        user: null,
        accessRoleId: '',
        scopeId: 1 /* TODO: This is bound to be changed in the future to allow scope definitions to be selected in the frontend. For now, it is defaulted to "1" */,
        orgUnits: [],
        includeSubOrgUnits: false,
    });

    const [selectedOrgUnits, setSelectedOrgUnits] = useState<IUnitItem[]>([]);
    const [includeSubOrgUnitsState, setIncludeSubOrgUnitsState] = useState(
        newAssignment.includeSubOrgUnits
    );

    const [searchParams] = useSearchParams();

    useEffect(() => {
        // If changed urlParam, reset selected user to null if it is selected
        if (newAssignment.user) {
            setNewAssignment({ ...newAssignment, user: null });
        }
    }, [searchParams]);

    useEffect(() => {
        if (!actionData) {
            return;
        }
        if (!actionData?.status) {
            toast.error(actionData.message);
            return;
        }

        if (actionData?.status) {
            toast.success(actionData.message);
            actionData.redirect ? navigate(actionData.redirect) : null;
            return;
        }
    }, [actionData]);

    useEffect(() => {
        setNewAssignment({
            ...newAssignment,
            orgUnits: selectedOrgUnits.map((orgUnit) => orgUnit),
            includeSubOrgUnits: includeSubOrgUnitsState,
        });
    }, [selectedOrgUnits]);

    const handleSelectUser = (newUser: IResourceModuleUser) => {
        if (newAssignment.user?.resourceId === newUser.resourceId) {
            setNewAssignment({ ...newAssignment, user: null });
            return;
        }
        setNewAssignment({ ...newAssignment, user: newUser });
    };

    const handleChangeIncludeSubOrgUnits = () => {
        setIncludeSubOrgUnitsState(!includeSubOrgUnitsState);
    };

    const setNewAccessRole = (accessRoleId: string) => {
        setNewAssignment({ ...newAssignment, accessRoleId: accessRoleId });
    };

    const handleSubmit = () => {
        event?.preventDefault();
        const resourceIdEle = document.getElementById('resourceId');
        const accessRoleIdEle = document.getElementById('accessRoleId');
        const scopeIdEle = document.getElementById('scopeId');
        const orgUnitsEle = document.getElementById('orgUnits');
        const includeSubOrgUnitsEle = document.getElementById('includeSubOrgUnits');

        const orgUnitsFromAssignment = newAssignment.orgUnits.map((org) => org.organisationUnitId);

        resourceIdEle
            ? resourceIdEle.setAttribute('value', newAssignment.user?.resourceId ?? '')
            : '';
        accessRoleIdEle ? accessRoleIdEle.setAttribute('value', newAssignment.accessRoleId) : '';
        scopeIdEle ? scopeIdEle.setAttribute('value', String(newAssignment.scopeId)) : '';
        orgUnitsEle ? orgUnitsEle.setAttribute('value', String(orgUnitsFromAssignment)) : '';
        includeSubOrgUnitsEle
            ? includeSubOrgUnitsEle.setAttribute('value', String(newAssignment.includeSubOrgUnits))
            : '';
    };

    return (
        <section className={'content tildeling-section-container'}>
            <VStack gap={'8'}>
                <TableHeader title="Tildel rettigheter" isSubHeader={true} />
                <ExpansionCard
                    size="small"
                    aria-label="Small-variant"
                    defaultOpen={true}
                    className={newAssignment.user ? 'expansion-green' : ''}>
                    <ExpansionCard.Header>
                        {newAssignment.user ? (
                            <ExpansionCard.Title>
                                <HStack align={'center'} gap={'2'}>
                                    <CheckmarkCircleIcon /> Bruker valgt
                                </HStack>
                            </ExpansionCard.Title>
                        ) : (
                            <ExpansionCard.Title>
                                Finn brukeren å tildele rettigheter til
                            </ExpansionCard.Title>
                        )}
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack paddingBlock={'0 8'} paddingInline={'4'}>
                            <TildelUsersTable
                                newAssignment={newAssignment}
                                usersPage={usersPage}
                                handleSelectUser={handleSelectUser}
                                size={size}
                                allOrgUnits={allOrgUnits}
                                accessRoles={accessRoles}
                            />
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>

                <ExpansionCard
                    size="small"
                    aria-label="Small-variant"
                    defaultOpen={true}
                    className={newAssignment.accessRoleId ? 'expansion-green' : ''}>
                    <ExpansionCard.Header>
                        {newAssignment.accessRoleId ? (
                            <ExpansionCard.Title>
                                <HStack align={'center'} gap={'2'}>
                                    <CheckmarkCircleIcon /> Rolle valgt
                                </HStack>
                            </ExpansionCard.Title>
                        ) : (
                            <ExpansionCard.Title>Velg rolle</ExpansionCard.Title>
                        )}
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack padding={'4'}>
                            <ChooseAccessRole
                                accessRoles={accessRoles}
                                setNewAccessRole={setNewAccessRole}
                            />
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>

                <ExpansionCard
                    size="small"
                    aria-label="Small-variant"
                    defaultOpen={true}
                    className={newAssignment.orgUnits.length > 0 ? 'expansion-green' : ''}>
                    <ExpansionCard.Header>
                        {newAssignment.orgUnits.length > 0 ? (
                            <ExpansionCard.Title>
                                <HStack align={'center'} gap={'2'}>
                                    <CheckmarkCircleIcon /> Organisasjonsenheter valgt
                                </HStack>
                            </ExpansionCard.Title>
                        ) : (
                            <ExpansionCard.Title>Legg til organisasjonsenheter</ExpansionCard.Title>
                        )}
                    </ExpansionCard.Header>
                    <ExpansionCard.Content>
                        <VStack padding={'4'}>
                            <Switch
                                onClick={() => handleChangeIncludeSubOrgUnits()}
                                checked={includeSubOrgUnitsState}>
                                Inkluder underliggende enheter
                            </Switch>

                            <OrgUnitTreeSelector
                                orgUnitList={allOrgUnits}
                                selectedOrgUnits={selectedOrgUnits}
                                setSelectedOrgUnits={(newSelected) =>
                                    setSelectedOrgUnits(newSelected)
                                }
                                includeSubOrgUnitsState={includeSubOrgUnitsState}
                            />
                        </VStack>
                    </ExpansionCard.Content>
                </ExpansionCard>

                <div className={'tildeling-section'}>
                    <SummaryOfTildeling assignment={newAssignment} accessRoles={accessRoles} />
                    <Form method={'post'} onSubmit={handleSubmit}>
                        <input type={'hidden'} name={'resourceId'} id={'resourceId'} />
                        <input type={'hidden'} name={'accessRoleId'} id={'accessRoleId'} />
                        <input type={'hidden'} name={'scopeId'} id={'scopeId'} />
                        <input type={'hidden'} name={'orgUnits'} id={'orgUnits'} />
                        <input
                            type={'hidden'}
                            name={'includeSubOrgUnits'}
                            id={'includeSubOrgUnits'}
                        />
                        <Button
                            disabled={
                                !newAssignment.user ||
                                newAssignment.orgUnits.length === 0 ||
                                !newAssignment.accessRoleId
                            }>
                            Lagre tildeling
                        </Button>
                    </Form>
                </div>
            </VStack>
        </section>
    );
}

export function ErrorBoundary() {
    const error: any = useRouteError();
    return <ErrorMessage error={error} />;
}
