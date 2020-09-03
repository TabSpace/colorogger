import $assert from 'power-assert';
import $logger from '../src/server';

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
    $assert.equal(msg.__content[1], '[i]');
  });
  test('info color', () => {
    $assert.equal(msg.__content[2], '\u001b[33minfo\u001b[39m');
  });
});

describe('debug theme', () => {
  beforeAll(() => {
    logger.debug('debug');
  });

  test('debug msg.content', () => {
    $assert.equal(msg.content[0], 'debug');
  });
  test('debug icon', () => {
    $assert.equal(msg.__content[1], '\u001b[38;2;255;149;1m[d]\u001b[39m');
  });
  test('debug color', () => {
    $assert.equal(msg.__content[2], '\u001b[38;2;255;149;1mdebug\u001b[39m');
  });
});
