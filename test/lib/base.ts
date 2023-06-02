import $lodash from 'lodash';
import $chalk from 'chalk';
import { Message } from '../../src/types';
import { Factory } from './types';
import {
  COLOR_LOG,
  COLOR_DEBUG,
  COLOR_INFO,
  COLOR_WARN,
  COLOR_ERROR,
  COLOR_SUCCESS,
  COLOR_TIP,
  COLOR_FAIL,
  COLOR_STRESS,
} from '../../src/mods/constants';

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

    test(`logger.log color is ${COLOR_LOG}`, () => {
      logger.log('log');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[1]')).toBe(`color: gray;`);
        expect($lodash.get(msg, '__content[2]')).toBe(`color: ${COLOR_LOG};`);
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.hex(COLOR_LOG)('[.]'));
      }
    });

    test('logger has fn info', () => {
      expect(typeof logger.info).toBe('function');
    });

    test(`logger.info color is ${COLOR_INFO}`, () => {
      logger.info('info');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe(`color: ${COLOR_INFO};`);
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.hex(COLOR_INFO)('[*]'));
      }
    });

    test('logger has fn debug', () => {
      expect(typeof logger.debug).toBe('function');
    });

    test(`logger.debug color is ${COLOR_DEBUG}`, () => {
      logger.debug('debug');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe(`color: ${COLOR_DEBUG};`);
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.hex(COLOR_DEBUG)('[#]'));
      }
    });

    test('logger has fn warn', () => {
      expect(typeof logger.warn).toBe('function');
    });

    test(`logger.warn color is ${COLOR_WARN}`, () => {
      logger.warn('warn');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe(`color: ${COLOR_WARN};`);
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.hex(COLOR_WARN)('[!]'));
      }
    });

    test('logger has fn error', () => {
      expect(typeof logger.error).toBe('function');
    });

    test(`logger.error color is ${COLOR_ERROR}`, () => {
      logger.error('error');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe(`color: ${COLOR_ERROR};`);
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.hex(COLOR_ERROR)('[x]'));
      }
    });

    test('logger has fn success', () => {
      expect(typeof logger.success).toBe('function');
    });

    test(`logger.success color is ${COLOR_SUCCESS}`, () => {
      logger.success('success');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe(`color: ${COLOR_SUCCESS};`);
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.hex(COLOR_SUCCESS)('[✓]'));
      }
    });

    test('logger has fn fail', () => {
      expect(typeof logger.fail).toBe('function');
    });

    test(`logger.fail color is ${COLOR_FAIL}`, () => {
      logger.fail('fail');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe(`color: ${COLOR_FAIL};`);
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.hex(COLOR_FAIL)('[☢]'));
      }
    });

    test('logger has fn tip', () => {
      expect(typeof logger.tip).toBe('function');
    });

    test(`logger.tip color is ${COLOR_TIP}`, () => {
      logger.tip('tip');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe(`color: ${COLOR_TIP};`);
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.hex(COLOR_TIP)('[✱]'));
      }
    });

    test('logger has fn stress', () => {
      expect(typeof logger.stress).toBe('function');
    });

    test(`logger.stress color is ${COLOR_STRESS}`, () => {
      logger.stress('stress');
      if (mode === 'client') {
        expect($lodash.get(msg, '__content[2]')).toBe(`color: ${COLOR_STRESS};`);
      } else {
        expect($lodash.get(msg, '__content[1]')).toBe($chalk.hex(COLOR_STRESS)('[⚑]'));
      }
    });
  });
}
