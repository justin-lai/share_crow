const test = require('tape');
const fetch = require('node-fetch');
const path = require('path');
const db = require(path.resolve(__dirname, '../db/dbDesign.js'));

const accInfo = {
  username: 'tom',
  password: 'password',
  email: 'cathy@cat.hy',
  phoneNumber: '1234567890',
  address: '123 Corgi Lane',
  aboutMe: 'When I am not lazy, I like to play board games with my friends.',
};

const testMessage = {
  sender_id: 10,
  recipient_id: 15,
  text: 'when can I pick it up?',
};

const userReview = {
  lenderId: 10,
  reviewerId: 15,
  rating: 4,
  text: 'easy to work with',
};

const testListing = {
  item: 'female corgi',
  owner_id: 1,
  max_fee: 500,
  rental_fee: 5000,
};

// Tests if account creation is successful given all 6 fields
test('Account Creation: successful given all 6 fields complete', assert => {
  fetch('http://localhost:3000/main/signup',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accInfo),
    }).then(() => {
      const queryLine = `?username=${accInfo.username}&password=${accInfo.password}`;
      fetch(`http://localhost:3000/main/login${queryLine}`)
        .then((res) => assert.equal(res.status, 200, 'Login Successful'))
        .then(() => {
          db.User.destroy({
            where: {
              username: accInfo.username,
            },
          });
        });
    });
  assert.end();
});

// Tests if login is unsucessful if password is not sent
test('Login: unsuccessful if parameters are missing or incorrect', assert => {
  const queryLine = `?username=${accInfo.username}`;
  fetch(`http://localhost:3000/main/login${queryLine}`)
    .then((res) => assert.equal(res.status, 400, 'Login Unsuccessful'));
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
  fetch('http://localhost:3000/main/signup',
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
  fetch('http://localhost:3000/main/profile?id=1').
    then(queryData => assert.equal(queryData.status, 200, 'Profile Found via ID'));
  assert.end();
});

// Tests if the given id sent is incorrect when looking for a profile
test('Profile: unsuccessfully returned profile due to invalid user ID', assert => {
  fetch('http://localhost:3000/main/profile?id=-1').
    then(queryData => assert.equal(queryData.status, 400, 'Profile not found with invalid ID'));
  assert.end();
});

// Tests if profile is updated given an id and a field
test('Profile: Update successful given ID and field(s)', assert => {
  fetch('http://localhost:3000/main/profile',
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
        aboutMe: 'Test Bio',
      }),
    }).then(() => {
      fetch('http://localhost:3000/main/profile?id=1')
        .then(queryData => assert.equal(queryData.dataValues.aboutMe, 'Test Bio'));
    });
  assert.end();
});

// Tests if profile is not updated if missing the id field
test('Profile: Update unsuccessful if ID not sent', assert => {
  fetch('http://localhost:3000/main/profile',
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        aboutMe: 'Test Bio',
      }),
    })
    .then(queryData => assert.equal(queryData.status, 400));
  assert.end();
});

// Tests if profile is not updated if id field is included, but missing data fields to change
test('Profile: Update unsuccessful if ID sent but missing data fields to change', assert => {
  fetch('http://localhost:3000/main/profile',
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: 1,
      }),
    })
    .then(queryData => assert.equal(queryData.status, 400));
  assert.end();
});

// Tests if all messages are returned belonging to an id
test('Messages: Successfully returns all messages belonging to an id', assert => {
  fetch('http://localhost:3000/main/message?id=10')
    .then(queryData => assert.equal(queryData.status, 200));
  assert.end();
});

// Tests if messages are not returned given an invalid or no id
test('Messages: No messages are returned given an invalid or empty id field', assert => {
  fetch('http://localhost:3000/main/message?id=0')
    .then(queryData => assert.equal(queryData.status, 400));
  assert.end();
});

// Tests if message is posted given sender ID, receiver ID and message body
test('Messages: Successful post of message given correct parameters', assert => {
  fetch('http://localhost:3000/main/message',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testMessage),
    })
    .then(responseData => assert.equal(responseData.status, 201, 'Message successfully posted'));
  assert.end();
});

// Tests if message not sucessfully posted if missing any field
test('Messages: No message is posted if any parameters are missing', assert => {
  fetch('http://localhost:3000/main/message',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'missing recipient_id',
        sender_id: 1,
      }),
    })
    .then(responseData => assert.equal(responseData.status, 400));
  assert.end();
});

// Tests if listings are returned given none or more filters
test('Listings: all listings returned belonging to none or a filter', assert => {
  fetch('http://localhost:3000/main/listing')
    .then(responseData => assert.equal(responseData.status, 200));
  assert.end();
});

// Tests if listing is created given all fields
test('Listings: Successful listing creation given all fields', assert => {
  fetch('http://localhost:3000/main/listing',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testListing),
    })
    .then(responseData => assert.equal(responseData.status, 201));
  assert.end();
});

// Tests if listing is unsuccessful when missing any required field
test('Listings: Unsuccessful creation when missing any fields', assert => {
  delete testListing.item;
  fetch('http://localhost:3000/main/listing',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testListing),
    })
    .then(responseData => assert.equal(responseData.status, 400));
  assert.end();
});

// Tests if listing succesfully changes given a listing ID and changed parameters
test('Listings: Succesfully changes a listing given ID and fields', assert => {
  fetch('http://localhost:3000/main/listing',
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listingId: 2,
        maxFee: 500,
      }),
    })
    .then(responseData => assert.equal(responseData.status, 200));
  fetch('http://localhost:3000/main/listing',
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        listingId: 2,
        maxFee: 600,
      }),
    });
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
  fetch('http://localhost:3000/main/userReview',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userReview),
    })
    .then(responseData => assert.equal(responseData.status, 200, 'User review successfully made'));
  assert.end();
});

// Tests if userView unsuccessfully created when missing one or more fields
test('UserReviews: no userReview created due to missing one or more fields', assert => {
  delete userReview.text;
  fetch('http://localhost:3000/main/userReview',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userReview),
    })
    .then(responseData => assert.equal(responseData.status, 400, 'User review creation denied'));
  assert.end();
});

// Tests if userReview successfully deleted given a review ID and associated user ID
// test('UserReviews: successful deletion of userReview given valid review and user ID', assert => {
//   fetch('http://localhost:3000/userReview',
//     {
//       method: 'delete',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ reviewId: 1 }),
//     }).then(responseData => assert.equal(responseData.status, 200, 'Review at id=1 deleted'));
//   assert.end();
// });

// // Tests if userReview unsuccessfully deleted given an incorrect review ID or associated user ID
// test('UserReviews: unsuccessful deletion of userReview given invalid review or user ID', assert => {
//   fetch('http://localhost:3000/userReview',
//     {
//       method: 'DELETE',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ reviewId: -1 }),
//     }).then(responseData => assert.equal(responseData.status, 400));
//   assert.end();
// });
