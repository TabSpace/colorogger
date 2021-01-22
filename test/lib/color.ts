import $assert from 'power-assert';
import $lodash from 'lodash';
import $chalk from 'chalk';
import { Factory } from './types';
import { Message } from '../../src/types';

export default function forkTest(Logger: Factory, mode: string) {
  let msg: Message = null;
  const logger = new Logger({
    color: false,
    transport: (message) => {
      msg = message;
    },
  });

  describe('disable color', () => {
    let fork1 = null;
    beforeAll(() => {
      fork1 = logger.fork();
    });

    logger.warn('color-warn');

    test('logger content color is disabled', () => {
      const content = $lodash.get(msg, '__content[2]');
      $assert.equal(content, 'color-warn');
    });

    test('logger icon color is disabled', () => {
      const icon = $lodash.get(msg, '__content[1]');
      $assert.equal(icon, '[!]');
    });

    test('logger time color is disabled', () => {
      const time = $lodash.get(msg, '__content[0]', '') as string;
      $assert.equal(time.substr(0, 4), new Date().getFullYear());
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
  });
}
