import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000/fintlabs-no',
        testIsolation: false,
        viewportHeight: 2000,
        viewportWidth: 1536,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
