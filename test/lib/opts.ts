import $assert from 'power-assert';
import $lodash from 'lodash';
import $chalk from 'chalk';
import { Factory } from './types';
import { Message } from '../../src/types';

export default function forkTest(Logger: Factory, mode: string) {
  let msg: Message = null;
  const logger = new Logger({
    color: false,
    stringify: true,
    transport: (message) => {
      msg = message;
      // console.log(msg);
    },
  });

  describe('disable color', () => {
    let fork1 = null;
    beforeAll(() => {
      fork1 = logger.fork();
    });

    test('logger color is disabled', () => {
      logger.warn('color-warn');

      const time = $lodash.get(msg, '__content[0]', '') as string;
      $assert.equal(time.substr(0, 4), new Date().getFullYear());

      const icon = $lodash.get(msg, '__content[1]');
      $assert.equal(icon, '[!]');

      const content = $lodash.get(msg, '__content[2]');
      $assert.equal(content, 'color-warn');
    });

    test('fork1 content is enabled', () => {
      fork1.error('fork1');
      if (mode === 'server') {
        const content = $lodash.get(msg, '__content[2]');
        $assert.equal(content, $chalk.red('fork1'));
      } else {
        const content = $lodash.get(msg, '__content[3]');
        $assert.equal(content, 'color: red;');
      }
    });

    test('logger content is stringified', () => {
      const unde = void 0;
      logger.info(1, true, null, unde, 'l1\nl2', { a: 1 });

      $assert($lodash.get(msg, '__content[2]') === '1');
      $assert($lodash.get(msg, '__content[3]') === 'true');
      $assert($lodash.get(msg, '__content[4]') === 'null');
      $assert($lodash.get(msg, '__content[5]') === 'undefined');
      $assert($lodash.get(msg, '__content[6]') === 'l1 l2');
      $assert($lodash.get(msg, '__content[7]') === '{"a":1}');
    });
  });
}
