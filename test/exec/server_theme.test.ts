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
    $assert.equal($get(msg, 'content[0]'), 'info');
  });
  test('info icon', () => {
    $assert.equal($get(msg, '__content[1]'), '[i]');
  });
  if (!ci) {
    test('info color', () => {
      $assert.equal($get(msg, '__content[2]'), '\u001b[33minfo\u001b[39m');
    });
  }
});

describe('debug theme', () => {
  beforeAll(() => {
    logger.debug('debug');
  });

  test('debug msg.content', () => {
    $assert.equal($get(msg, 'content[0]'), 'debug');
  });
  if (!ci) {
    test('debug icon', () => {
      $assert.equal($get(msg, '__content[1]'), '\u001b[38;2;255;149;1m[d]\u001b[39m');
    });
    test('debug color', () => {
      $assert.equal($get(msg, '__content[2]'), '\u001b[38;2;255;149;1mdebug\u001b[39m');
    });
  }
});
