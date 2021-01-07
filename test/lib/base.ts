import $assert from 'power-assert';
import { Factory } from './types';

export default function baseTest(Logger: Factory) {
  const logger = new Logger();

  describe('logger methods', () => {
    test('logger has fn log', () => {
      $assert(typeof logger.log === 'function');
      logger.log('log');
    });
    test('logger has fn info', () => {
      $assert(typeof logger.info === 'function');
      logger.info('info');
    });
    test('logger has fn debug', () => {
      $assert(typeof logger.debug === 'function');
      logger.debug('debug');
    });
    test('logger has fn warn', () => {
      $assert(typeof logger.warn === 'function');
      logger.warn('warn');
    });
    test('logger has fn error', () => {
      $assert(typeof logger.error === 'function');
      logger.error('error');
    });
    test('logger has fn success', () => {
      $assert(typeof logger.success === 'function');
      logger.success('success');
    });
    test('logger has fn fail', () => {
      $assert(typeof logger.fail === 'function');
      logger.fail('fail');
    });
    test('logger has fn tip', () => {
      $assert(typeof logger.tip === 'function');
      logger.tip('tip');
    });
    test('logger has fn stress', () => {
      $assert(typeof logger.stress === 'function');
      logger.stress('stress');
    });
  });
}
