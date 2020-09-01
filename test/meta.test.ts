import $assert from 'power-assert';
import $logger from '../src/server';

let msg = null;

const logger = new $logger({
  meta: {
    url: '/url',
  },
  transport: (message) => {
    msg = message;
  },
});

const fork1 = logger.fork({
  meta: {
    guid: 'f1_guid',
  },
});

const fork2 = logger.fork({
  meta: {
    guid: 'f2_guid',
  },
});

console.log('fork1', fork1);
console.log('fork2', fork2);

fork1.log('fork1 1');
fork2.log('fork2 2');
fork1.log('fork1 3');

describe('temp', () => {
  test('temp', () => {
    $assert.equal(1, 1);
  });
});

// describe('fork1 meta', () => {
//   beforeAll(() => {
//     console.log('run fork 1')
//     fork1.log('fork1')
//   });

//   test('msg.content', () => {
//     $assert.equal(msg.content[0], 'fork1');
//     $assert.equal(msg.__content[2], '[f1_guid]');
//   });
//   test('msg.url', () => {
//     $assert.equal(msg.url, '/url');
//   });
//   test('msg.guid', () => {
//     $assert.equal(msg.guid, 'f1_guid');
//   });
// });

// describe('fork2 meta', () => {
//   beforeAll(() => {
//     fork2.log('fork2')
//   });

//   test('msg.content', () => {
//     $assert.equal(msg.content[0], 'fork2');
//     $assert.equal(msg.__content[3], '[/f2_url]');
//   });
//   test('msg.url', () => {
//     $assert.equal(msg.url, '/f2_url');
//   });
//   test('msg.guid', () => {
//     $assert.equal(msg.guid, 'f2_guid');
//   });
// });
