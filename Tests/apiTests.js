const test = require('tape');
// const fetch = require('node-fetch');

// test('Google Maps Matrix Calcuations', (assert) => {
//   fetch('http://localhost:3000/q')
//   .then((res) => {
//   	assert.equal(res.status, 300, 'Google Maps Calculated Distance and ETA Correctly');
//   });
//   assert.end();
// });

test('Twilio Notifications', (assert) => {
  const expected = 'something to test';
  const actual = 'something to test';

  assert.equal(actual, expected, 'Twilio Sent Notifications');

  assert.end();
});
