import {ACCESS_MANAGEMENT_API_URL, BASE_PATH} from "../../../environment";
import {changeAppTypeInHeadersAndReturnHeaders} from "~/data/helpers";

export const fetchAllFeatures = async (request: Request) => {
    const response = await fetch(`${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/feature`, {
        headers: request.headers
    })

    if (response.ok) {
        return response;
    }

    return generalErrorResponse(response)
}

export const fetchAccessRoles = async (request: Request) => {
    const response = await fetch(`${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accessrole`, {
        headers: request.headers
    })

    if (response.ok) {
        return response;
    }

    return generalErrorResponse(response)
}

export const fetchFeaturesInRole = async (request: Request, roleId: string | undefined) => {
    const response = await fetch(`${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accesspermission/accessrole/${roleId}`, {
        headers: request.headers
    })
    if (response.ok) {
        return response;
    }

    if (response.status === 403) {
        throw new Error("Du har ikke rettigheter til å hente ut CRUD-data")
    }

    return generalErrorResponse(response)
}

export const putPermissionDataForRole = async (request: Request, updatedPermissionRole: any) => {
   // console.log("Token Gutt", request.headers.get("Authorization"));
    const response = await fetch(`${ACCESS_MANAGEMENT_API_URL}${BASE_PATH}/api/accessmanagement/v1/accesspermission`, {
       // headers: changeAppTypeInHeadersAndReturnHeaders(request.headers),
        headers: {
            Authorization: request.headers.get("Authorization") ?? "",
            'content-type': 'application/json'
        },
        method: "PUT",
        body: updatedPermissionRole,
    })
    if (response.ok) {
        return response;
    }
    if (response.status === 500) {
        return response
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