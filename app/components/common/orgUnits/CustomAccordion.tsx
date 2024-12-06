import React, {useState, ReactNode} from "react";
import {Button, VStack} from "@navikt/ds-react";
import {ChevronRightIcon} from '@navikt/aksel-icons';

interface AccordionProps {
    children: ReactNode;
}

interface AccordionItemProps {
    title: ReactNode | string;
    children: ReactNode;
    isTopLevel?: boolean;
}

const Accordion = ({children}: AccordionProps) => {
    return <VStack className="org-unit-accordion">{children}</VStack>;
};

const AccordionItem = ({title, children, isTopLevel}: AccordionItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <VStack
            width={"100%"}
            paddingInline={!isTopLevel ? "8 0" : "0"}
            aria-expanded={isOpen ? "true" : "false"}
        >
            <Button
                className={"org-unit-accordion__button"}
                size={"small"}
                variant={"tertiary"}
                onClick={() => setIsOpen(!isOpen)}
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