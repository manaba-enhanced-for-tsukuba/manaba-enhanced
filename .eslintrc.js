module.exports = {
  env: {
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
    ecmaVersion: 11,
    sourceType: "module",
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
