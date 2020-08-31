import typescript from 'rollup-plugin-typescript';

export default [{
  input: 'src/server.ts',
  output: {
    file: 'dist/server.js',
    format: 'cjs'
  },
  plugins: [
    typescript()
  ]
}, {
  input: 'src/client.ts',
  output: {
    name: 'colorogger',
    file: 'dist/client.js',
    format: 'umd'
  }
}];
