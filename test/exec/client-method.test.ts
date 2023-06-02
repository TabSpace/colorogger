import $get from 'lodash/get';
import $logger from '../../src/client';
import { Message } from '../../src/types';
import {
  COLOR_LOG,
} from '../../src/mods/constants';

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
    expect($get(msg, '__content[2]')).toBe(`color: ${COLOR_LOG};`);
  });
  test('temp color', () => {
    expect($get(msg, '__content[3]')).toBe(`color: ;`);
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
  test('custom icon', () => {
    expect($get(msg, '__content[2]')).toBe('color: #ff9501;');
  });
  test('custom color', () => {
    expect($get(msg, '__content[3]')).toBe('color: #ff9501;');
  });
});
