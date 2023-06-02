import { Factory } from './types';
import { Message } from '../../src/types';

export default function forkTest(Logger: Factory) {
  let msg: Message | null = null;
  const logger = new Logger({
    transport: (message) => {
      msg = message;
    },
  });

  describe('fork transport', () => {
    let fork1: typeof logger | null = null;
    beforeAll(() => {
      fork1 = logger.fork();
      fork1.log('fork1');
    });

    test('msg.content', () => {
      const val = msg?.content?.[0];
      expect(val).toBe('fork1');
    });
  });
}
