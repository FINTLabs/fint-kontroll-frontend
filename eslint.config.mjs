import js from '@eslint/js';
import path from "path";
import { fileURLToPath } from "url";
import typescriptParser from "@typescript-eslint/parser";
import globals from "globals";
import React from "eslint-plugin-react";
import JsxA11y from "eslint-plugin-jsx-a11y";
import TypescriptEslint from "@typescript-eslint/eslint-plugin";
import Import from "eslint-plugin-import";
import { defineConfig, globalIgnores } from "@eslint/config-helpers";
import { FlatCompat } from "@eslint/eslintrc";
import js from '@eslint/js';
import { fixupPluginRules, fixupConfigRules } from "@eslint/compat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

  const compatWithRecommended = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
  });
  const compat = new FlatCompat({
    baseDirectory: __dirname,
  });
export default defineConfig([
  globalIgnores(["node_modules","/.cache","/build","/public/build",".env",".idea","/.react-router/","/cypress/screenshots","/cypress/downloads",'!**/.server','!**/.client']),
  {
    extends: fixupConfigRules(compatWithRecommended.extends(
      js.configs.recommended
    )),
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.commonjs,
        ...globals.es6
      },
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
            jsx: true,
        }
      }
    },
    rules: {
      "no-constant-binary-expression": 'off',
      "no-empty-static-block": 'off',
      "no-new-native-nonconstructor": 'off',
      "no-unused-private-class-members": 'off'
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    extends: fixupConfigRules(compat.extends(
      "plugin:react/recommended",
      "plugin:react/jsx-runtime",
      "plugin:react-hooks/recommended",
      "plugin:jsx-a11y/recommended"
    )),
    plugins: {
      react: fixupPluginRules(React),
      "jsx-a11y": fixupPluginRules(JsxA11y)
    },
    languageOptions: {
      parser: typescriptParser
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: fixupConfigRules(compat.extends(
      "plugin:@typescript-eslint/recommended",
      "plugin:import/recommended",
      "plugin:import/typescript"
    )),
    plugins: {
      "@typescript-eslint": fixupPluginRules(TypescriptEslint),
      import: fixupPluginRules(Import)
    },
    languageOptions: {
      parser: typescriptParser
    },
  },
  {
    files: ['.eslintrc.cjs'],
    languageOptions: {
      globals: {
        ...globals.node
      },
      parser: typescriptParser
    },
  }
]);
