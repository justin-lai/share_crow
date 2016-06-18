const test = require('tape');
const fetch = require('node-fetch');

const accInfo = {
  username: 'toma',
  password: 'password',
  email: 'cathy@cat.hy',
  phoneNumber: '1234567890',
  address: '123 Corgi Lane',
  aboutMe: 'When I am not lazy, I like to play board games with my friends.',
};

// Tests if login is successful given correct username, password
test('Login Successful', assert => {
  const queryLine = `?username=${accInfo.username}&password=${accInfo.password}`;
  fetch(`http://localhost:3000/login${queryLine}`)
    .then((res) => assert.equal(res.status, 200, 'Login Successful'));
  assert.end();
});

// Tests if login is unsucessful if password is not sent
test('Login Unsuccessful if Parameters are Missing', assert => {
  const queryLine = `?username=${accInfo.username}`;
  fetch(`http://localhost:3000/login${queryLine}`)
    .then((res) => assert.equal(res.status, 400, 'Login Unsuccessful'));
  assert.end();
});

// Tests if account creation is successful given all 6 fields
test('Account Creation Successful', assert => {
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
test('Account Creation Missing Info', assert => {
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

test('Profile Tests', assert => {
  assert.end();
});
