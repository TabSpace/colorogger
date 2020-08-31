import typescript from 'rollup-plugin-typescript';

export default [{
  input: 'src/server.ts',
  output: {
    file: 'lib/server.js',
    format: 'cjs'
  },
  plugins: [
    typescript()
  ]
}, {
  input: 'src/client.ts',
  output: {
    name: 'colorogger',
    file: 'lib/client.js',
    format: 'umd'
  },
  plugins: [
    typescript()
  ]
}];
