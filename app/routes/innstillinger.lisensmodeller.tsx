import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router';
import React from 'react';
import { HStack, VStack } from '@navikt/ds-react';
import { BASE_PATH } from '../../environment';
import { fetchLicenseModels } from '~/data/fetch-kodeverk';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import {
    getLicenseModelDeleteUrl,
    getLicenseModelEditUrl,
    SETTINGS,
    SETTINGS_LICENSE_MODEL,
    SETTINGS_LICENSE_MODEL_CREATE,
} from '~/data/paths';
import { EditableList } from '~/components/settings/KodeverkEditableList/EditableList';
import { SettingsHeader } from '~/components/settings/SettingsHeader';
import { IKodeverkLicenseModel } from '~/data/types/kodeverkTypes';

export const handle = {
    breadcrumb: () => (
        <HStack align={'start'}>
            <HStack justify={'center'} align={'center'}>
                <Link to={SETTINGS} className={'breadcrumb-link'}>
                    Innstillinger
                </Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem" />
                <Link to={SETTINGS_LICENSE_MODEL} className={'breadcrumb-link'}>
                    Lisensmodeller
                </Link>
            </HStack>
        </HStack>
    ),
};

export async function loader({ request }: LoaderFunctionArgs) {
    const licenseModels = await fetchLicenseModels(request);
    return {
        licenseModels,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    };
}

export default function SettingsApplicationCategory() {
    const loaderData = useLoaderData<typeof loader>();
    const licenseModels: IKodeverkLicenseModel[] = loaderData.licenseModels;
    const basePath = loaderData.basePath;

    return (
        <div className={'content'}>
            <VStack gap="4">
                <SettingsHeader
                    title={'Lisensmodeller'}
                    text={
                        'Her kan du legge til, endre og slette lisensmodeller. ' +
                        'I fremtiden vil det komme mer funksjonalitet knyttet til lisensmodeller.'
                    }
                />

                <EditableList
                    list={licenseModels}
                    getEditUrl={getLicenseModelEditUrl}
                    getDeleteUrl={getLicenseModelDeleteUrl}
                    createNewUrl={`${basePath}${SETTINGS_LICENSE_MODEL_CREATE}`}
                />
            </VStack>
        </div>
    );
}
