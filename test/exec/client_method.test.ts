import $assert from 'power-assert';
import $logger from '../../src/client';
import { Message } from '../../src/types';

let msg: Message = null;

const logger = new $logger({
  transport: (message) => {
    msg = message;
  },
});

logger.method('temp');
logger.method('custom', {
  flag: 'custom',
});

logger.theme({
  colors: {
    custom: '#ff9501',
  },
  icons: {
    custom: {
      icon: 'c',
      color: '#ff9501',
    },
  },
});

describe('temp method', () => {
  beforeAll(() => {
    if (typeof logger.temp === 'function') {
      logger.temp('t1');
    }
  });

  test('temp msg.content', () => {
    $assert.equal(msg.content[0], 't1');
  });
  test('temp icon', () => {
    $assert.equal(msg.__content[2], 'color: ;');
  });
  test('temp color', () => {
    $assert.equal(msg.__content[3], 'color: ;');
  });
});

describe('custom method', () => {
  beforeAll(() => {
    if (typeof logger.custom === 'function') {
      logger.custom('c1');
    }
  });

  test('custom msg.content', () => {
    $assert.equal(msg.content[0], 'c1');
  });
  test('custom icon', () => {
    $assert.equal(msg.__content[2], 'color: #ff9501;');
  });
  test('custom color', () => {
    $assert.equal(msg.__content[3], 'color: #ff9501;');
  });
});
