import { vitePlugin as remix } from '@remix-run/dev';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { BASE_PATH } from './environment';

//installGlobals();

export default defineConfig({
    base: `${BASE_PATH === '/' ? '' : BASE_PATH}/`,
    plugins: [
        remix({
            basename: `${BASE_PATH.replace(/\/$/, '')}`,
            future: {
                v3_fetcherPersist: true,
                v3_relativeSplatPath: true,
                v3_throwAbortReason: true,
            },
        }),
        tsconfigPaths(),
    ],
});
