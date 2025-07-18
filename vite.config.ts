import { reactRouter } from '@react-router/dev/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import {BASE_PATH} from "./environment";

export default defineConfig({
    base: `${BASE_PATH === '/' ? '' : BASE_PATH}/`,
    css: { postcss: { plugins: [tailwindcss, autoprefixer] } },

    plugins: [reactRouter(), tsconfigPaths()],
});
