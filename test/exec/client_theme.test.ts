import $assert from 'power-assert';
import $logger from '../../src/client';

let msg = null;

const logger = new $logger({
  transport: (message) => {
    msg = message;
  },
});

logger.theme({
  colors: {
    info: 'yellow',
    debug: '#ff9501',
  },
  icons: {
    info: {
      icon: 'i',
      color: '',
    },
    debug: {
      icon: 'd',
      color: '#ff9501',
    },
  },
});

describe('info theme', () => {
  beforeAll(() => {
    logger.info('info');
  });

  test('info msg.content', () => {
    $assert.equal(msg.content[0], 'info');
  });
  test('info icon', () => {
    $assert(msg.__content[0].indexOf('%c [i]') > 0);
    $assert.equal(msg.__content[2], 'color: ;');
  });
  test('info color', () => {
    $assert.equal(msg.__content[3], 'color: yellow;');
  });
});

describe('debug theme', () => {
  beforeAll(() => {
    logger.debug('debug', { a: 1 });
  });

  test('debug msg.content', () => {
    $assert.equal(msg.content[0], 'debug');
  });
  test('debug icon', () => {
    $assert(msg.__content[0].indexOf('%c [d]') > 0);
    $assert.equal(msg.__content[2], 'color: #ff9501;');
  });
  test('debug color', () => {
    $assert.equal(msg.__content[3], 'color: #ff9501;');
  });
  test('debug extra', () => {
    $assert.equal(msg.__content[4].a, 1);
  });
});
