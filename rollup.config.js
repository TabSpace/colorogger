import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const conf = [];

const typescriptConf = {
  target: 'es5',
  sourceMap: false,
  module: 'ESNext',
  esModuleInterop: true,
  rollupCommonJSResolveHack: true,
  clean: true,
  tsconfig: './tsconfig.json',
  tsconfigOverride: {
    compilerOptions : {
      module: 'es2015',
    },
  },
};

conf.push({
  input: 'src/server.ts',
  output: {
    file: 'lib/server.js',
    exports: 'default',
    format: 'cjs',
  },
  external: Object.keys(pkg.dependencies),
  plugins: [
    typescript({
      ...typescriptConf,
      target: 'es6',
    }),
  ],
});

conf.push({
  input: 'src/client.ts',
  output: {
    name: 'colorogger',
    file: 'lib/client.js',
    format: 'umd',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript(typescriptConf),
  ]
});

export default conf;
