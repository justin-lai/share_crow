const db = require('./dbDesign.js');

// THIS HAS ALREADY BEEN RUN
// HARD RESETS THE DB, DO NOT RUN UNLESS YOU WANT TO CLEAR LITERALLY EVERYTHING-- caathy

db.sequelize
.sync()
  .then(() => {
    //eslint-disable-next-line
    console.log('It worked!');
  }, (err) => {
    //eslint-disable-next-line
    console.log('An error occurred while creating the table:', err);
  }).then(() => {
    db.User.create({
      password: 'jjj3k12kksksls',
      username: 'Arthur',
      address: '4411 TomTom Street',
      city: 'San Francisco',
      state: 'California',
      zipcode: '94539',
      email: 'ArthurTomTom@gmail.com',
      phone: '555-444-1122',
      about: 'All about me!',
      userImage: 5,
      verification: 1234,
      verified: true,
      firstName: 'Arthur',
      lastName: 'Livingston',
    }).then((user) => {
      //eslint-disable-next-line
      console.log('Completed: ', user.dataValues);
    });
    db.User.create({
      password: 'jalsjo3kkqfo',
      username: 'Justin',
      address: '66611 S Street',
      email: 'Justin@gmail.com',
      phone: '555-567-0099',
      about: 'Everything about me!',
    }).then((user) => {
      //eslint-disable-next-line
      console.log('Completed: ', user.dataValues);
    });
    db.User.create({
      password: 'kp409fjw48hgj5',
      username: 'Cathy',
      address: '9494 Tell Ave',
      email: 'Cathy@gmail.com',
      phone: '555-001-8585',
      about: 'All about us!',
    }).then((user) => {
      //eslint-disable-next-line
      console.log('Completed: ', user.dataValues);
    });
    db.User.create({
      password: 'k94993010kkf',
      username: 'Ben',
      address: '009 Tails Road',
      email: 'Ben1@gmail.com',
      phone: '555-667-0862',
      about: 'All me!',
    }).then((user) => {
      //eslint-disable-next-line
      console.log('Completed: ', user.dataValues);
    });
    db.Listings.create({
      name: 'Grill',
      ownerId: 3,
      renterId: 2,
      maxFee: 50,
      rentalFee: 5,
      rentalPeriod: 3,
    }).then((item) => {
      //eslint-disable-next-line
      console.log(item.dataValues);
    });
    db.Listings.create({
      name: 'Bicycle',
      ownerId: 1,
      renterId: 4,
      maxFee: 1000,
      rentalFee: 30,
      rentalPeriod: 2,
    }).then((item) => {
      //eslint-disable-next-line
      console.log(item.dataValues);
    });
    db.Listings.create({
      name: 'Projector',
      ownerId: 4,
      renterId: 2,
      maxFee: 500,
      rentalFee: 20,
      rentalPeriod: 1,
    }).then((item) => {
      //eslint-disable-next-line
      console.log(item.dataValues);
    });
    db.Category.create({
      categoryName: 'Books',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Cameras',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Computers',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Music',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Real Estate',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Sporting Goods',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Video Games',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Consumer Electronics',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Clothing',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Motors',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Pet Supplies',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Home & Garden',
      categoryId: null,
    });
    db.Category.create({
      categoryName: 'Nonfiction',
      CategoryId: 1,
    });
    db.Category.create({
      categoryName: 'Textbooks',
      CategoryId: 1,
    });
    db.Category.create({
      categoryName: 'Cookbooks',
      CategoryId: 1,
    });
    db.Category.create({
      categoryName: 'Accessories',
      CategoryId: 1,
    });
    db.Category.create({
      categoryName: 'Film Photography',
      CategoryId: 2,
    });
    db.Category.create({
      categoryName: 'Camcorders',
      CategoryId: 2,
    });
    db.Category.create({
      categoryName: 'Digital Cameras',
      CategoryId: 2,
    });
    db.Category.create({
      categoryName: 'Binoculars & Telescopes',
      CategoryId: 2,
    });
    db.Category.create({
      categoryName: 'Camera Drones',
      CategoryId: 2,
    });
  });
