import $lodash from 'lodash';
import $chalk from 'chalk';
import { Factory } from './types';
import { Message } from '../../src/types';

export default function forkTest(Logger: Factory, mode: string) {
  let msg: Message | null = null;
  const logger = new Logger({
    color: false,
    stringify: true,
    transport: (message) => {
      msg = message;
      // console.log(msg);
    },
  });

  describe('disable color', () => {
    let fork1: typeof logger;
    beforeAll(() => {
      fork1 = logger.fork();
    });

    test('logger color is disabled', () => {
      logger.warn('color-warn');

      const time = $lodash.get(msg, '__content[0]', '') as string;
      expect(time.substring(0, 4)).toBe(new Date().getFullYear());

      const icon = $lodash.get(msg, '__content[1]');
      expect(icon).toBe('[!]');

      const content = $lodash.get(msg, '__content[2]');
      expect(content).toBe('color-warn');
    });

    test('fork1 content is enabled', () => {
      fork1.error('fork1');
      if (mode === 'server') {
        const content = $lodash.get(msg, '__content[2]');
        expect(content).toBe($chalk.red('fork1'));
      } else {
        const content = $lodash.get(msg, '__content[3]');
        expect(content).toBe('color: red;');
      }
    });

    test('logger content is stringified', () => {
      const unde = void 0;
      logger.info(1, true, null, unde, 'l1\nl2', { a: 1 });

      expect($lodash.get(msg, '__content[2]')).toBe('1');
      expect($lodash.get(msg, '__content[3]')).toBe('true');
      expect($lodash.get(msg, '__content[4]')).toBe('null');
      expect($lodash.get(msg, '__content[5]')).toBe('undefined');
      expect($lodash.get(msg, '__content[6]')).toBe('l1 l2');
      expect($lodash.get(msg, '__content[7]')).toBe('{"a":1}');
    });
  });
}
