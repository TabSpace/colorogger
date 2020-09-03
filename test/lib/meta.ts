import $assert from 'power-assert';

export default function metaTest($logger) {
  let msg = null;

  const logger = new $logger({
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
}
