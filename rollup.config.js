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

export default conf;
