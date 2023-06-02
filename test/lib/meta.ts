import $lodash from 'lodash';
import $chalk from 'chalk';
import { Factory } from './types';
import { Message } from '../../src/types';

export default function metaTest(Logger: Factory, mode: string) {
  let msg: Message | null = null;

  const logger = new Logger({
    meta: {
      url: '/url',
    },
    transport: (message) => {
      msg = message;
    },
  });

  const fork1 = logger.fork({
    meta: {
      guid: 'f1_guid',
    },
  });

  const fork2 = logger.fork({
    meta: {
      guid: 'f2_guid',
    },
  });

  describe('fork1 meta', () => {
    beforeAll(() => {
      fork1.log('fork1');
    });

    test('msg.content', () => {
      expect($lodash.get(msg, 'content[0]')).toBe('fork1');
    });
    test('msg.url', () => {
      expect(msg?.url).toBe('/url');
    });
    test('msg.guid', () => {
      expect(msg?.guid).toBe('f1_guid');
    });
  });

  describe('fork2 meta', () => {
    beforeAll(() => {
      fork2.log('fork2');
    });

    test('msg.content', () => {
      expect($lodash.get(msg, 'content[0]')).toBe('fork2');
    });
    test('msg.url', () => {
      expect(msg?.url).toBe('/url');
    });
    test('msg.guid', () => {
      expect(msg?.guid).toBe('f2_guid');
    });
  });

  describe('fork3 meta', () => {
    beforeAll(() => {
      const fork3 = fork2.fork({
        meta: {
          tag: 'tag3',
        },
      });
      fork3.log('fork3');
    });

    test('msg.content', () => {
      expect($lodash.get(msg, 'content[0]')).toBe('fork3');
    });
    test('msg.url', () => {
      expect(msg?.url).toBe('/url');
    });
    test('msg.guid', () => {
      expect(msg?.guid).toBe('f2_guid');
    });
    test('msg.tag', () => {
      expect(msg?.tag).toBe('tag3');
    });
  });

  describe('fork4 meta', () => {
    beforeAll(() => {
      const fork4 = fork2.fork({
        wrapTag: (tag, key) => {
          if (key === 'tagw') {
            return `(${tag})`;
          } else if (key === 'tagv') {
            return '';
          } else {
            return `[${tag}]`;
          }
        },
        meta: {
          tagn: 'tagn-value',
          tagw: 'tagw-value',
          tagv: 'tagv-value',
        },
      });
      fork4.log('fork4');
    });

    test('msg.content', () => {
      expect($lodash.get(msg, 'content[0]')).toBe('fork4');
    });
    test('msg.url', () => {
      expect(msg?.url).toBe('/url');
    });
    test('msg.guid', () => {
      expect(msg?.guid).toBe('f2_guid');
    });
    test('msg.tag', () => {
      expect(msg?.tagn).toBe('tagn-value');
      expect(msg?.tagw).toBe('tagw-value');
      expect(msg?.tagv).toBe('tagv-value');
    });
    if (mode === 'server') {
      test('msg.tag wrap', () => {
        const cnt4 = String($lodash.get(msg, '__content[4]'));
        expect(cnt4).toContain('[tagn-value]');
        const cnt5 = String($lodash.get(msg, '__content[5]'));
        expect(cnt5).toContain('(tagw-value)');
        const cnt = $lodash.get(msg, '__content', []).join(' ');
        expect(cnt).not.toContain('[tagv-value]');
      });
    } else {
      test('msg.tag wrap', () => {
        const cnt = String($lodash.get(msg, '__content[0]'));
        expect(cnt).toContain('(tagw-value)');
        expect(cnt).not.toContain('tagv-value');
      });
    }
  });

  describe('fork5 meta', () => {
    beforeAll(() => {
      const fork5 = fork1.fork({
        meta: {
          tag: 'tag5',
        },
        metaColor: {
          tag: 'blue',
        },
      });
      fork5.log('fork5');
    });

    test('msg.content', () => {
      expect($lodash.get(msg, 'content[0]')).toBe('fork5');
    });
    test('msg.url', () => {
      expect(msg?.url).toBe('/url');
    });
    test('msg.guid', () => {
      expect(msg?.guid).toBe('f1_guid');
    });
    if (mode === 'server') {
      test('msg.tag5 color', () => {
        const cnt4 = $lodash.get(msg, '__content[4]');
        expect(cnt4).toBe($chalk.blue('[tag5]'));
      });
    } else {
      test('msg.tag5 color', () => {
        const cnt5 = $lodash.get(msg, '__content[5]');
        expect(cnt5).toBe('color: blue;');
      });
    }
  });
}
