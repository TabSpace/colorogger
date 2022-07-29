module.exports = {
  root: true,
  env: {
    jest: true,
    browser: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  extends: [
    'airbnb-base',
  ],
  overrides: [{
    files: ['*.ts', '*.tsx'],
    extends: [
      'airbnb-typescript/base',
    ],
    parser: '@typescript-eslint/parser',
    // @see https://stackoverflow.com/questions/58510287/parseroptions-project-has-been-set-for-typescript-eslint-parser/64488474
    parserOptions: {
      sourceType: 'module',
      project: './tsconfig.eslint.json',
    },
  }],
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 0,
    'class-methods-use-this': 0,
  },
};
