import $assert from 'power-assert';
import { substitute } from '../../src/mods/str';

describe('substitute', () => {
  test('substitute base', () => {
    const str = substitute('a {{b}}', {
      b: 1,
    });
    $assert.equal(str, 'a 1');
  });

  test('substitute more', () => {
    const str = substitute('a \\{{b}}', {
      b: 1,
    });
    $assert.equal(str, 'a {{b}}');
  });
});
