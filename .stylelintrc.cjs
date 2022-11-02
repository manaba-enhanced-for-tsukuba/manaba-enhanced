module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-standard-scss"],
  rules: {
    "selector-class-pattern": null,
    // FIXME: Disallow ASAP
    "no-descending-specificity": null,
  },
}
