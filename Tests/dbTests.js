const test = require('tape');
const fetch = require('node-fetch');

const accInfo = {
  username: 'tom',
  password: 'password',
  email: 'cathy@cat.hy',
  phoneNumber: '1234567890',
  address: '123 Corgi Lane',
  aboutMe: 'When I am not lazy, I like to play board games with my friends.',
};

// Tests if login is successful given correct username, password
test('Login: Successful', assert => {
  const queryLine = `?username=${accInfo.username}&password=${accInfo.password}`;
  fetch(`http://localhost:3000/login${queryLine}`)
    .then((res) => assert.equal(res.status, 200, 'Login Successful'));
  assert.end();
});

// Tests if login is unsucessful if password is not sent
test('Login: Unsuccessful if parameters are missing', assert => {
  const queryLine = `?username=${accInfo.username}`;
  fetch(`http://localhost:3000/login${queryLine}`)
    .then((res) => assert.equal(res.status, 400, 'Login Unsuccessful'));
  assert.end();
});

// Tests if account creation is successful given all 6 fields
test('Account Creation: Successful', assert => {
  fetch('http://localhost:3000/signup',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accInfo),
    }).then((res) => assert.equal(res.status, 201, 'Account Creation Successful'));
  assert.end();
});

// Tests if account will fail creation missing password
test('Account Creation: Missing info', assert => {
  const missingAccInfo = {
    username: accInfo.username,
    email: accInfo.email,
    phoneNumber: accInfo.phoneNumber,
    address: accInfo.address,
    aboutMe: accInfo.aboutMe,
  };
  fetch('http://localhost:3000/signup',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(missingAccInfo),
    }).then((res) => assert.equal(res.status, 400, 'Account Creation Successful'));
  assert.end();
});

// Tests if the correct profile is returned given a given id
test('Profile: Correct given ID', assert => {
  assert.pass();
  assert.end();
});

// Tests if the given id sent is incorrect when looking for a profile
test('Profile: Not returned given incorrect ID', assert => {
  assert.pass();
  assert.end();
});

// Tests if profile is properly created
test('Profile: Successfully created given all parameters', assert => {
  assert.pass();
  assert.end();
});

// Tests if profile is not created when not all parameters are given
test('Profile: Not created when missing parameters', assert => {
  assert.pass();
  assert.end();
});

// Tests if profile is updated given an id and a field
test('Profile: Update successful given ID and field(s)', assert => {
  assert.pass();
  assert.end();
});

// Tests if profile is not updated if missing the id field
test('Profile: Update unsuccessful if ID not sent', assert => {
  assert.pass();
  assert.end();
});

// Tests if profile is not updated if id field is included, but missing data fields to change
test('Profile: Update unsuccessful if ID sent but missing data fields to change', assert => {
  assert.pass();
  assert.end();
});

// Tests if all messages are returned belonging to an id
test('Messages: Successfully returns all messages belonging to an id', assert => {
  assert.pass();
  assert.end();
});

// Tests if messages are not returned given an invalid or no id
test('Messages: ', assert => {
  assert.pass();
  assert.end();
});
