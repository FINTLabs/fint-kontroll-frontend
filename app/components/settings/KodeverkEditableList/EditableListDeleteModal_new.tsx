import {BodyShort, Button, Modal} from "@navikt/ds-react";
import {TrashIcon} from "@navikt/aksel-icons";
import {Form, useNavigation, useSubmit} from "@remix-run/react";
import React from "react";

interface EditableListDeleteModalProps {
    title: string;
    text: string;
    open: boolean;
    onClose: () => void;
    id?: number;
}

export const EditableListDeleteModal = ({title, text, open, onClose, id}: EditableListDeleteModalProps) => {
    const response = useNavigation()
    const submit = useSubmit();

    const handleConfirmDelete = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        formData.append("id", id?.toString() ?? "");
        formData.append("actionType", "DELETE");
        submit(formData, {
            method: "delete",
        });
        onClose();
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            header={{
                heading: title,
                closeButton: false,
                icon: <TrashIcon aria-hidden/>
            }}
            width="small"
        >
            <Form onSubmit={handleConfirmDelete} method={"delete"}>
                <Modal.Body>
                    <BodyShort>{text}</BodyShort>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        type="submit"
                        variant="danger"
                        loading={response.state === "submitting"}
                        /*
                                                onClick={handleConfirmDelete}
                        */
                    >
                        Slett
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                    >
                        Avbryt
                    </Button>

                </Modal.Footer>
            </Form>
        </Modal>
    )
}