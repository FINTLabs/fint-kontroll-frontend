import { Button, Loader, Modal, Textarea, TextField, VStack } from '@navikt/ds-react';
import { NotePencilIcon } from '@navikt/aksel-icons';
import { Form, useNavigate, useNavigation, useParams } from 'react-router';
import React, { useCallback, useMemo, useState } from 'react';

import { IKodeverkCustomListItem } from '~/data/types/kodeverkTypes';

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

    const [name, setName] = useState(nameText || '');

    const nameAlreadyExist = useCallback(
        (name: string) =>
            items.some((category) => category.name === name.trim() && category.id !== category?.id),
        [items]
    );
    const duplicateName = useMemo(() => nameAlreadyExist(name), [nameAlreadyExist, name]);

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
            <Form method={isEdit ? 'PUT' : 'POST'}>
                <Modal.Body>
                    <VStack gap={'4'}>
                        <TextField
                            label="Navn"
                            name="categoryname"
                            type="text"
                            autoComplete="off"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={duplicateName ? errorText : undefined}
                        />
                        <Textarea
                            label="Beskrivelse"
                            name="description"
                            defaultValue={descriptionText}
                            minRows={4}
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
                        disabled={!name || duplicateName}>
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
