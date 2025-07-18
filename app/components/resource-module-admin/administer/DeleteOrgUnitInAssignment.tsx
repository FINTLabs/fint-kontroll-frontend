import { Button, Modal } from '@navikt/ds-react';
import React, { useEffect, useRef } from 'react';
import { IResourceModuleOrgUnitDetail } from '~/data/types/resourceTypes';
import { Form } from 'react-router';

interface DeleteOrgUnitsInAssignmentProps {
    modalOpenProp: boolean;
    setIsDeleteModalOpen: (isOpen: boolean) => void;
    roleToDeleteFrom: string;
    scopeId: string;
    orgUnitToDelete: IResourceModuleOrgUnitDetail;
}

const DeleteOrgUnitInAssignment = ({
    modalOpenProp,
    orgUnitToDelete,
    roleToDeleteFrom,
    setIsDeleteModalOpen,
    scopeId,
}: DeleteOrgUnitsInAssignmentProps) => {
    const deleteRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        modalOpenProp ? openModal() : closeModal();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalOpenProp]);
    const openModal = () => {
        setIsDeleteModalOpen(true);
        deleteRef.current?.showModal();
    };

    const closeModal = () => {
        setIsDeleteModalOpen(false);
        deleteRef.current?.close();
    };

    const handleDeleteAssignmentData = () => {
        const scopeIdEle = document.getElementById('scopeId');
        const orgUnitEle = document.getElementById('orgUnitId');

        scopeIdEle ? scopeIdEle.setAttribute('value', scopeId) : '';
        orgUnitEle ? orgUnitEle.setAttribute('value', orgUnitToDelete.orgUnitId) : '';
        closeModal();
    };

    return (
        <Modal
            ref={deleteRef}
            header={{ heading: `Slett ${orgUnitToDelete.name}?` }}
            onAbort={closeModal}
            onClose={closeModal}
            onCancel={closeModal}>
            <Modal.Body>
                Ønsker du å slette org.enhetknytning {orgUnitToDelete.name} til {roleToDeleteFrom}?
            </Modal.Body>
            <Modal.Footer>
                <Form
                    onSubmit={handleDeleteAssignmentData}
                    method={'DELETE'}
                    name={'deleteOrgUnitFromAssignment'}>
                    <input
                        type={'hidden'}
                        name={'deleteOrgUnitFromAssignment'}
                        value={'deleteOrgUnitFromAssignment'}
                    />
                    <input type={'hidden'} name={'scopeId'} id={'scopeId'} />
                    <input type={'hidden'} name={'orgUnitId'} id={'orgUnitId'} />

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

export default DeleteOrgUnitInAssignment;
