// https://github.com/AlloyTeam/eslint-config-alloy

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'alloy',
    'alloy/typescript',
  ],
};
