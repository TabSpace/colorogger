import $assert from 'power-assert';
import { Factory } from './types';
import { Message } from '../../src/types';

export default function forkTest(Logger: Factory) {
  let msg: Message = null;
  const logger = new Logger({
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
}
