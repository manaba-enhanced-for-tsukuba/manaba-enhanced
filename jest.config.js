module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest"],
  },
  globals: {
    chrome: {
      i18n: {
        getMessage: (key) => key,
      },
    },
  },
}
