import { BodyShort, Button, Loader, Modal } from '@navikt/ds-react';
import { TrashIcon } from '@navikt/aksel-icons';
import { Form, useNavigate, useNavigation } from 'react-router';
import React from 'react';

interface EditableListDeleteModalProps {
    title: string;
    text: string;
    onCloseUrl: string;
}

export const EditableListDeleteModal = ({
    title,
    text,
    onCloseUrl,
}: EditableListDeleteModalProps) => {
    const response = useNavigation();
    const navigate = useNavigate();

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
                heading: title,
                closeButton: false,
                icon: <TrashIcon aria-hidden />,
            }}
            width="small">
            <Form method={'DELETE'}>
                <Modal.Body>
                    <BodyShort>{text}</BodyShort>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        variant="danger"
                        loading={response.state === 'submitting'}>
                        Slett
                    </Button>
                    <Button type="button" variant="secondary" onClick={() => navigate(onCloseUrl)}>
                        Avbryt
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
