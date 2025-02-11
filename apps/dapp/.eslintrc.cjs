/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "@repo/eslint-config/react.js",
    "plugin:storybook/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: [
      "./tsconfig.json",
      "./tsconfig.node.json",
      "./cypress/tsconfig.json",
    ],
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": 1,
    // "@typescript-eslint/strict-boolean-expressions": "error",
  },
};
