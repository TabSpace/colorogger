import $lodash from 'lodash';
import { Factory } from './types';
import { Message } from '../../src/types';
import Logger from '../../src/mods/logger';

interface CustomLogger extends Logger {
  special?: (...args: unknown[]) => void;
}

export default function logTest(Logger: Factory, mode: string) {
  let msg: Message;

  const logger: CustomLogger = new Logger({
    transport: (message) => {
      msg = message;
    },
  });

  const exampleObject = {
    a: 1,
    b: {
      c: 1,
      d: {
        e: 1,
        f: 2,
      },
    },
  };

  logger.method('special', {
    level: 'special',
    color: '#ff9901',
  });

  describe('logger.log', () => {
    beforeAll(() => {
      logger.log('log content', exampleObject);
    });

    test('msg.content[0] is string', () => {
      const cnt = msg?.content;
      const str = cnt ? cnt[0] : '';
      expect(Array.isArray(cnt)).toBeTruthy();
      expect(str).toBe('log content');
    });

    test('msg.content[1] is object', () => {
      expect(Array.isArray(msg.content)).toBeTruthy();
      expect(typeof $lodash.get(msg, 'content[1]')).toBe('object');
      expect($lodash.get(msg, 'content[1].a')).toBe(1);
    });

    test('msg.__content[3] is object', () => {
      expect(Array.isArray(msg.__content)).toBeTruthy();
      const last = msg.__content?.pop();
      expect(typeof last).toBe('object');
    });

    test('msg.time', () => {
      expect(typeof msg.time).toBe('number');
    });

    test('msg.level', () => {
      expect(msg.level).toBe('log');
    });

    test('msg.grade', () => {
      expect(msg.grade).toBe(1);
    });

    test('msg.flag', () => {
      expect(msg.flag).toBe('');
    });
  });

  describe('logger.info', () => {
    beforeAll(() => {
      logger.info('info', true, { a: 1 }, { b: 2 });
    });

    test('msg.content', () => {
      expect(Array.isArray(msg.content)).toBeTruthy();
      expect($lodash.get(msg, 'content[0]')).toBe('info');
      expect(typeof $lodash.get(msg, 'content[2]')).toBe('object');
      expect($lodash.get(msg, 'content[2].a')).toBe(1);
      if (mode === 'client') {
        expect(Array.isArray(msg.__content)).toBeTruthy();
        const arr = $lodash.get(msg, '__content', []) as object[];
        expect(typeof arr[arr.length - 1]).toBe('object');
        expect(typeof arr[arr.length - 2]).toBe('object');
      }
    });

    test('msg.level', () => {
      expect(msg.level).toBe('info');
    });

    test('msg.grade', () => {
      expect(msg.grade).toBe(2);
    });
  });

  describe('logger.success', () => {
    beforeAll(() => {
      logger.success(true);
    });

    test('msg.content', () => {
      expect(Array.isArray(msg.content)).toBeTruthy();
      expect($lodash.get(msg, 'content[0]')).toBe(true);
    });

    test('msg.level', () => {
      expect(msg.level).toBe('info');
    });

    test('msg.grade', () => {
      expect(msg.grade).toBe(2);
    });

    test('msg.flag', () => {
      expect(msg.flag).toBe('success');
    });
  });

  describe('logger.special', () => {
    beforeAll(() => {
      if (logger && logger.special) {
        logger.special(false);
      }
    });

    test('msg.content', () => {
      expect(Array.isArray(msg.content)).toBeTruthy();
      expect($lodash.get(msg, 'content[0]')).toBe(false);
    });

    test('msg.flag', () => {
      expect(msg.flag).toBe('');
    });
  });

  describe('logger.destroy', () => {
    let isErr = false;
    beforeAll(() => {
      logger.log('before destroyed');
      logger.destroy();
      try {
        logger.log('after destroyed');
      } catch (err) {
        isErr = err;
      }
    });
    test('msg destroy', () => {
      expect($lodash.get(msg, 'content[0]')).toBe('before destroyed');
      expect(isErr).toBeTruthy();
    });
  });
}
