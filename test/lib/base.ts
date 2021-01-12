import $assert from 'power-assert';
import $lodash from 'lodash';
import $chalk from 'chalk';
import { Message } from '../../src/types';
import { Factory } from './types';

export default function baseTest(Logger: Factory, mode: string) {
  let msg: Message = null;

  const logger = new Logger({
    transport: (message) => {
      msg = message;
    },
  });

  describe('logger methods', () => {
    test('logger has fn log', () => {
      $assert(typeof logger.log === 'function');
    });

    test('logger.log color is normal', () => {
      logger.log('log');
      if (mode === 'client') {
        $assert.equal($lodash.get(msg, '__content[1]'), 'color: gray;');
        $assert.equal($lodash.get(msg, '__content[2]'), 'color: ;');
      } else {
        $assert.equal($lodash.get(msg, '__content[1]'), '[.]');
      }
    });

    test('logger has fn info', () => {
      $assert(typeof logger.info === 'function');
    });

    test('logger.info color is #1e90ff', () => {
      logger.info('info');
      if (mode === 'client') {
        $assert.equal($lodash.get(msg, '__content[2]'), 'color: #1e90ff;');
      } else {
        $assert.equal($lodash.get(msg, '__content[1]'), $chalk.hex('#1e90ff')('[*]'));
      }
    });

    test('logger has fn debug', () => {
      $assert(typeof logger.debug === 'function');
    });

    test('logger.debug color is magenta', () => {
      logger.debug('debug');
      if (mode === 'client') {
        $assert.equal($lodash.get(msg, '__content[2]'), 'color: magenta;');
      } else {
        $assert.equal($lodash.get(msg, '__content[1]'), $chalk.magenta('[#]'));
      }
    });

    test('logger has fn warn', () => {
      $assert(typeof logger.warn === 'function');
    });

    test('logger.warn color is #ffd700', () => {
      logger.warn('warn');
      if (mode === 'client') {
        $assert.equal($lodash.get(msg, '__content[2]'), 'color: #ffd700;');
      } else {
        $assert.equal($lodash.get(msg, '__content[1]'), $chalk.hex('#ffd700')('[!]'));
      }
    });

    test('logger has fn error', () => {
      $assert(typeof logger.error === 'function');
    });

    test('logger.error color is red', () => {
      logger.error('error');
      if (mode === 'client') {
        $assert.equal($lodash.get(msg, '__content[2]'), 'color: red;');
      } else {
        $assert.equal($lodash.get(msg, '__content[1]'), $chalk.red('[x]'));
      }
    });

    test('logger has fn success', () => {
      $assert(typeof logger.success === 'function');
    });

    test('logger.success color is green', () => {
      logger.success('success');
      if (mode === 'client') {
        $assert.equal($lodash.get(msg, '__content[2]'), 'color: green;');
      } else {
        $assert.equal($lodash.get(msg, '__content[1]'), $chalk.green('[✓]'));
      }
    });

    test('logger has fn fail', () => {
      $assert(typeof logger.fail === 'function');
    });

    test('logger.fail color is red', () => {
      logger.fail('fail');
      if (mode === 'client') {
        $assert.equal($lodash.get(msg, '__content[2]'), 'color: red;');
      } else {
        $assert.equal($lodash.get(msg, '__content[1]'), $chalk.red('[☢]'));
      }
    });

    test('logger has fn tip', () => {
      $assert(typeof logger.tip === 'function');
    });

    test('logger.tip color is cyan', () => {
      logger.tip('tip');
      if (mode === 'client') {
        $assert.equal($lodash.get(msg, '__content[2]'), 'color: cyan;');
      } else {
        $assert.equal($lodash.get(msg, '__content[1]'), $chalk.cyan('[✱]'));
      }
    });

    test('logger has fn stress', () => {
      $assert(typeof logger.stress === 'function');
    });

    test('logger.stress color is magenta', () => {
      logger.stress('stress');
      if (mode === 'client') {
        $assert.equal($lodash.get(msg, '__content[2]'), 'color: magenta;');
      } else {
        $assert.equal($lodash.get(msg, '__content[1]'), $chalk.magenta('[⚑]'));
      }
    });
  });
}
