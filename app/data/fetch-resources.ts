import {BASE_PATH, ORG_UNIT_API_URL, RESOURCE_API_URL} from "../../environment";
import logger from "~/logging/logger";
import {IValidForOrgUnits} from "~/components/resource-admin/types";
import {changeAppTypeInHeadersAndReturnHeaders} from "~/data/helpers";

export const fetchResources = async (request: Request, size: string, page: string, search: string, orgUnits: string[], applicationCategory: string, accessType: string) => {

    const applicationCategoryParameter = applicationCategory.length > 0 ? `applicationcategory=${applicationCategory}` : undefined
    const accesstypeParameter = accessType.length > 0 ? `accesstype=${accessType}` : undefined

    const response = await fetch(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/v1?${applicationCategoryParameter}&size=${size}&page=${page}&search=${search}${orgUnits.length > 0 ? '&orgunits=' + orgUnits : ""}&${accesstypeParameter}`, {
        headers: request.headers
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

export const fetchResourceById = async (request: Request, id: string | undefined) => {
    const response = await fetch(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/${id}`, {
        headers: request.headers
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

export const fetchApplicationCategory = async (request: Request) => {
    const response = await fetch(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/applicationcategories`, {
        headers: request.headers
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

export const fetchAccessType = async (request: Request) => {
    const response = await fetch(`${RESOURCE_API_URL}${BASE_PATH}/api/resources/accesstypes`, {
        headers: request.headers
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

export const createResource = async (token: string | null,
                                     resourceId: string,
                                     resourceName: string,
                                     resourceType: string,
                                     platform: string[],
                                     accessType: string,
                                     resourceLimit: number,
                                     resourceOwnerOrgUnitId: string,
                                     resourceOwnerOrgUnitName: string,
                                     validForOrgUnits: IValidForOrgUnits[],
                                     validForRoles: string[],
                                     applicationCategory: string[],
                                     hasCost: boolean,
                                     licenseEnforcement: string,
                                     unitCost: string,
                                     status: string) => {
    const url = `${RESOURCE_API_URL}${BASE_PATH}/api/resources/v1`
    logger.debug("POST CREATE RESOURCE to ", url, " with body ", JSON.stringify({
        resourceId: resourceId,
        resourceName: resourceName,
        resourceType: resourceType,
        platform: platform,
        accessType: accessType,
        resourceLimit: resourceLimit,
        resourceOwnerOrgUnitId: resourceOwnerOrgUnitId,
        resourceOwnerOrgUnitName: resourceOwnerOrgUnitName,
        validForOrgUnits: validForOrgUnits,
        validForRoles: validForRoles,
        applicationCategory: applicationCategory,
        hasCost: hasCost,
        licenseEnforcement: licenseEnforcement,
        unitCost: unitCost,
        status: status
    }));
    const validForOrg = validForOrgUnits.length > 0 ? validForOrgUnits : [];
    const response = await fetch(url, {
        headers: {
            Authorization: token ?? "",
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            resourceId: resourceId,
            resourceName: resourceName,
            resourceType: resourceType,
            platform: platform,
            accessType: accessType,
            resourceLimit: resourceLimit,
            resourceOwnerOrgUnitId: resourceOwnerOrgUnitId,
            resourceOwnerOrgUnitName: resourceOwnerOrgUnitName,
            validForOrgUnits: validForOrg,
            validForRoles: validForRoles,
            applicationCategory: applicationCategory,
            hasCost: hasCost,
            licenseEnforcement: licenseEnforcement,
            unitCost: unitCost,
            status: status
        })
    });
    logger.debug("(((Response from CREATE Resource)))", url, response.status);
    return response;
}

export const deleteResource = async (request: Request, id: string) => {

    const url = `${RESOURCE_API_URL}${BASE_PATH}/api/resources/v1/${id}`
    const response = await fetch(url, {
        headers: changeAppTypeInHeadersAndReturnHeaders(request.headers),
        method: 'DELETE'
    });
    logger.debug("Response from deleteResource", url, response.status);

    return response;
}


export const fetchOrgUnits = async (request: Request) => {
    const response = await fetch(`${ORG_UNIT_API_URL}${BASE_PATH}/api/orgunits`, {
        headers: request.headers
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
