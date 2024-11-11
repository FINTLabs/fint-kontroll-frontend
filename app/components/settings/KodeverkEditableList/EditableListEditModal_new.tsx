import {Button, Modal, Textarea, TextField, VStack} from "@navikt/ds-react";
import {NotePencilIcon} from "@navikt/aksel-icons";
import {Form, useNavigation, useSubmit} from "@remix-run/react";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {IKodeverkCustomListItem} from "~/data/types";
import {HTMLFormMethod} from "@remix-run/router";

interface EditableListEditModalProps {
    title: string;
    errorText?: string;
    buttonText: string;
    items: IKodeverkCustomListItem[];
    item?: IKodeverkCustomListItem;
    open: boolean;
    onClose: () => void;
    actionType: string;
    method: HTMLFormMethod;
}

export const EditableListEditModalNew = (
    {
        open,
        onClose,
        title,
        errorText,
        buttonText,
        items,
        item,
        actionType,
        method
    }: EditableListEditModalProps
) => {
    const response = useNavigation()
    const submit = useSubmit();
    const [name, setName] = useState(item?.name || "");

    useEffect(() => {
        if (open) {
            console.log("open item", item)
            setName(item?.name || "")
        }
    }, [open, item])

    const nameAlreadyExist = useCallback(
        (name: string) => items.some(category => category.name === name.trim() && category.id !== category?.id),
        [items]
    );
    const duplicateName = useMemo(() => nameAlreadyExist(name), [nameAlreadyExist, name]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        console.log("item", item)
        if (item?.id) {
            console.log("item id", item.id)
            formData.append("id", item.id.toString());
        }
        formData.append("actionType", actionType);

        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }

        submit(formData, {
            method: method,
        });
        onClose();
    }


    const handleClosing = () => {
        onClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleClosing}
            header={{
                heading: title,
                closeButton: false,
                icon: <NotePencilIcon aria-hidden/>
            }}
            width="small"
        >
            <Form onSubmit={handleSubmit} method={method}>
                <Modal.Body>
                    <VStack gap={"4"}>
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
                            defaultValue={item?.description !== undefined ? item.description : ""}
                            minRows={4}
                        />
                    </VStack>
                </Modal.Body>
                <Modal.Footer>

                    <Button
                        type="submit"
                        variant="primary"
                        loading={response.state === "submitting"}
                        disabled={!name || duplicateName}
                    >
                        {buttonText}
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleClosing}
                    >
                        Avbryt
                    </Button>

                </Modal.Footer>
            </Form>
        </Modal>
    )
}