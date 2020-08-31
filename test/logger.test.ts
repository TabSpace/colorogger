import $assert from 'power-assert';

it('hello', () => {
  const a = {};
  $assert(a === { greeting: 'Hello' });
});
