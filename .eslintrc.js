module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  plugins: ["import", "@typescript-eslint"],
  rules: {
    eqeqeq: "error",
    "no-console": "warn",
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-namespace": 0,
    "import/order": [
      2,
      {
        alphabetize: { caseInsensitive: true, order: "asc" },
        groups: [["builtin", "external"], "parent", ["sibling", "index"]],
        "newlines-between": "always",
      },
    ],
    "import/first": 2,
    "import/export": 1,
  },
}
