import React, { useCallback, useMemo, useState } from 'react';
import { Button, Loader, Modal, TextField, VStack } from '@navikt/ds-react';
import { Form, useNavigate, useNavigation, useParams } from 'react-router';
import { NotePencilIcon } from '@navikt/aksel-icons';

import { IKodeverkMappingList } from '~/data/types/kodeverkTypes';
import { validateName } from '~/utils/validators';

interface MappingListModalProps {
    allItems: IKodeverkMappingList[];
    onCloseUrl: string;
    title: string;
    duplicateErrorText: string;
}

export const MappingListModal = ({
    allItems,
    title,
    onCloseUrl,
    duplicateErrorText,
}: MappingListModalProps) => {
    const params = useParams();
    const navigate = useNavigate();
    const response = useNavigation();

    const currentItem = useMemo(
        () => allItems.find(({ id }) => id === Number(params.id)),
        [allItems, params.id]
    );
    const [label, setLabel] = useState(currentItem?.fkLabel || '');
    const [labelError, setLabelError] = useState<string | undefined>(undefined);
    const [error, setError] = useState<string | undefined>(undefined);

    const labelAlreadyExist = useCallback(
        (label: string) =>
            allItems.some(({ fkLabel, id }) => fkLabel === label.trim() && id !== currentItem?.id),
        [allItems, currentItem?.id]
    );

    const duplicateLabel = useMemo(
        () => labelAlreadyExist(label || ''),
        [labelAlreadyExist, label]
    );
    const unchangedLabel = useMemo(
        () => label?.trim() === currentItem?.fkLabel,
        [currentItem?.fkLabel, label]
    );

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        const validationError = validateName(label);

        if (validationError) {
            e.preventDefault();
            setError(validationError);
        }
    };

    const hasError = !!labelError || duplicateLabel || unchangedLabel;

    if (response.state === 'loading') {
        return (
            <div className={'spinner'}>
                <Loader size="3xlarge" title="Venter..." />
            </div>
        );
    }

    return (
        <Modal
            open={true}
            onClose={() => navigate(onCloseUrl)}
            header={{
                heading: `${title}: ${currentItem?.label}`,
                closeButton: false,
                icon: <NotePencilIcon aria-hidden />,
            }}
            width="small">
            <Form method={'PATCH'} onSubmit={handleSubmit}>
                <Modal.Body>
                    <VStack gap={'space-12'}>
                        <TextField
                            label="Egendefinert navn"
                            name="fkLabel"
                            type="text"
                            autoComplete="off"
                            value={label}
                            onChange={(event) => {
                                setLabel(event.target.value);
                                setLabelError(validateName(event.target.value, true));
                            }}
                            error={labelError ?? (duplicateLabel ? duplicateErrorText : undefined)}
                        />
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        variant="primary"
                        loading={response.state === 'submitting'}
                        disabled={hasError || !label}>
                        Lagre endringer
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => navigate(onCloseUrl)}>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
