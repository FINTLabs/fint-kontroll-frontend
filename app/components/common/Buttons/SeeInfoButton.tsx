import React, {useEffect, useMemo} from "react";
import {useNavigate, useNavigation} from "@remix-run/react";
import {Button} from "@navikt/ds-react";
import {ArrowRightIcon, InformationSquareIcon} from "@navikt/aksel-icons";

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
            className={"info-button"}
            id={id}
            icon={
                <ArrowRightIcon title="a11y-title" fontSize="1.5rem" />
            }
            iconPosition={"right"}
            onClick={() =>
                navigate(url)
            }
            variant={"tertiary"}
            role="link"
            loading={isLoading}
        >
            Se info
        </Button>
    )
}