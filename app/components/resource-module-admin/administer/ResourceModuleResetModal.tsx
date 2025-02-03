import { IResourceModuleUser } from '~/data/types/resourceTypes';
import { useEffect, useRef } from 'react';
import { Alert, Button, Modal, VStack } from '@navikt/ds-react';
import { Form } from '@remix-run/react';

interface ResetUserModalProps {
    isResetRolesModalOpen: boolean;
    setIsResetRolesModalOpen: (value: boolean) => void;
    user: IResourceModuleUser;
}

const ResourceModuleResetUserModal = ({
    isResetRolesModalOpen,
    setIsResetRolesModalOpen,
    user,
}: ResetUserModalProps) => {
    const deleteRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (user.resourceId.length > 0 || isResetRolesModalOpen) {
            openModal();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isResetRolesModalOpen]);

    const openModal = () => {
        setIsResetRolesModalOpen(true);
        deleteRef.current?.showModal();
    };

    const closeModal = () => {
        setIsResetRolesModalOpen(false);
        deleteRef.current?.close();
    };

    return (
        <Modal
            ref={deleteRef}
            header={{ heading: `Nullstill knytninger til ${user.firstName} ${user.lastName}?` }}
            onClose={closeModal}>
            <Modal.Body>
                <VStack gap={'3'}>
                    <span>Ønsker du å slette alle roller knyttet til denne brukeren?</span>
                    <Alert variant={'warning'}>
                        Dette fjerner alle eksisterende rolleknytninger brukeren har!
                    </Alert>
                </VStack>
            </Modal.Body>

            <Modal.Footer>
                <Form
                    method={'DELETE'}
                    onSubmit={() => closeModal()}
                    name={'resetAllUserAssignments'}>
                    <input
                        type={'hidden'}
                        name={'resetAllUserAssignments'}
                        value={'resetAllUserAssignments'}
                    />
                    <Button type="submit" variant={'danger'}>
                        Slett
                    </Button>
                </Form>
                <Button type="button" variant="secondary" onClick={closeModal}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResourceModuleResetUserModal;
