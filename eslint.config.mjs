import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import configPrettier from "eslint-config-prettier";

export default [
  {
    files: ["webpack.config.js", "webpack.*.js", "vite.config.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,vue}"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  ...pluginVue.configs["flat/recommended"],
  pluginJs.configs.recommended,
  configPrettier,
];
