import {HGrid} from "@navikt/ds-react";
import {ReactNode} from "react";

interface CustomLinkPanelProps {
    children: ReactNode;
}

export const CustomLinkPanel = ({children}: CustomLinkPanelProps) =>
    <HGrid gap="6" columns={{xs: 1, md: 2}}>
        {children}
    </HGrid>