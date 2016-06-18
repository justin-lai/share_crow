import test from 'tape';
import fetch from 'node-fetch';

// test('Login Tests', (assert) => {
//   fetch('http://localhost:3000/q')
//   .then((res) => {
//   	assert.equal(res.status, 300, 'Login Successful');
//   });
//   ass
//   assert.end();
// });

test('Account Creation', (assert) => {
  const expected = 'something to test';
  const actual = 'something to test';

  assert.equal(actual, expected, 'Account Creation Successful');
  assert.end();
});
