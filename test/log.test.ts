import $assert from 'power-assert';
import $logger from '../src/server';

let msg = null;
const logger = new $logger({
  transport: (message) => {
    msg = message;
  },
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
    logger.info('info', { a: 1 });
  });

  test('msg.content', () => {
    $assert(Array.isArray(msg.content));
    $assert.equal(msg.content[0], 'info');
    $assert.equal(typeof msg.content[1], 'object');
    $assert.equal(msg.content[1].a, 1);
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
    logger.success('suc msg');
  });

  test('msg.content', () => {
    $assert(Array.isArray(msg.content));
    $assert.equal(msg.content[0], 'suc msg');
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
