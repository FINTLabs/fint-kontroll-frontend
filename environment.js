import * as process from 'node:process';
import 'dotenv/config';

/*export const BASE_PATH = process.env.BASE_PATH || '/beta/fintlabs-no';*/
export const BASE_PATH = process.env.BASE_PATH || '/fintlabs-no';

export const PORT = process.env.PORT || '3000';

export const USER_API_URL = process.env.USER_API_URL || 'http://localhost:8062';
export const ROLE_API_URL = process.env.ROLE_API_URL || 'http://localhost:8064';
export const DEVICE_API_URL = process.env.DEVICE_API_URL || 'http://localhost:8065';
export const RESOURCE_API_URL = process.env.RESOURCE_API_URL || 'http://localhost:8063';
export const ASSIGNMENT_API_URL = process.env.ASSIGNMENT_API_URL || 'http://localhost:8061';
export const ACCESS_MANAGEMENT_API_URL =
    process.env.ACCESS_MANAGEMENT_API_URL || 'http://localhost:53989';
export const ORG_UNIT_API_URL = process.env.ORG_UNIT_API_URL || 'http://localhost:8060';

export const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
