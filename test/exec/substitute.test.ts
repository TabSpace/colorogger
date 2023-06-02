import { substitute } from '../../src/mods/str';

describe('substitute', () => {
  test('substitute base', () => {
    const str = substitute('a {{b}}', {
      b: 1,
    });
    expect(str).toBe('a 1');
  });

  test('substitute more', () => {
    const str = substitute('a \\{{b}}', {
      b: 1,
    });
    expect(str).toBe('a {{b}}');
  });
});
