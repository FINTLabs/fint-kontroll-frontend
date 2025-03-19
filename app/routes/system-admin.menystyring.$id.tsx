import { LoaderFunctionArgs } from '@remix-run/router';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { useLoaderData, useParams, useSubmit } from '@remix-run/react';
import React from 'react';

import styles from '../components/kontroll-admin/kontroll-admin.css?url';
import {
    deleteMenuItemsForRole,
    fetchAllMenuItems,
    fetchMenuItemsForRole,
    postMenuItemsForRole,
} from '~/data/fetch-menu-settings';
import { BodyShort, Heading, Switch, VStack } from '@navikt/ds-react';
import { groupMenuItems } from '~/utils/helperFunctions';

export async function loader({ params, request }: LoaderFunctionArgs) {
    const [menuItems, accessRoleMenu] = await Promise.all([
        fetchAllMenuItems(request),
        fetchMenuItemsForRole(request, params.id),
    ]);
    return json({
        menuItems,
        accessRoleMenu,
    });
}

export function links() {
    return [{ rel: 'stylesheet', href: styles }];
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const roleId = String(formData.get('roleId'));
    const menuItemId = String(formData.get('menuItemId'));
    if (roleId && menuItemId) {
        if (request.method === 'POST') {
            const response = await postMenuItemsForRole(request, roleId, menuItemId);
            return { didUpdate: !!response };
        } else if (request.method === 'DELETE') {
            const response = await deleteMenuItemsForRole(request, roleId, menuItemId);
            return { didUpdate: response.status === 204 };
        }
    }
}

const SystemAdminMenuSettingsForm = () => {
    const { menuItems, accessRoleMenu } = useLoaderData<typeof loader>();
    const params = useParams();
    const roleId = params.id;
    const submit = useSubmit();

    const setCheckedValue = (value: string | null, checked: boolean) => {
        const formData = new FormData();
        if (roleId && value) {
            formData.append('roleId', roleId);
            formData.append('menuItemId', value);
            submit(formData, { method: checked ? 'post' : 'delete' });
        }
    };

    const isChecked = (currentId: number | undefined): boolean => {
        return !!accessRoleMenu.menuItems?.some((roleMenuItem) => roleMenuItem.id === currentId);
    };

    return (
        <VStack className={'tab-content-container'} padding={'4'} marginBlock={'8'}>
            <Heading size={'medium'}>Menypunkter for {accessRoleMenu.name}</Heading>

            {groupMenuItems(menuItems).map((menuItem) => (
                <div key={menuItem.id}>
                    <Switch
                        key={menuItem.id}
                        value={menuItem.id}
                        checked={isChecked(menuItem.id)}
                        onChange={(e) => setCheckedValue(e.target.value, e.target.checked)}
                        disabled={roleId === 'sa'}>
                        <BodyShort size={'large'} weight={'semibold'}>
                            {menuItem.text}
                        </BodyShort>
                    </Switch>
                    {'children' in menuItem && (
                        <VStack paddingInline={'8'}>
                            {menuItem.children.map((menuItemChild) => {
                                return (
                                    <Switch
                                        key={menuItemChild.id}
                                        value={menuItemChild.id}
                                        checked={isChecked(menuItemChild.id)}
                                        onChange={(e) =>
                                            setCheckedValue(e.target.value, e.target.checked)
                                        }
                                        disabled={roleId === 'sa'}>
                                        {menuItemChild.text}
                                    </Switch>
                                );
                            })}
                        </VStack>
                    )}
                </div>
            ))}
        </VStack>
    );
};

export default SystemAdminMenuSettingsForm;
