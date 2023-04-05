/** @format */

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 'off',
    'no-use-before-define': ['error', { functions: false, classes: false }],
    'no-unused-vars': 0,
    'no-alert': 'off',
    'no-param-reassign': 0,
    'arrow-body-style': 'off',
  },
};
