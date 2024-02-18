/*
import { Button, Modal, Switch } from "@navikt/ds-react"
import React, { useRef, useState } from "react"
import { Buldings3Icon } from "@navikt/aksel-icons"
import styled from "styled-components"
import { IOrgUnit } from "../../../../data/types"
import OrgUnitTreeWithUserConnectionOrganism from "../../../../organisms/orgUnitTree/OrgUnitTreeWithUserConnectionOrganism"

const ModalBodyStyled = styled(Modal.Body)`
	display: flex;
	flex-direction: column;
	gap: 1rem;

	.select-wrapper {
		width: fit-content;
	}
`

interface OrgUnitFilterModalProps {
    handleChangeOrgUnitFilter: (stringifiedOrgUnits: string[]) => void
}

const OrgUnitFilterModal = ({ handleChangeOrgUnitFilter }: OrgUnitFilterModalProps) => {
    const ref = useRef<HTMLDialogElement>(null)
    const [aggregated, setAggregated] = useState(false)
    const [orgUnitsFilter, setOrgUnitsFilter] = useState<IOrgUnit[]>([])

    const handleOpen = () => {
        ref.current?.showModal()
    }
    const handleClose = () => {
        ref.current?.close()
    }

    const handleSubmit = () => {
        const orgUnitsToString: string[] = orgUnitsFilter.flatMap((orgUnit) => String(orgUnit.id))
        handleChangeOrgUnitFilter(orgUnitsToString)
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
                icon={<Buldings3Icon aria-hidden />}
                onClick={handleOpen}
            >
                Orgenhetsfilter
            </Button>

            <Modal
                ref={ref}
                header={{ heading: "Filtrer brukere på orgenheter valgt her" }}
                onAbort={handleClose}
                onCancel={handleClose}
            >
                <ModalBodyStyled>
                    <>
                        <Switch onClick={() => setAggregated(!aggregated)} checked={aggregated}>
                            Inkluder underliggende enheter
                        </Switch>

                        <OrgUnitTreeWithUserConnectionOrganism
                            selectedOrgUnits={orgUnitsFilter}
                            setSelectedOrgUnits={setOrgUnitsFilter}
                            aggregated={aggregated}
                        />
                    </>
                </ModalBodyStyled>

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
*/
