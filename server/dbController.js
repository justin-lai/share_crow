// const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require(path.resolve(__dirname, '../../db/dbDesign.js'));
// ----------- Search for all Users -------------- //
db.User.findAll({}).then((users) => {
  //  All user objects returned //
  //eslint-disable-next-line
  users.forEach(user => console.log(user.dataValues));
});

module.exports = {

  // SIGN UP FUNCTIONS
  // expects username, password, email, phoneNumber, address, aboutMe
  signup: (req, res) => {
    // eslint-disable-next-line no-console
    console.log('signup route: ', req.body);
    // eslint-disable-next-line
    if (req.body.username && req.body.password && req.body.email && req.body.phoneNumber && req.body.address && req.body.aboutMe) {
      // generate a new hash based on password and make new entry in table
      const hash = bcrypt.hashSync(req.body.password, 10);
      db.User.create({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phoneNumber,
        about: req.body.aboutMe,
      }).then((user) => res.status(201).send(user.dataValues));
    } else {
      res.sendStatus(400);
    }
  },

  // LOGIN FUNCTIONS
  // expects username, password
  login: (req, res) => {
    if (!req.query.password) {
      res.sendStatus(400);
    } else {
      // grab password stored in database and store into variable
      // if (bcrypt.compareSync(req.body.password, hash)) {
      //   res.sendStatus(200);
      // }
      // eslint-disable-next-line no-console
      console.log('login route: ', req.query);
      if (req.query.username === 'tom' && req.query.password === 'password') {
        res.sendStatus(200);
      } else {
        res.sendStatus(400);
      }
    }
  },

  // PROFILE FUNCTIONS
  // expects username or id
  getProfile: (req, res) => {
    // query database for a specific profile
    // eslint-disable-next-line no-console
    console.log('getProfile route: ', req.params);
    res.sendStatus(200);
  },

  // expects call from signup route
  createProfile: (req, res) => {
    // create new profile entry in database
    // eslint-disable-next-line no-console
    console.log('createProfile route', req.body);
    res.status(201).send(req.body);
  },

  // expects username and id with an arbitrary number of parameters to change
  updateProfile: (req, res) => {
    // change database entry depending on parameters
    // eslint-disable-next-line no-console
    console.log('updateProfile route: ', req.body);
    res.sendStatus(200);
  },

  // PRIVATE MESSAGING FUNCTIONS
  // expects username and id
  getMessages: (req, res) => {
    // pulls all messages associated with username and id
    // eslint-disable-next-line no-console
    console.log('getMessages route: ', req.params);
    res.sendStatus(200);
  },

  // expects sender_id, recipient_id, text
  postMessages: (req, res) => {
    // adds a new message entry in database
    // eslint-disable-next-line no-console
    console.log('postMessages route', req.body);
    res.status(201).send(req.body);
  },

  // RENTAL LISTING FUNCTIONS
  // expects none or 1 filter parameter
  getListings: (req, res) => {
    // if no parameters, return all listings
    // if parameters provided, only return a filtered list
    // eslint-disable-next-line no-console
    console.log('getListings route: ', req.params);
    res.sendStatus(200);
  },
  // expects name, owner_id, max_fee, rental_fee, rental_period
  createListing: (req, res) => {
    // adds a new listing entry in database
    // eslint-disable-next-line no-console
    console.log('createListing route', req.body);
    res.status(201).send(req.body);
  },

  // expects listing id and an arbitrary number of parameters
  changeListing: (req, res) => {
    // modifies entry with 'listing id' in database
    // eslint-disable-next-line no-console
    console.log('changeListing route', req.body);
    res.sendStatus(200);
  },

  // expects listing id
  returnedListing: (req, res) => {
    // call change listing to change renting period to 'complete'
    // eslint-disable-next-line no-console
    console.log('returnListing route', req.body);
    res.sendStatus(410);
  },

  // USER REVIEW FUNCTIONS
  // expects username and id
  getUserReviews: (req, res) => {
    // returns all entries associated with username and id from database
    // eslint-disable-next-line no-console
    console.log('getUserReviews route', req.params);
    res.sendStatus(200);
  },

  // expects reviewer id, reviewee id, rating, message
  createUserReview: (req, res) => {
    // add a new review entry in database
    // eslint-disable-next-line no-console
    console.log('createUserReview route', req.body);
    res.status(201).send(req.body);
  },

  // expects review id, user id
  deleteUserReview: (req, res) => {
    // id associated with the review must match the user id
    // deletes a user review from database by id
    // eslint-disable-next-line no-console
    console.log('deleteUserReview route', req.body);
    res.sendStatus(410);
  },
};
