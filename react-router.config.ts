import type { Config } from '@react-router/dev/config';
import { BASE_PATH } from './environment';

export default {
    basename: `${BASE_PATH === '/' ? '' : BASE_PATH}`,
} satisfies Config;
