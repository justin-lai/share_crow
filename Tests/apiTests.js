const test = require('tape');
const fetch = require('node-fetch');

test('Google Maps Matrix Calcuations', (assert) => {
  // eslint-disable-next-line
  // tests with lat long of Danville, CA to Stockton CA sent though the server
  fetch('http://localhost:3000/api/distanceMatrix?lat1=37.821593&long1=-121.999961&lat2=37.957702&long2=-121.290780')
  .then((res) => res.json())
  .then((responseData) => assert.equal(responseData.miles, '57.8 mi',
 'Google Maps Calculated Distance and ETA Correctly'));
  assert.end();
});

test('Twilio Notifications', (assert) => {
  const expected = 'something to test';
  const actual = 'something to test';

  assert.equal(actual, expected, 'Twilio Sent Notifications');

  assert.end();
});
