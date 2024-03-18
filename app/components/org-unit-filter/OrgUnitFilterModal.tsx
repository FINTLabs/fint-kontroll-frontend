import {Button, Modal, Switch} from "@navikt/ds-react"
import React, {useRef, useState} from "react"
import {Buldings3Icon} from "@navikt/aksel-icons"
import type {IUnitItem} from "~/data/types";
import OrgUnitTree from "~/components/org-unit-filter/OrgUnitTree";
import {useSearchParams} from "@remix-run/react";

interface OrgUnitFilterModalProps {
    orgUnitList: IUnitItem[]
}

const OrgUnitFilterModal = ({orgUnitList}: OrgUnitFilterModalProps) => {
    const ref = useRef<HTMLDialogElement>(null)
    const [aggregated, setAggregated] = useState(false)
    const [orgUnitsFilter, setOrgUnitsFilter] = useState<IUnitItem[]>([])
    const [, setSearchParams] = useSearchParams()


    const handleOpen = () => {
        ref.current?.showModal()
    }
    const handleClose = () => {
        ref.current?.close()
        reset()
    }

    const handleSubmit = () => {
        const orgUnitsToString: string[] = orgUnitsFilter.flatMap((orgUnit) => String(orgUnit.organisationUnitId))

        setSearchParams((prev) => {
            prev.set("orgUnits", `${[orgUnitsToString]}`);
            return prev;
        });
        ref.current?.close()
        reset()
    }

    const reset = () => {
        setAggregated(false)
        setOrgUnitsFilter([])
    }

    return (
        <div className="py-16">
            <Button
                variant={"secondary"}
                iconPosition="right"
                icon={<Buldings3Icon aria-hidden/>}
                onClick={handleOpen}
            >
                Orgenhetsfilter
            </Button>
            <Modal
                ref={ref}
                header={{heading: "Velg orgenhet(er)"}}
                onAbort={handleClose}
                onCancel={handleClose}
            >
                <Modal.Body className={"modal-body"}>
                    <>
                        <Switch onClick={() => setAggregated(!aggregated)} checked={aggregated}>
                            Inkluder underliggende enheter
                        </Switch>

                        <OrgUnitTree
                            orgUnitList={orgUnitList}
                            selectedOrgUnits={orgUnitsFilter}
                            setSelectedOrgUnits={setOrgUnitsFilter}
                            aggregated={aggregated}
                        />
                    </>
                </Modal.Body>

                <Modal.Footer>
                    <Button type="button" onClick={handleSubmit}>
                        Sett filter
                    </Button>
                    <Button type="button" variant="secondary" onClick={handleClose}>
                        Lukk
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default OrgUnitFilterModal
