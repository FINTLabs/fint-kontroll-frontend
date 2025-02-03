import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: './jest',
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.tsx$': 'ts-jest',
        '^.+\\.js$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export default config;
