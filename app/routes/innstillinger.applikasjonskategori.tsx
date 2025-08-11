import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router';
import React from 'react';
import { HStack, VStack } from '@navikt/ds-react';
import { BASE_PATH } from '../../environment';
import { fetchApplicationCategories } from '~/data/fetch-kodeverk';
import { ArrowRightIcon } from '@navikt/aksel-icons';
import {
    getApplicationCategoryDeleteUrl,
    getApplicationCategoryEditUrl,
    SETTINGS,
    SETTINGS_APPLICATION_CATEGORY,
    SETTINGS_APPLICATION_CATEGORY_CREATE,
} from '~/data/paths';
import { EditableList } from '~/components/settings/KodeverkEditableList/EditableList';
import { SettingsHeader } from '~/components/settings/SettingsHeader';
import { IKodeverkApplicationCategory } from '~/data/types/kodeverkTypes';

export const handle = {
    breadcrumb: () => (
        <HStack align={'start'}>
            <HStack justify={'center'} align={'center'}>
                <Link to={SETTINGS} className={'breadcrumb-link'}>
                    Innstillinger
                </Link>
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem" />
                <Link to={SETTINGS_APPLICATION_CATEGORY} className={'breadcrumb-link'}>
                    Applikasjonskategori
                </Link>
            </HStack>
        </HStack>
    ),
};

export async function loader({ request }: LoaderFunctionArgs) {
    const applicationCategories = await fetchApplicationCategories(request);
    return {
        applicationCategories,
        basePath: BASE_PATH === '/' ? '' : BASE_PATH,
    };
}

export default function SettingsApplicationCategory() {
    const loaderData = useLoaderData<typeof loader>();
    const applicationCategories: IKodeverkApplicationCategory[] = loaderData.applicationCategories;
    const basePath = loaderData.basePath;

    return (
        <div className={'content'}>
            <VStack gap="4">
                <SettingsHeader
                    title={'Applikasjonskategori'}
                    text={
                        'Her kan du legge til, endre og slette applikasjonskategorier. ' +
                        'Disse kategoriene brukes til å gruppere og beskrive ressurser. ' +
                        'Disse vil i fremtiden også kunne brukes til å begrense tilgang til ressurser. ' +
                        'I fremtiden vil det komme mer funksjonalitet knyttet til applikasjonskategori.'
                    }
                />

                <EditableList
                    list={applicationCategories}
                    getEditUrl={getApplicationCategoryEditUrl}
                    getDeleteUrl={getApplicationCategoryDeleteUrl}
                    createNewUrl={`${basePath}${SETTINGS_APPLICATION_CATEGORY_CREATE}`}
                    createNewText={'Legg til ny kategori'}
                />
            </VStack>
        </div>
    );
}
