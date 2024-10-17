export const SETTINGS = "/innstillinger"

export const SETTINGS_APPLICATION_CATEGORY = "/innstillinger/applikasjonskategori"
export const SETTINGS_APPLICATION_CATEGORY_CREATE = "/innstillinger/applikasjonskategori/rediger"
export const getApplicationCategoryEditUrl = (id: number): string => `/innstillinger/applikasjonskategori/${id}/rediger`;
export const getApplicationCategoryDeleteUrl = (id: number): string => `/innstillinger/applikasjonskategori/${id}/slett`;

export const SETTINGS_USER_TYPES = "/innstillinger/user-types"
