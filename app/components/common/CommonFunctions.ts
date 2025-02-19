import React from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import { Navigation } from '@remix-run/react';
import { IResourceModuleUserRole } from '~/data/types/resourceTypes';
import { ICookie } from '~/data/types/generalTypes';
import { IKodeverkLicenseEnforcement, IKodeverkUserType } from '~/data/types/kodeverkTypes';
import { IAccessRole, IMeRole } from '~/data/types/userTypes';

// Discovers all query params and formats them. Returns a string prepared for insertion in an url.
export const prepareQueryParams = (searchParams: URLSearchParams): string => {
    const search = searchParams.get('search');
    const page = searchParams.get('page');
    const status = searchParams.get('status');
    const orgunit = searchParams.get('orgunit'); // These are used in tandem since some apis don't use capitalization the same way
    const orgUnit = searchParams.get('orgUnit'); // These are used in tandem since some apis don't use capitalization the same way
    const name = searchParams.get('name');
    // const responseCode = searchParams.get("responseCode")

    const queryParams = [
        search && `search=${encodeURIComponent(search)}`,
        page && `page=${encodeURIComponent(page)}`,
        status && `status=${encodeURIComponent(status)}`,
        orgunit && `orgunit=${encodeURIComponent(orgunit)}`,
        orgUnit && `orgUnit=${encodeURIComponent(orgUnit)}`,
        name && `name=${encodeURIComponent(name)}`,
        // responseCode && `responseCode=${encodeURIComponent(responseCode)}`
    ]
        .filter(Boolean)
        .join('&');

    return queryParams ? `?${queryParams}` : '';
};

export const prepareQueryParamsWithResponseCode = (searchParams: URLSearchParams): string => {
    const search = searchParams.get('search');
    const page = searchParams.get('page');
    const orgunit = searchParams.get('orgunit'); // These are used in tandem since some apis don't use capitalization the same way
    const orgUnit = searchParams.get('orgUnit'); // These are used in tandem since some apis don't use capitalization the same way
    const name = searchParams.get('name');
    const responseCode = searchParams.get('responseCode');

    const queryParams = [
        search && `search=${encodeURIComponent(search)}`,
        page && `page=${encodeURIComponent(page)}`,
        orgunit && `orgunit=${encodeURIComponent(orgunit)}`,
        orgUnit && `orgUnit=${encodeURIComponent(orgUnit)}`,
        name && `name=${encodeURIComponent(name)}`,
        responseCode && `responseCode=${encodeURIComponent(responseCode)}`,
    ]
        .filter(Boolean)
        .join('&');

    return queryParams ? `?${queryParams}` : '';
};

// search=value - Is the same as Name, but API specifies this instead of "name". Sets 'search' param to searchValue
export const handleSearchFieldString = (
    event: React.FormEvent<HTMLFormElement>,
    setSearchParams: SetURLSearchParams,
    searchValue: string
) => {
    setSearchParams((searchParams) => {
        searchValue ? searchParams.set('search', searchValue) : searchParams.delete('search');
        return searchParams;
    });
    event.preventDefault(); // Prevent refresh of page
};

// Clears queryparam: 'search'
export const handleClearSearchFieldString = (setSearchParams: SetURLSearchParams) => {
    setSearchParams((searchParameter) => {
        searchParameter.delete('search');
        return searchParameter;
    });
};
// -----

// When any filter is changed, reset "page" query param
export const filterResetPageParam = (
    pageParam: string | null,
    setSearchParams: SetURLSearchParams
) => {
    pageParam
        ? setSearchParams((prev) => {
              prev.get('page') ? prev.delete('page') : null;
              return prev;
          })
        : null;
};

// Sets Size Cookie client side
export const setSizeCookieClientSide = (sizeToSet: string) => {
    document.cookie = 'size=' + sizeToSet + ';path=/';
};

// Helper function for creating a key-value pair list of cookies
export const keyValueParseCookies = (cookies: string): ICookie[] => {
    return cookies.split(';').map((cookie) => {
        const [key, ...valueParts] = cookie.trim().split('=');
        const value = decodeURIComponent(valueParts.join('='));
        return { key, value };
    });
};

// Get Size Cookie from request and return it
export const getSizeCookieFromRequestHeader = (request: Request): ICookie | null => {
    const cookieHeader: string | null = request.headers.get('Cookie');
    if (cookieHeader) {
        const cookies = keyValueParseCookies(cookieHeader);
        const size = cookies.find((cookie) => cookie.key === 'size');
        return size ? size : null;
    }
    return null;
};

export const translateUserTypeToLabel = (
    role: string,
    userTypes: IKodeverkUserType[] | undefined
) => {
    const userType = userTypes?.find((userType) => userType.label === role);
    return userType ? userType.fkLabel : role;
};

export const translateLicenseEnforcementToLabel = (
    licenseEnforcement: string,
    licenseEnforcementKodeverk: IKodeverkLicenseEnforcement[] | undefined
) => {
    const enforcement = licenseEnforcementKodeverk?.find(
        (enforcement) => enforcement.label === licenseEnforcement
    );
    return enforcement ? enforcement.fkLabel : licenseEnforcement;
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const sortAndCapitalizeRoles = <T extends IAccessRole | IResourceModuleUserRole | IMeRole>(
    roles: T[],
    removeUnusedRoles?: boolean
): T[] => {
    const roleNameSortOrder = [
        'systemadministrator',
        'ressursadministrator',
        'tjenesteadministrator',
        'tildeler',
        'leder',
        'godkjenner',
        'sluttbruker',
        'portaladmin',
    ];
    const unusedRoles = ['leder', 'godkjenner', 'sluttbruker', 'portaladmin'];
    let filteredRoles = roles;

    if (removeUnusedRoles) {
        filteredRoles = roles.filter((role) => {
            const roleName = 'name' in role ? role.name : role.roleName;
            return !unusedRoles.includes(roleName.toLowerCase());
        });
    }

    return filteredRoles
        .sort((a, b) => {
            const aName = 'name' in a ? a.name : a.roleName;
            const bName = 'name' in b ? b.name : b.roleName;
            return (
                roleNameSortOrder.indexOf(aName.toLowerCase()) -
                roleNameSortOrder.indexOf(bName.toLowerCase())
            );
        })
        .map((role) => ({
            ...role,
            ...('name' in role
                ? { name: capitalize(role.name) }
                : { roleName: capitalize(role.roleName) }),
        }));
};
