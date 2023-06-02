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
    expect($get(msg, 'content[0]')).toBe('info');
  });
  test('info icon', () => {
    expect($get(msg, '__content[1]')).toBe('[i]');
  });
  if (!ci) {
    test('info color', () => {
      expect($get(msg, '__content[2]')).toBe('\u001b[33minfo\u001b[39m');
    });
  }
});

describe('debug theme', () => {
  beforeAll(() => {
    logger.debug('debug');
  });

  test('debug msg.content', () => {
    expect($get(msg, 'content[0]')).toBe('debug');
  });
  if (!ci) {
    test('debug icon', () => {
      expect($get(msg, '__content[1]')).toBe('\u001b[38;2;255;149;1m[d]\u001b[39m');
    });
    test('debug color', () => {
      expect($get(msg, '__content[2]')).toBe('\u001b[38;2;255;149;1mdebug\u001b[39m');
    });
  }
});
