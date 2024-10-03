import React, {useEffect, useMemo} from "react";
import {useNavigate, useNavigation} from "@remix-run/react";
import {Button} from "@navikt/ds-react";
import {InformationSquareIcon} from "@navikt/aksel-icons";

type SeeInfoButtonProps = {
    id: string
    url: string
}

export const SeeInfoButton = ({id, url}: SeeInfoButtonProps) => {
    const navigate = useNavigate();
    const navigation = useNavigation()
    const isLoading = useMemo(() => navigation.state === "loading" && navigation.location.pathname.endsWith(url), [navigation, url])

    return (
        <Button
            id={id}
            icon={
                <InformationSquareIcon
                    title="Informasjonsikon"
                    fontSize="1.5rem"
                />
            }
            iconPosition={"right"}
            onClick={() =>
                navigate(url)
            }
            variant={"secondary"}
            role="link"
            loading={isLoading}
        >
            Se info
        </Button>
    )
}