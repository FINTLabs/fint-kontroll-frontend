import {Button, Heading, List} from "@navikt/ds-react";
import {
    IResourceModuleAssignment,
    IResourceModuleUser,
    IResourceModuleUsersPage
} from "~/data/resourceModuleAdmin/types";
import {CheckmarkCircleIcon} from "@navikt/aksel-icons";

interface TildelUserSearchResultListProps {
    newAssignment: IResourceModuleAssignment
    usersPage: IResourceModuleUsersPage
    handleSelectUser: (newUser: IResourceModuleUser) => void
}

const TildelUserSearchResultList = ({newAssignment, usersPage, handleSelectUser}: TildelUserSearchResultListProps) => {
    return (
        <List>
            {usersPage.users.map((user) =>
                <li key={user.resourceId} className={"list-item__space-between"}>
                    <span>
                        <Heading level={"2"} size={"small"}>{user.firstName + " " + user.lastName}</Heading>
                        {user.roles &&
                            <p>
                                {
                                    user.roles?.length > 0 ?
                                    user.roles.map(
                                        (role, index) => (
                                            <span key={role.roleId + index}>
                                                {/*@ts-ignore*/}
                                                {role.roleName}{user.roles.length-1 > index && ", "}
                                            </span>
                                        )
                                    ) :
                                    "Har ingen roller"
                                }
                            </p>
                        }
                    </span>
                    {newAssignment.user?.resourceId === user.resourceId ?
                        <span>
                            <Button icon={<CheckmarkCircleIcon />} variant={"secondary"} onClick={() => handleSelectUser(user)}>Valgt</Button>
                        </span>
                    :
                        <span>
                            <Button onClick={() => handleSelectUser(user)}>Velg bruker</Button>
                        </span>
                    }
                </li>
            )}
        </List>
    )
}

export default TildelUserSearchResultList