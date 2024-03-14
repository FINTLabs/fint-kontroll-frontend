import {IResourceModuleUser} from "~/data/resourceModuleAdmin/types";
import {useEffect, useRef} from "react";
import {Alert, Button, Modal, VStack} from "@navikt/ds-react";

interface ResetUserModalProps {
    isResetRolesModalOpen: boolean
    setIsResetRolesModalOpen: (value: boolean) => void
    user: IResourceModuleUser
}

const ResourceModuleResetUserModal = ({ isResetRolesModalOpen, setIsResetRolesModalOpen, user }: ResetUserModalProps) => {
    const deleteRef = useRef<HTMLDialogElement>(null)
    // const { deleteAllAssignmentsOnUser } = useAssignments()

    useEffect(() => {
        if (user.resourceId.length > 0 || isResetRolesModalOpen) {
            openModal()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isResetRolesModalOpen])

    const openModal = () => {
        setIsResetRolesModalOpen(true)
        deleteRef.current?.showModal()
    }

    const closeModal = () => {
        setIsResetRolesModalOpen(false)
        deleteRef.current?.close()
    }

    const handleClearAllRoleData = () => {
        // deleteAllAssignmentsOnUser(user.resourceId)
        closeModal()
    }

    return (
        <Modal
            ref={deleteRef}
            header={{ heading: `Nullstill knytninger til ${user.firstName} ${user.lastName}?` }}
            onClose={closeModal}
        >
            <Modal.Body>
                <VStack gap={"3"}>
                    <span>Ønsker du å slette alle roller knyttet til denne brukeren?</span>
                    <Alert variant={"warning"}>Dette fjerner alle eksisterende rolleknytninger brukeren har!</Alert>
                </VStack>
            </Modal.Body>

            <Modal.Footer>
                <Button type="button" variant={"danger"} onClick={() => handleClearAllRoleData()}>
                    Slett
                </Button>
                <Button type="button" variant="secondary" onClick={closeModal}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ResourceModuleResetUserModal