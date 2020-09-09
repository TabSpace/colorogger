import $assert from 'power-assert';

export default function metaTest($logger, mode) {
  let msg = null;

  const logger = new $logger({
    meta: {
      url: '/url',
    },
    transport: (message) => {
      msg = message;
      console.log(msg);
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

  const fork3 = fork2.fork({
    meta: {
      tag: 'tag3',
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
        $assert.equal(msg.__content[2], '(tagw-value)');
        $assert.equal(msg.__content[3], '[tagn-value]');
        $assert(msg.__content.indexOf('[tagv-value]') < 0);
      });
    } else {
      test('msg.tag wrap', () => {
        $assert(msg.__content[0].indexOf('(tagw-value)') > 0);
        $assert(msg.__content[0].indexOf('tagv-value') < 0);
      });
    }
  });
}
