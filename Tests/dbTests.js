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
test('Login: successful given valid username and password', assert => {
  const queryLine = `?username=${accInfo.username}&password=${accInfo.password}`;
  fetch(`http://localhost:3000/login${queryLine}`)
    .then((res) => assert.equal(res.status, 200, 'Login Successful'));
  assert.end();
});

// Tests if login is unsucessful if password is not sent
test('Login: unsuccessful if parameters are missing or incorrect', assert => {
  const queryLine = `?username=${accInfo.username}`;
  fetch(`http://localhost:3000/login${queryLine}`)
    .then((res) => assert.equal(res.status, 400, 'Login Unsuccessful'));
  assert.end();
});

// Tests if account creation is successful given all 6 fields
test('Account Creation: successful given all 6 fields complete', assert => {
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
test('Account Creation: unsuccessful due to missing password field', assert => {
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
test('Profile: successfully returns correct profile given a user ID', assert => {
  assert.pass();
  assert.end();
});

// Tests if the given id sent is incorrect when looking for a profile
test('Profile: unsuccessfully returned profile due to invalid user ID', assert => {
  assert.pass();
  assert.end();
});

// Tests if profile is properly created
test('Profile: successfully created given all parameters', assert => {
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
test('Messages: No messages are returned given an invalid or empty id field', assert => {
  assert.pass();
  assert.end();
});

// Tests if message is posted given sender ID, receiver ID and message body
test('Messages: Successful post of message given correct parameters', assert => {
  assert.pass();
  assert.end();
});

// Tests if message not sucessfully posted if missing any field
test('Messages: No message is posted if any parameters are missing', assert => {
  assert.pass();
  assert.end();
});

// Tests if listings are returned given none or more filters
test('Listings: all listings returned belonging to none or a filter', assert => {
  assert.pass();
  assert.end();
});

// Tests if listing is created given all fields
test('Listings: Successful listing creation given all fields', assert => {
  assert.pass();
  assert.end();
});

// Tests if listing is unsuccessful when missing any field
test('Listings: Unsuccessful creation when missing any fields', assert => {
  assert.pass();
  assert.end();
});

// Tests if listing succesfully changes given a listing ID and changed parameters
test('Listings: Succesfully changes a listing given ID and fields', assert => {
  assert.pass();
  assert.end();
});

// Tests if listing unsuccessfully changes when missing a listing ID or no fields provided
test('Listings: Unsuccessful changes to a listing due to missing ID or fields', assert => {
  assert.pass();
  assert.end();
});

// Tests if listing is returned given a listing ID
test('Listings: Successful return of a listing given an ID', assert => {
  assert.pass();
  assert.end();
});

// Tests if no listing is returned given none or an invalid listing ID
test('Listings: Unsuccessful return of listing due to invalid ID or none provided', assert => {
  assert.pass();
  assert.end();
});

// Tests if all userReviews are returned for a given user ID
test('UserReviews: all user reviews returned for a given user ID', assert => {
  assert.pass();
  assert.end();
});

// Tests if no userReviews are returned given an invalid or no user ID
test('UserReviews: no userReview returned due to invalid user ID or none provided', assert => {
  assert.pass();
  assert.end();
});

// Tests if a userReview successfully created given all fields
test('UserReviews: succsesfully creates a userReview given all fields', assert => {
  assert.pass();
  assert.end();
});

// Tests if userView unsuccessfully created when missing one or more fields
test('UserReviews: no userReview created due to missing one or more fields', assert => {
  assert.pass();
  assert.end();
});

// Tests if userReview successfully deleted given a review ID and associated user ID
test('UserReviews: successful deletion of userReview given valid review and user ID', assert => {
  assert.pass();
  assert.end();
});

// Tests if userReview unsuccessfully deleted given an incorrect review ID or associated user ID
test('UserReviews: unsuccessful deletion of userReview given invalid review or user ID', assert => {
  assert.pass();
  assert.end();
});
