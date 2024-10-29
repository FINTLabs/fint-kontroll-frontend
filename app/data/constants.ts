export const SETTINGS = "/innstillinger"

export const SETTINGS_APPLICATION_CATEGORY = "/innstillinger/applikasjonskategori"
export const SETTINGS_APPLICATION_CATEGORY_CREATE = "/innstillinger/applikasjonskategori/rediger"
export const getApplicationCategoryEditUrl = (id: number): string => `/innstillinger/applikasjonskategori/${id}/rediger`;
export const getApplicationCategoryDeleteUrl = (id: number): string => `/innstillinger/applikasjonskategori/${id}/slett`;

export const SETTINGS_USER_TYPES = "/innstillinger/brukertyper"
export const getEditUserTypeUrl = (id: number): string => `/innstillinger/brukertyper/${id}/rediger`;

export const SETTINGS_LICENSE_MODEL = "/innstillinger/lisensmodeller"
export const SETTINGS_LICENSE_MODEL_CREATE = "/innstillinger/lisensmodeller/rediger"
export const getLicenseModelEditUrl = (id: number): string => `/innstillinger/lisensmodeller/${id}/rediger`;
export const getLicenseModelDeleteUrl = (id: number): string => `/innstillinger/lisensmodeller/${id}/slett`;

export const SETTINGS_LICENSE_ENFORCEMENT = "/innstillinger/haandhevingstype"
