import $assert from 'power-assert';
import $lodash from 'lodash';
import { Factory } from './types';
import { Message } from '../../src/types';

export default function metaTest(Logger: Factory, mode: string) {
  let msg: Message = null;

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
      $assert.equal(msg.content[0], 'fork1');
    });
    test('msg.url', () => {
      $assert.equal(msg.url, '/url');
    });
    test('msg.guid', () => {
      $assert.equal(msg.guid, 'f1_guid');
    });
  });

  describe('fork2 meta', () => {
    beforeAll(() => {
      fork2.log('fork2');
    });

    test('msg.content', () => {
      $assert.equal(msg.content[0], 'fork2');
    });
    test('msg.url', () => {
      $assert.equal(msg.url, '/url');
    });
    test('msg.guid', () => {
      $assert.equal(msg.guid, 'f2_guid');
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
      $assert.equal(msg.content[0], 'fork3');
    });
    test('msg.url', () => {
      $assert.equal(msg.url, '/url');
    });
    test('msg.guid', () => {
      $assert.equal(msg.guid, 'f2_guid');
    });
    test('msg.tag', () => {
      $assert.equal(msg.tag, 'tag3');
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
      $assert.equal(msg.content[0], 'fork4');
    });
    test('msg.url', () => {
      $assert.equal(msg.url, '/url');
    });
    test('msg.guid', () => {
      $assert.equal(msg.guid, 'f2_guid');
    });
    test('msg.tag', () => {
      $assert.equal(msg.tagn, 'tagn-value');
      $assert.equal(msg.tagw, 'tagw-value');
      $assert.equal(msg.tagv, 'tagv-value');
    });
    if (mode === 'server') {
      test('msg.tag wrap', () => {
        $assert(String(msg.__content[4]).indexOf('[tagn-value]') >= 0);
        $assert(String(msg.__content[5]).indexOf('(tagw-value)') >= 0);
        $assert(msg.__content.join(' ').indexOf('[tagv-value]') < 0);
      });
    } else {
      test('msg.tag wrap', () => {
        $assert(String(msg.__content[0]).indexOf('(tagw-value)') > 0);
        $assert(String(msg.__content[0]).indexOf('tagv-value') < 0);
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
      $assert.equal(msg.content[0], 'fork5');
    });
    test('msg.url', () => {
      $assert.equal(msg.url, '/url');
    });
    test('msg.guid', () => {
      $assert.equal(msg.guid, 'f1_guid');
    });
    if (mode === 'server') {
      test('msg.tag5 color', () => {
        $assert($lodash.get(msg, '__content[4]') === '\u001b[34m[tag5]\u001b[39m');
      });
    } else {
      test('msg.tag5 color', () => {
        $assert($lodash.get(msg, '__content[5]') === 'color: blue;');
      });
    }
  });
}
