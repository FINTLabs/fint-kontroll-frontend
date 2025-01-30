import {Button, Modal, Select, Switch} from "@navikt/ds-react";
import {useEffect, useRef, useState} from "react";
import {Form} from "@remix-run/react";
import {IAccessRole} from "~/data/types/userTypes";


interface DeleteAssignmentsModalProps {
    selectedRoleToDeleteFrom: IAccessRole
    modalOpenProp: boolean
    setIsDeleteModalOpen: (isOpen: boolean) => void
    objectTypesForUser: string[]
}

const DeleteAssignment = ({
        setIsDeleteModalOpen,
        modalOpenProp,
        selectedRoleToDeleteFrom,
        objectTypesForUser
    }: DeleteAssignmentsModalProps) => {
    const deleteRef = useRef<HTMLDialogElement>(null)
    const [completeDelete, setCompleteDelete] = useState(false)

    const [objectTypeToDelete, setObjectTypeToDelete] = useState(objectTypesForUser[0])


    useEffect(() => {
        if (selectedRoleToDeleteFrom.accessRoleId.length > 0 || modalOpenProp) {
            openModal()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRoleToDeleteFrom, modalOpenProp])

    useEffect(() => {
        if (completeDelete) {
            setObjectTypeToDelete("")
        }
    }, [completeDelete])

    const openModal = () => {
        setIsDeleteModalOpen(true)
        deleteRef.current?.showModal()
    }

    const closeModal = () => {
        setIsDeleteModalOpen(false)
        deleteRef.current?.close()
    }

    const handleDeleteAssignmentData = () => {
        const accessRoleIdEle = document.getElementById("accessRoleId")
        const objectTypeToDeleteEle = document.getElementById("objectTypeToDelete")

        accessRoleIdEle ? accessRoleIdEle.setAttribute("value", selectedRoleToDeleteFrom.accessRoleId) : ""
        objectTypeToDeleteEle ? objectTypeToDeleteEle.setAttribute("value", objectTypeToDelete) : ""

        closeModal()
    }

    return (
        <Modal ref={deleteRef} header={{ heading: `Slett ${selectedRoleToDeleteFrom.name}?` }} onClose={closeModal}>
            <Modal.Body>
                Ønsker du å slette brukertilknytningen til {selectedRoleToDeleteFrom.name} og de underliggende
                organisasjonsenhetene?
                <Switch onClick={() => setCompleteDelete(!completeDelete)} checked={completeDelete}>
                    Fjern hele knytningen uavhengig objekttyper?{" "}
                </Switch>
                {!completeDelete && (
                    <Select
                        label={"Velg objekttype å inkludere i sletting"}
                        onChange={(e) => setObjectTypeToDelete(e.target.value)}
                    >
                        {objectTypesForUser.map((objectType, index) => (
                            <option key={index}>{objectType}</option>
                        ))}
                    </Select>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Form onSubmit={handleDeleteAssignmentData} method={"DELETE"} name={"deleteOneAssignmentByRole"}>
                    <input type={"hidden"} name={"deleteOneAssignmentByRole"} value={"deleteOneAssignmentByRole"} />
                    <input type={"hidden"} name={"accessRoleId"} id={"accessRoleId"} />
                    <input type={"hidden"} name={"objectTypeToDelete"} id={"objectTypeToDelete"} />
                    <Button type="submit" variant={"danger"}>
                        Slett
                    </Button>
                </Form>
                <Button type="button" variant="secondary" onClick={closeModal}>
                    Avbryt
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteAssignment
