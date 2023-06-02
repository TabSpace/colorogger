import $get from 'lodash/get';
import $logger from '../../src/client';
import { Message } from '../../src/types';

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
    expect(msg?.content?.[0]).toBe('info');
  });
  test('info icon', () => {
    expect(String($get(msg, '__content[0]')).indexOf('%c [i]')).toBeGreaterThan(0);
    expect($get(msg, '__content[2]')).toBe('color: ;');
  });
  test('info color', () => {
    expect($get(msg, '__content[3]')).toBe('color: yellow;');
  });
});

describe('debug theme', () => {
  beforeAll(() => {
    logger.debug('debug', { a: 1 });
  });

  test('debug msg.content', () => {
    expect(msg?.content?.[0]).toBe('debug');
  });
  test('debug icon', () => {
    expect(String($get(msg, '__content[0]')).indexOf('%c [d]')).toBeGreaterThan(0);
    expect($get(msg, '__content[2]')).toBe('color: #ff9501;');
  });
  test('debug color', () => {
    expect($get(msg, '__content[3]')).toBe('color: #ff9501;');
  });
  test('debug extra', () => {
    expect($get(msg, '__content[4].a')).toBe(1);
  });
});
