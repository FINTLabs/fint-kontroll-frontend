export const SETTINGS = "/innstillinger"

export const SETTING_APPLICATION_CATEGORY = "/innstillinger/applikasjonskategori"
export const SETTING_APPLICATION_CATEGORY_CREATE = "/innstillinger/applikasjonskategori/rediger"
export const getApplicationCategoryEditUrl = (id: number): string => `/innstillinger/applikasjonskategori/${id}/rediger`;
export const getApplicationCategoryDeleteUrl = (id: number): string => `/innstillinger/applikasjonskategori/${id}/slett`;

export const SETTING_USER_TYPES = "/innstillinger/user-types"
