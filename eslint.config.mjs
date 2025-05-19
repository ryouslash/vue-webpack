import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";

export default defineConfig([
  {
    ignores: ["dist/**", "webpack.*.js", "postcss.config.js"],
  },
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: { globals: globals.browser },
  },
  pluginVue.configs["flat/essential"],
]);
