import { Button, Table, TextField } from '@navikt/ds-react';
import { Form, useNavigation } from 'react-router';
import { ArrowCirclepathReverseIcon, PencilIcon } from '@navikt/aksel-icons';
import { IKodeverkMappingList } from '~/data/types/kodeverkTypes';
import { useCallback, useEffect, useState } from 'react';
import { validateName } from '~/utils/validators';

export const MappingList = ({
    listItems,
    name,
    duplicateErrorText,
}: {
    listItems: IKodeverkMappingList[];
    name: string;
    duplicateErrorText: string;
}) => {
    const [editing, setEditing] = useState<Record<number, boolean>>({});
    const [draftValues, setDraftValues] = useState<Record<number, string>>({});
    const [errors, setErrors] = useState<Record<number, string | undefined>>({});
    const response = useNavigation();

    const labelAlreadyExist = useCallback(
        (id: number, value: string) =>
            listItems.some((item) => item.fkLabel === value.trim() && item.id !== id),
        [listItems]
    );

    const startEditing = () => {
        const newEditing: Record<number, boolean> = {};
        const newDrafts: Record<number, string> = {};

        listItems.forEach((item) => {
            newEditing[item.id] = true;
            newDrafts[item.id] = item.fkLabel;
        });

        setEditing(newEditing);
        setDraftValues(newDrafts);
    };

    const cancelEditing = (id: number) => {
        setDraftValues((prev) => {
            const copy = { ...prev };
            delete copy[id];
            return copy;
        });

        setErrors((prev) => {
            const copy = { ...prev };
            delete copy[id];
            return copy;
        });
    };

    const updateDraft = (id: number, value: string) => {
        const validationError = validateName(value, true);
        const duplicate = labelAlreadyExist(id, value);

        setDraftValues((prev) => ({ ...prev, [id]: value }));
        setErrors((prev) => ({
            ...prev,
            [id]: validationError || (duplicate ? duplicateErrorText : undefined),
        }));
    };

    const closeAll = () => {
        setEditing({});
        setDraftValues({});
        setErrors({});
    };

    const navigation = useNavigation();

    useEffect(() => {
        if (navigation.state === 'idle') {
            setEditing({});
            setDraftValues({});
            setErrors({});
        }
    }, [navigation.state]);

    const hasAnyError = Object.values(errors).some(Boolean);

    return (
        <section>
            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    iconPosition="right"
                    icon={<PencilIcon />}
                    variant="secondary"
                    type="button"
                    onClick={() => startEditing()}
                >
                    Rediger
                </Button>
            </div>
            <Form method="PATCH">
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>{name}</Table.ColumnHeader>
                            <Table.ColumnHeader>Egendefinert navn</Table.ColumnHeader>
                            <Table.ColumnHeader></Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {listItems.map(({ id, fkLabel, label }) => {
                            const isEditing = editing[id];
                            const value = draftValues[id] ?? fkLabel;
                            const error = errors[id];
                            const isChanged = value.trim() !== fkLabel.trim();

                            return (
                                <Table.Row key={id}>
                                    <Table.DataCell>{label}</Table.DataCell>

                                    <Table.DataCell>
                                        {isEditing ? (
                                            <TextField
                                                data-testid={`mapping-input-${id}`}
                                                size="small"
                                                style={{ width: '180px' }}
                                                label=""
                                                hideLabel
                                                value={value}
                                                onChange={(e) => updateDraft(id, e.target.value)}
                                                error={error}
                                            />
                                        ) : (
                                            fkLabel
                                        )}
                                    </Table.DataCell>

                                    <Table.DataCell align="right">
                                        {isEditing && isChanged && (
                                            <Button
                                                iconPosition="right"
                                                icon={
                                                    <ArrowCirclepathReverseIcon
                                                        title="a11y-title"
                                                        fontSize="1.5rem"
                                                    />
                                                }
                                                type="button"
                                                variant="tertiary"
                                                size="small"
                                                onClick={() => cancelEditing(id)}
                                            >
                                                Angre
                                            </Button>
                                        )}
                                    </Table.DataCell>

                                    {isEditing && (
                                        <>
                                            <input type="hidden" name="ids" value={id} />
                                            <input
                                                type="hidden"
                                                name={`fkLabel_${id}`}
                                                value={value}
                                            />
                                        </>
                                    )}
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
                {Object.keys(editing).length > 0 && (
                    <div
                        style={{
                            marginTop: '1.5rem',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '1rem',
                        }}
                    >
                        <Button type="button" variant="secondary" onClick={closeAll}>
                            Avbryt
                        </Button>

                        <Button
                            type="submit"
                            name="intent"
                            value="save-all"
                            variant="primary"
                            loading={response.state === 'submitting'}
                            disabled={hasAnyError}
                        >
                            Lagre alle endringer
                        </Button>
                    </div>
                )}
            </Form>
        </section>
    );
};
