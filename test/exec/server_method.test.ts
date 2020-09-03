import $assert from 'power-assert';
import $logger from '../../src/server';

interface CustomLogger extends $logger {
  temp?: Function;
  custom?: Function;
}

let msg = null;

const logger: CustomLogger = new $logger({
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
    logger.temp('t1');
  });

  test('temp msg.content', () => {
    $assert.equal(msg.content[0], 't1');
  });
  test('temp icon', () => {
    $assert.equal(msg.__content[1], '[.]');
  });
  test('temp color', () => {
    $assert.equal(msg.__content[2], 't1');
  });
});

describe('custom method', () => {
  beforeAll(() => {
    logger.custom('c1');
  });

  test('custom msg.content', () => {
    $assert.equal(msg.content[0], 'c1');
  });
  test('custom icon', () => {
    $assert.equal(msg.__content[1], '\u001b[38;2;255;149;1m[c]\u001b[39m');
  });
  test('custom color', () => {
    $assert.equal(msg.__content[2], '\u001b[38;2;255;149;1mc1\u001b[39m');
  });
});
