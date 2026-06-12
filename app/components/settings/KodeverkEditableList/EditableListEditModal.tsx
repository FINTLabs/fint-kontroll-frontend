import { Button, Loader, Modal, Textarea, TextField, VStack } from '@navikt/ds-react';
import { NotePencilIcon } from '@navikt/aksel-icons';
import { Form, useNavigate, useNavigation, useParams } from 'react-router';
import React, { useCallback, useMemo, useState } from 'react';

import { IKodeverkCustomListItem } from '~/data/types/kodeverkTypes';
import { validateName } from '~/utils/validators';

interface EditableListEditModalProps {
    onCloseUrl: string;
    editTitle: string;
    createNewTitle: string;
    errorText?: string;
    nameText: string;
    descriptionText: string;
    saveChangesButtonText: string;
    saveNewButtonText: string;
    items: IKodeverkCustomListItem[];
}

export const EditableListEditModal = ({
    onCloseUrl,
    editTitle,
    createNewTitle,
    errorText,
    nameText,
    descriptionText,
    saveChangesButtonText,
    saveNewButtonText,
    items,
}: EditableListEditModalProps) => {
    const navigate = useNavigate();
    const response = useNavigation();

    const params = useParams<string>();
    const isEdit = !!params.id;
    const [error, setError] = useState<string | undefined>(undefined);
    const [name, setName] = useState(nameText || '');
    const [nameError, setNameError] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState(descriptionText || '');
    const [descriptionError, setDescriptionError] = useState<string | undefined>();
    const [lengthError, setLengthError] = useState<string | undefined>();
    const MAX_LENGTH = 1000;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const validationError = validateName(name && description);

        if (validationError) {
            e.preventDefault();
            setError(validationError);
        }
    };

    const nameAlreadyExist = useCallback(
        (name: string) =>
            items.some(
                (category) =>
                    category.name.trim().toLowerCase() === name.trim().toLowerCase() &&
                    category.id.toString() !== params.id
            ),
        [items, params.id]
    );
    const duplicateName = useMemo(() => nameAlreadyExist(name), [nameAlreadyExist, name]);

    const hasError = !!nameError || !!descriptionError || !!lengthError || duplicateName;

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
                heading: isEdit ? editTitle : createNewTitle,
                closeButton: false,
                icon: <NotePencilIcon aria-hidden />,
            }}
            width="small">
            <Form method={isEdit ? 'PUT' : 'POST'} onSubmit={handleSubmit}>
                <Modal.Body>
                    <VStack gap={'space-12'}>
                        <TextField
                            label="Navn"
                            name="categoryname"
                            type="text"
                            autoComplete="off"
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);
                                setNameError(validateName(event.target.value, true));
                            }}
                            error={nameError ?? (duplicateName ? errorText : undefined)}
                        />
                        <Textarea
                            label="Beskrivelse"
                            name="description"
                            value={description}
                            minRows={4}
                            maxLength={1000}
                            onChange={(event) => {
                                const value = event.target.value;

                                if (value.length > MAX_LENGTH) {
                                    setLengthError(`Maks ${MAX_LENGTH} tegn`);
                                    return;
                                }
                                setDescription(value);
                                setLengthError(undefined);
                                setDescriptionError(validateName(value, false));
                            }}
                            error={lengthError || descriptionError}
                        />
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        variant="primary"
                        loading={response.state === 'submitting'}
                        name="intent"
                        value={isEdit ? 'edit' : 'create'}
                        disabled={hasError || !name}>
                        {isEdit ? saveChangesButtonText : saveNewButtonText}
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => navigate(onCloseUrl)}>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
