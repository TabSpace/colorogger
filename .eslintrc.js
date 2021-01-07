// https://github.com/AlloyTeam/eslint-config-alloy

module.exports = {
  root: true,
  env: {
    jest: true,
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'alloy',
    'alloy/typescript',
    'plugin:@typescript-eslint/recommended',
  ],
};
