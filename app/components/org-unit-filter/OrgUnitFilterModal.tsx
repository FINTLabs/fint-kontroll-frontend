import {Button, Modal} from "@navikt/ds-react"
import React, {useRef, useState} from "react"
import {Buildings3Icon} from "@navikt/aksel-icons"
import {useSearchParams} from "@remix-run/react";
import {filterResetPageParam} from "~/components/common/CommonFunctions";
import OrgUnitSelect from "~/components/common/orgUnits/OrgUnitSelect";
import {IUnitItem} from "~/data/types/orgUnitTypes";

interface OrgUnitFilterModalProps {
    orgUnitList: IUnitItem[]
}

const OrgUnitFilterModal = ({orgUnitList}: OrgUnitFilterModalProps) => {
    const ref = useRef<HTMLDialogElement>(null)
    const [aggregated, setAggregated] = useState(false)
    const [orgUnitsFilter, setOrgUnitsFilter] = useState<IUnitItem[]>([])
    const [searchParams, setSearchParams] = useSearchParams()
    const pageParam = searchParams.get("page")

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
        filterResetPageParam(pageParam, setSearchParams)
        ref.current?.close()
        reset()
    }

    const reset = () => {
        setAggregated(false)
        setOrgUnitsFilter([])
    }

    return (
        <div className="org-unit-button">
            <Button
                id="org-unit-filter"
                variant={"secondary"}
                iconPosition="right"
                icon={<Buildings3Icon aria-hidden/>}
                onClick={handleOpen}
            >
                Org.enhetsfilter
            </Button>
            <Modal
                ref={ref}
                header={{heading: "Velg organisasjonsenhet(er)"}}
                onAbort={handleClose}
                onCancel={handleClose}
                size={"medium"}
                width={"medium"}
            >
                <Modal.Body className={"modal-body"}>
                    <OrgUnitSelect
                        allOrgUnits={orgUnitList}
                        selectedOrgUnits={orgUnitsFilter}
                        setSelectedOrgUnits={setOrgUnitsFilter}
                        aggregated={aggregated}
                        setAggregated={setAggregated}
                    />
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
