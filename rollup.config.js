export default [{
  input: 'src/server.ts',
  output: {
    file: 'dist/server.js',
    format: 'cjs'
  }
}, {
  input: 'src/client.ts',
  output: {
    name: 'colorogger',
    file: 'dist/client.js',
    format: 'umd'
  }
}];
