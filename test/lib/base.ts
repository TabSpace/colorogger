import $lodash from 'lodash';
import $chalk from 'chalk';
import { Message } from '../../src/types';
import { Factory } from './types';

export default function baseTest(Logger: Factory, mode: string) {
  let msg: Message | null = null;

  const logger = new Logger({
    transport: (message) => {
      msg = message;
    },
  });

  describe('logger methods', () => {
    test('logger has fn log', () => {
      expect(typeof logger.log).toBe('function');
    });

    test('logger.log color is normal', () => {
      logger.log('log');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[1]')).toBe('color: gray;');
        expect($lodash.get(msg, '__content[2]')).toBe('color: ;');
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe('[.]');
      }
    });

    test('logger has fn info', () => {
      expect(typeof logger.info).toBe('function');
    });

    test('logger.info color is #1e90ff', () => {
      logger.info('info');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe('color: #1e90ff;');
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.hex('#1e90ff')('[*]'));
      }
    });

    test('logger has fn debug', () => {
      expect(typeof logger.debug).toBe('function');
    });

    test('logger.debug color is magenta', () => {
      logger.debug('debug');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe('color: magenta;');
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.magenta('[#]'));
      }
    });

    test('logger has fn warn', () => {
      expect(typeof logger.warn).toBe('function');
    });

    test('logger.warn color is #ffd700', () => {
      logger.warn('warn');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe('color: #ffd700;');
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.hex('#ffd700')('[!]'));
      }
    });

    test('logger has fn error', () => {
      expect(typeof logger.error).toBe('function');
    });

    test('logger.error color is red', () => {
      logger.error('error');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe('color: red;');
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.red('[x]'));
      }
    });

    test('logger has fn success', () => {
      expect(typeof logger.success).toBe('function');
    });

    test('logger.success color is green', () => {
      logger.success('success');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe('color: green;');
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.green('[✓]'));
      }
    });

    test('logger has fn fail', () => {
      expect(typeof logger.fail).toBe('function');
    });

    test('logger.fail color is red', () => {
      logger.fail('fail');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe('color: red;');
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.red('[☢]'));
      }
    });

    test('logger has fn tip', () => {
      expect(typeof logger.tip).toBe('function');
    });

    test('logger.tip color is cyan', () => {
      logger.tip('tip');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe('color: cyan;');
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.cyan('[✱]'));
      }
    });

    test('logger has fn stress', () => {
      expect(typeof logger.stress).toBe('function');
    });

    test('logger.stress color is magenta', () => {
      logger.stress('stress');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe('color: magenta;');
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.magenta('[⚑]'));
      }
    });
  });
}
