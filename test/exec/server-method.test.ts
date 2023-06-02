import $get from 'lodash/get';
import $chalk from 'chalk';
import $logger from '../../src/server';
import { Message } from '../../src/types';
import {
  COLOR_LOG,
} from '../../src/mods/constants';

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
    expect($get(msg, 'content[0]')).toBe('t1');
  });
  test('temp icon', () => {
    expect($get(msg, '__content[1]')).toBe($chalk.hex(COLOR_LOG)('[.]'));
  });
  test('temp color', () => {
    expect($get(msg, '__content[2]')).toBe('t1');
  });
});

describe('custom method', () => {
  beforeAll(() => {
    if (typeof logger.custom === 'function') {
      logger.custom('c1');
    }
  });

  test('custom msg.content', () => {
    expect($get(msg, 'content[0]')).toBe('c1');
  });
  if (!ci) {
    test('custom icon', () => {
      expect($get(msg, '__content[1]')).toBe('\u001b[38;2;255;149;1m[c]\u001b[39m');
    });
    test('custom color', () => {
      expect($get(msg, '__content[2]')).toBe('\u001b[38;2;255;149;1mc1\u001b[39m');
    });
  }
});
