import {IPermissionData} from "~/data/kontrollAdmin/types";

export const fetchAllFeatures = async (token: string | null) => {
    const response = await fetch(`http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/feature`, {
        headers: {Authorization: token ?? ""}
    });

    if (response.ok) {
        return response;
    }

    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen")
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt")
    }
    throw new Error("Det virker ikke som om du er pålogget")
}

export const fetchAccessRoles = async (token: string | null) => {
    const response = await fetch(`http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/accessrole`, {
        headers: {Authorization: token ?? ""}
    });

    if (response.ok) {
        return response;
    }

    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen")
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt")
    }
    throw new Error("Det virker ikke som om du er pålogget")
}

export const fetchFeaturesInRole = async (token: string | null, roleId: string | undefined) => {
    const response = await fetch(`http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/accesspermission/accessrole/${roleId}`, {
        headers: {Authorization: token ?? ""}
    });
    if (response.ok) {
        return response;
    }

    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen")
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt")
    }
    throw new Error("Det virker ikke som om du er pålogget")
}

export const putPermissionDataForRole = async (token: string | null, updatedPermissionRole: any) => {
    const response = await fetch(`http://localhost:53989/beta/fintlabs-no/api/accessmanagement/v1/accesspermission`, {
        headers: {
            Authorization: token ?? "",
            'content-type': 'application/json'
        },
        method: "PUT",
        body: updatedPermissionRole,
});
    if (response.ok) {
        return response;
    }

    if (response.status === 403) {
        throw new Error("Det ser ut som om du mangler rettigheter i løsningen")
    }
    if (response.status === 401) {
        throw new Error("Påloggingen din er utløpt")
    }
    throw new Error("Det virker ikke som om du er pålogget")
}

        // const putPermissionDataForRole = (basePath: string, updatedPermissionRole: IPermissionData) => {
        //     const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accesspermission`
        //     const url = `${baseUrl}`
        //     return axios.put(url, updatedPermissionRole)
        // }
//
// const putAssignment = (basePath: string, updatedAssignment: IPermissionData) => {
//     const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accesspermission`
//     const url = `${baseUrl}`
//     return axios.put(url, updatedAssignment)
// }
//
// const putAccessRole = (basePath: string, updatedAssignment: IUserRole) => {
//     const baseUrl = `${basePath === "/" ? "" : basePath}/api/accessmanagement/v1/accesspermission`
//     const url = `${baseUrl}`
//     toast.info("Lagring forsøkt, men feilet.", {
//         role: "alert"
//     })
//     return axios.post(url, updatedAssignment)
// }
