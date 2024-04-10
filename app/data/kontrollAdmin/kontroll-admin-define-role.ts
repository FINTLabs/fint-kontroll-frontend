export const fetchAllFeatures = async (token: string | null) => {
    const response = await fetch(`http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/feature`, {
        headers: {Authorization: token ?? ""}
    })

    if (response.ok) {
        return response;
    }

    return generalErrorResponse(response)
}

export const fetchAccessRoles = async (token: string | null) => {
    const response = await fetch(`http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/accessrole`, {
        headers: {Authorization: token ?? ""}
    })

    if (response.ok) {
        return response;
    }

    return generalErrorResponse(response)
}

export const fetchFeaturesInRole = async (token: string | null, roleId: string | undefined) => {
    const response = await fetch(`http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/accesspermission/accessrole/${roleId}`, {
        headers: {Authorization: token ?? ""}
    })
    if (response.ok) {
        return response;
    }

    return generalErrorResponse(response)
}

export const putPermissionDataForRole = async (token: string | null, updatedPermissionRole: any) => {
    const response = await fetch(`http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/accesspermission`, {
        headers: {
            Authorization: token ?? "",
            'content-type': 'application/json'
        },
        method: "PUT",
        body: updatedPermissionRole,
    })
    if (response.ok) {
        return response;
    }

    return generalErrorResponse(response)
}

const generalErrorResponse = (response: Response) => {
    if (response.status === 500) {
        throw new Error("Noe gikk galt. Feilkode 500")
    }
    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen")
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt")
    }
    throw new Error("Det virker ikke som om du er pålogget")
}