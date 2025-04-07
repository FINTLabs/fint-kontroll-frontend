import { Tag, TagProps } from '@navikt/ds-react';

export const StatusTag = (prop: { status: string | undefined }) => {
    if (prop.status === undefined || prop.status == '') return null;

    let variant: TagProps['variant'];
    let label: string;

    switch (prop.status) {
        case 'ACTIVE':
            variant = 'success';
            label = 'Aktiv';
            break;
        case 'DISABLED':
            variant = 'info';
            label = 'Deaktivert';
            break;
        case 'DELETED':
            variant = 'error';
            label = 'Slettet';
            break;
        default:
            variant = 'neutral';
            label = prop.status;
    }

    return (
        <Tag size="small" variant={variant}>
            {label}
        </Tag>
    );
};
