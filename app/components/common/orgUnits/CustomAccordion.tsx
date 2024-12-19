import React, {useState, ReactNode} from "react";
import {Button, VStack, VStackProps} from "@navikt/ds-react";
import {ChevronRightIcon} from '@navikt/aksel-icons';

interface AccordionProps {
    children: ReactNode;
}

interface AccordionItemProps {
    title: ReactNode | string;
    children: ReactNode;
    initialState?: boolean;
    paddingInline?: VStackProps['paddingInline'];
}

const Accordion = ({children}: AccordionProps) => {
    return <VStack className="org-unit-accordion">{children}</VStack>;
};

const AccordionItem = ({title, children, initialState, paddingInline = "8 0"}: AccordionItemProps) => {
    const [isOpen, setIsOpen] = useState(initialState);

    return (
        <VStack
            width={"100%"}
            paddingInline={paddingInline}
            aria-expanded={isOpen ? "true" : "false"}
        >
            <Button
                className={"org-unit-accordion__button"}
                size={"small"}
                variant={"tertiary"}
                onClick={(event) => {
                    if (event.target instanceof HTMLInputElement) return;
                    setIsOpen(!isOpen)
                }}
                icon={
                    children ? (
                        <span className={`chevron-icon ${isOpen ? 'open' : 'closed'}`}>
                             <ChevronRightIcon fontSize="1.5rem"/>
                        </span>
                    ) : <span style={{width: '1.5rem'}}/>
                }
            >

                {title}
            </Button>
            <VStack
                width={"100%"}
                style={{display: isOpen ? 'block' : 'none'}}
            >
                {children}
            </VStack>
        </VStack>
    );
};

export {Accordion, AccordionItem};