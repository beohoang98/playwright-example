module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: ["plugin:@typescript-eslint/recommended"],
  plugins: ["cucumber", "prettier"],
  rules: {
    "prettier/prettier": "warn",
    "cucumber/async-then": ["error", { all: true }],
    "cucumber/expression-type": ["error", "RegExp"],
    "cucumber/no-restricted-tags": ["error", "broken", "wip"],
    "cucumber/no-arrow-functions": "error",
  },
};
