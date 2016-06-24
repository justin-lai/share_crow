// const test = require('tape');
// const path = require('path');
// const db = require(path.resolve(__dirname, '../db/dbDesign.js'));
//
// // -------------- User Table test cases --------------- //
//
// db.sequelize
// .sync()
//   .then(() => {
//     const testData = {
//       password: 1234,
//       username: 'testUser',
//       address: '111 Test Street',
//       city: 'San Francisco',
//       state: 'California',
//       zipcode: '99921',
//       userImage: 12,
//       verification: 4433,
//       verified: true,
//       firstName: 'Thomas',
//       lastName: 'Tom',
//       email: 'Test@me.com',
//       phone: '111-222-4444',
//       about: 'This is about TestUser',
//     };
//
//     test('Successfully create new user entry in User table', (assert) => {
//       db.User.create({
//         password: testData.password,
//         username: testData.username,
//         address: testData.address,
//         city: testData.city,
//         state: testData.state,
//         zipcode: testData.zipcode,
//         userImage: testData.userImage,
//         verification: testData.verification,
//         verified: testData.verified,
//         firstName: testData.firstName,
//         lastName: testData.lastName,
//         email: testData.email,
//         phone: testData.phone,
//         about: testData.about,
//       });
//     // .then((user) => {
//     //   db.User.findAll({
//     //     where: {
//     //       username: user.dataValues.username,
//     //     },
//     //   }).then((User) => {
//     //     if (user === User) {
//     //       assert.end();
//     //     }
//     //   });
//     // });
//       assert.end();
//     });
//   });
//
// test('Successfully remove user entry from User table', (assert) => {
//   assert.end();
// });
//
// test('Successfully update user entry in User table', (assert) => {
//   assert.end();
// });
//
// // --------------- Listings table test cases ---------------- //
//
// const listTestData = {
//   name: 'testItem',
//   ownerId: 'testowner',
//   renterId: 'testrenter',
//   maxFee: 20.5,
//   rentalFee: 5.3,
//   rented: false,
//   rentedOn: 120420002,
//   returnedOn: 11022003,
//   itemReturned: false,
//   itemImage: 4,
// };
//
// test('Successfully create new item in Listing table', (assert) => {
//   db.Listings.create({
//     name: listTestData.name,
//     ownerId: listTestData.ownerId,
//     renterId: listTestData.renterId,
//     maxFee: listTestData.maxFee,
//     rentalFee: listTestData.rentalFee,
//     rented: listTestData.rented,
//     rentedOn: listTestData.rentedOn,
//     returnedOn: listTestData.returnedOn,
//     itemReturned: listTestData.itemReturned,
//     itemImage: listTestData.itemImage,
//   });
//   assert.end();
// });
//
// test('Successfully remove listing entry from Listing table', (assert) => {
//   assert.end();
// });
//
// test('Successfully update listing entry in Listing table', (assert) => {
//   assert.end();
// });
//
// // ----------------------------------------------------------------- //
