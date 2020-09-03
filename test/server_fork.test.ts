import $assert from 'power-assert';
import $logger from '../src/server';

let msg = null;
const logger = new $logger({
  transport: (message) => {
    msg = message;
  },
});

describe('fork transport', () => {
  let fork1 = null;
  beforeAll(() => {
    fork1 = logger.fork();
    fork1.log('fork1');
  });

  test('msg.content', () => {
    $assert.equal(msg.content[0], 'fork1');
  });
});
