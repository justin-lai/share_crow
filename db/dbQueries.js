const db = require('./index.js');

// ------------ Search by specific ID --------------//
db.User.findById(2).then((user) => {
  // Specific user based on id '2' returned //
  //eslint-disable-next-line
  console.log(user.dataValues);
});


// ----------- Search for all Users -------------- //
db.User.findAll({}).then((users) => {
  //  All user objects returned //
  //eslint-disable-next-line
  console.log(users);
});


// ----------- Save new User to database --------- //
db.User.create({
  password: '',
  username: '',
  address: '',
  email: '',
  phone: '',
  about: '',
}).then((user) => {
  // new user returned //
  //eslint-disable-next-line
  console.log(user);
});


// ------------ Delete User from database ---------- //
db.User.destroy({
  where: {
    userId: 1,
  },
});
