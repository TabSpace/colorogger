import $assert from 'power-assert';
import $get from 'lodash/get';
import $logger from '../../src/server';
import { Message } from '../../src/types';

const ci = process.env.CI;

let msg: Message;

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
    $assert.equal($get(msg, 'content[0]'), 't1');
  });
  test('temp icon', () => {
    $assert.equal($get(msg, '__content[1]'), '[.]');
  });
  test('temp color', () => {
    $assert.equal($get(msg, '__content[2]'), 't1');
  });
});

describe('custom method', () => {
  beforeAll(() => {
    if (typeof logger.custom === 'function') {
      logger.custom('c1');
    }
  });

  test('custom msg.content', () => {
    $assert.equal($get(msg, 'content[0]'), 'c1');
  });
  if (!ci) {
    test('custom icon', () => {
      $assert.equal($get(msg, '__content[1]'), '\u001b[38;2;255;149;1m[c]\u001b[39m');
    });
    test('custom color', () => {
      $assert.equal($get(msg, '__content[2]'), '\u001b[38;2;255;149;1mc1\u001b[39m');
    });
  }
});
