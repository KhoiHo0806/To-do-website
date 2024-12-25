import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import eslintPluginImport from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: eslintPluginImport,
      prettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": "error",
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"], // Built-in and external libraries
            ["internal", "parent", "sibling", "index"], // Project files
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true }, // Alphabetical sorting
        },
      ],
    },
    ignores: ["node_modules"],
  },
  eslintConfigPrettier
);
