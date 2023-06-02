module.exports = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.test.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
    }],
  },
};
