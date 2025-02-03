import { Skeleton, Table } from '@navikt/ds-react';
import React from 'react';

type LoadingSpinnerProps = {
    columns?: number;
    rows?: number;
    height?: number;
};

const SkeletonRow = ({ columns = 4, height = 50 }: LoadingSpinnerProps) => (
    <Table.Row>
        {Array.from({ length: columns }).map((_, index) => (
            <Table.DataCell key={index}>
                <Skeleton variant="text" height={height} width="100%" />
            </Table.DataCell>
        ))}
    </Table.Row>
);

export const TableSkeleton = ({ rows = 4, columns = 4, height = 50 }: LoadingSpinnerProps) => (
    <>
        {Array.from({ length: rows }).map((_, index) => (
            <SkeletonRow key={index} columns={columns} height={height} />
        ))}
    </>
);
