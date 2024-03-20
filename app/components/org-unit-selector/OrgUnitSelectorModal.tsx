import {Button, Modal, Switch} from "@navikt/ds-react"
import React, {useRef, useState} from "react"
import {Buldings3Icon} from "@navikt/aksel-icons"
import type {IUnitItem} from "~/data/types";
import OrgUnitTree from "~/components/org-unit-filter/OrgUnitTree";
import {useSearchParams} from "@remix-run/react";

interface OrgUnitFilterModalProps {
    orgUnitList: IUnitItem[]
}

const OrgUnitSelectorModal = ({orgUnitList}: OrgUnitFilterModalProps) => {
    const [aggregated, setAggregated] = useState(false)
    const [orgUnitsFilter, setOrgUnitsFilter] = useState<IUnitItem[]>([])
    const [, setSearchParams] = useSearchParams()

    const reset = () => {
        setAggregated(false)
        setOrgUnitsFilter([])
    }

    return (
        <div className="py-16">
            <Switch onClick={() => setAggregated(!aggregated)} checked={aggregated}>
                Inkluder underliggende enheter
            </Switch>

            <OrgUnitTree
                orgUnitList={orgUnitList}
                selectedOrgUnits={orgUnitsFilter}
                setSelectedOrgUnits={setOrgUnitsFilter}
                aggregated={aggregated}
            />
        </div>
    )
}

export default OrgUnitSelectorModal
