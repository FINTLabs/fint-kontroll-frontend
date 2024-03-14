import { Button, Modal } from "@navikt/ds-react"
import React, { useEffect, useRef } from "react"
import {IResourceModuleOrgUnitDetail} from "~/data/resourceModuleAdmin/types";
import {useParams} from "@remix-run/react";

interface DeleteOrgUnitsInAssignmentProps {
    modalOpenProp: boolean
    setIsDeleteModalOpen: (isOpen: boolean) => void
    roleToDeleteFrom: string
    scopeId: string
    orgUnitToDelete: IResourceModuleOrgUnitDetail
}

const DeleteOrgUnitInAssignment = ({
           modalOpenProp,
           orgUnitToDelete,
           roleToDeleteFrom,
           setIsDeleteModalOpen,
           scopeId,
       }: DeleteOrgUnitsInAssignmentProps) => {
    // const { deleteOrgUnitFromAssignment } = useAssignments()
    const deleteRef = useRef<HTMLDialogElement>(null)

    const { id: userId } = useParams()

    useEffect(() => {
        modalOpenProp ? openModal() : closeModal()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalOpenProp])
    const openModal = () => {
        setIsDeleteModalOpen(true)
        deleteRef.current?.showModal()
    }

    const closeModal = () => {
        setIsDeleteModalOpen(false)
        deleteRef.current?.close()
    }

    const handleDeleteAssignmentData = () => {
        // deleteOrgUnitFromAssignment(userId, scopeId, orgUnitToDelete.orgUnitId)
        closeModal()
    }

    return (
        <Modal
            ref={deleteRef}
            header={{ heading: `Slett ${orgUnitToDelete.name}?` }}
            onAbort={closeModal}
            onClose={closeModal}
            onCancel={closeModal}
        >
            <Modal.Body>
                Ønsker du å slette orgenhetknytning {orgUnitToDelete.name} til {roleToDeleteFrom}?
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" variant={"danger"} onClick={() => handleDeleteAssignmentData()}>
                    Slett
                </Button>
                <Button type="button" variant="secondary" onClick={closeModal}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteOrgUnitInAssignment
