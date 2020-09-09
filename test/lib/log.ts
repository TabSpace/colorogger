import $assert from 'power-assert';

export default function logTest($logger, mode) {
  let msg = null;
  const logger = new $logger({
    transport: (message) => {
      msg = message;
      console.log(msg);
    },
  });

  logger.method('special', {
    level: 'special',
    color: '#ff9901',
  });

  describe('logger.log', () => {
    beforeAll(() => {
      logger.log('log content');
    });

    test('msg.content', () => {
      $assert(Array.isArray(msg.content));
      $assert.equal(msg.content[0], 'log content');
    });

    test('msg.time', () => {
      $assert.equal(typeof msg.time, 'number');
    });

    test('msg.level', () => {
      $assert.equal(msg.level, 'log');
    });

    test('msg.grade', () => {
      $assert.equal(msg.grade, 1);
    });

    test('msg.flag', () => {
      $assert.equal(msg.flag, '');
    });
  });

  describe('logger.info', () => {
    beforeAll(() => {
      logger.info('info', true, { a: 1 }, { b: 2 });
    });

    test('msg.content', () => {
      $assert(Array.isArray(msg.content));
      $assert.equal(msg.content[0], 'info');
      $assert.equal(typeof msg.content[2], 'object');
      $assert.equal(msg.content[2].a, 1);
      if (mode === 'client') {
        $assert.equal(typeof msg.__content[msg.__content.length - 1], 'object');
        $assert.equal(typeof msg.__content[msg.__content.length - 2], 'object');
      }
    });

    test('msg.level', () => {
      $assert.equal(msg.level, 'info');
    });

    test('msg.grade', () => {
      $assert.equal(msg.grade, 2);
    });
  });

  describe('logger.success', () => {
    beforeAll(() => {
      logger.success(true);
    });

    test('msg.content', () => {
      $assert(Array.isArray(msg.content));
      $assert.equal(msg.content[0], true);
    });

    test('msg.level', () => {
      $assert.equal(msg.level, 'log');
    });

    test('msg.grade', () => {
      $assert.equal(msg.grade, 1);
    });

    test('msg.flag', () => {
      $assert.equal(msg.flag, 'success');
    });
  });

  describe('logger.special', () => {
    beforeAll(() => {
      logger.special(false);
    });

    test('msg.content', () => {
      $assert(Array.isArray(msg.content));
      $assert.equal(msg.content[0], false);
    });

    test('msg.flag', () => {
      $assert.equal(msg.flag, '');
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
      $assert.equal(msg.content[0], 'before destroyed');
      $assert(isErr);
    });
  });
}
