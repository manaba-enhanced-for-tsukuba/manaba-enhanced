module.exports = {
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    chrome: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    eqeqeq: "error",
    "no-console": "warn",
    "prettier/prettier": [
      "error",
      {
        endOfLine: "lf",
        semi: false,
        singleQuote: false,
        tabWidth: 2,
        trailingComma: "es5",
      },
    ],
  },
}
