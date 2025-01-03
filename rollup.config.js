import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const conf = [];

conf.push({
  input: 'lib/client.js',
  output: {
    name: 'colorogger',
    file: 'lib/client.pack.js',
    format: 'umd',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
  ],
});

conf.push({
  input: 'lib/server.js',
  output: {
    name: 'colorogger',
    file: 'lib/server.pack.js',
    format: 'umd',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
  ],
});

export default conf;
