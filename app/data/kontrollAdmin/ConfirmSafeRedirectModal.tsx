import React, {useEffect, useRef} from "react";
import {Button, Modal} from "@navikt/ds-react";


interface ConfirmSafeRedirectModalProps {
    isModalVisible: boolean
    setIsModalVisible: (newVal: boolean) => void
    discardChanges: () => void
}

export const ConfirmSafeRedirectModal = ({isModalVisible, setIsModalVisible, discardChanges}: ConfirmSafeRedirectModalProps) => {
    const ref = useRef<HTMLDialogElement>(null)
    // const { tabToRouteTo, setCurrentTab, setIsTabModified, isModalVisible, setIsModalVisible } = useSafeTabChange()

    useEffect(() => {
        // isModalVisible ? handleOpenModal() : handleSaveChanges()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        isModalVisible ? handleOpenModal() : null
    }, [isModalVisible])

    const handleSaveChanges = () => {
        document.getElementById("save-button").click()
        setIsModalVisible(false)
        ref.current?.close()
    }

    const handleOpenModal = () => {
        ref.current?.showModal()
    }

    const handleDiscardChanges = () => {
        setIsModalVisible(false)
        ref.current?.close()
    }

    const handleDiscardAndNavigate = () => {
        handleDiscardChanges()
        discardChanges()
    }

    return (
        <div className="py-16">
            <Modal
                ref={ref}
                header={{ heading: "Lagre endringer" }}
                onClose={handleDiscardChanges}
                onCancel={handleDiscardChanges}
            >
                <Modal.Body>Du har data som ikke er lagret. Ønsker du å forkaste endringene?</Modal.Body>
                <Modal.Footer>
                    <Button type="button" onClick={handleSaveChanges}>
                        Lagre endringer
                    </Button>
                    <Button type="button" variant="secondary" onClick={handleDiscardAndNavigate}>
                        Forkast endringer
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
