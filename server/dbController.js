// const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require(path.resolve(__dirname, '../../db/dbDesign.js'));
// ----------- Search for all Users -------------- //
// db.User.findAll({}).then((users) => {
//   //  All user objects returned //
//   //eslint-disable-next-line
//   users.forEach(user => console.log(user.dataValues));
// });

module.exports = {

  // SIGN UP FUNCTIONS
  // expects username, password, email, phoneNumber, address, aboutMe
  signup: (req, res) => {
    // eslint-disable-next-line no-console
    console.log('POST //// SIGNUP ROUTE');
    // eslint-disable-next-line
    if (req.body.username && req.body.password && req.body.email && req.body.phoneNumber && req.body.address && req.body.aboutMe) {
      // generate a new hash based on password and make new entry in table
      console.log(req.body);
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
      res.status(400).send({});
    }
  },

  // LOGIN FUNCTIONS
  // expects username, password
  login: (req, res) => {
    if (!req.query.password || !req.query.username) {
      res.status(400).send({});
    }
    // eslint-disable-next-line no-console
    console.log('GET //// LOGIN ROUTE');
    db.User.findAll({
      where: {
        username: req.query.username,
      },
    })
    .then(queryData => {
      if (queryData[0]) {
        if (bcrypt.compareSync(req.query.password, queryData[0].dataValues.password)) {
          res.status(200).send(queryData[0].dataValues);
        } else {
          res.status(400).send({});
        }
      } else {
        res.status(400).send({});
      } })
      .catch(err => err);
  },

  // PROFILE FUNCTIONS
  // expects id
  getUser: (req, res) => {
    // query database for a specific profile
    // eslint-disable-next-line no-console
    console.log('GET //// getUser Route');
    if (req.query.id) {
      db.User.findAll({
        where: {
          id: req.query.id,
        },
      })
      .then(queryData => {
        if (queryData[0]) {
          res.status(200).send(queryData[0].dataValues);
        } else {
          res.status(400).send({});
        }
      });
    } else {
      res.status(400).send({});
    }
  },

  // expects username and id with an arbitrary number of parameters to change
  updateProfile: (req, res) => {
    // change database entry depending on parameters
    // eslint-disable-next-line no-console
    console.log('PUT //// updateProfile Route');
    res.sendStatus(200);
  },

  // PRIVATE MESSAGING FUNCTIONS
  // expects username and id
  getMessages: (req, res) => {
    // pulls all messages associated with username and id
    // eslint-disable-next-line no-console
    console.log('GET //// getMessages');
    db.Messages.findAll({
      where: {
        senderId: req.query.id,
      },
    })
    .then(queryData => {
      if (queryData) {
        res.status(200).send(queryData);
      } else {
        res.status(400).send({});
      }
    });
  },

  // expects sender_id, recipient_id, text
  postMessages: (req, res) => {
    // adds a new message entry in database
    // eslint-disable-next-line no-console
    console.log('POST //// postMessages');
    if (req.body.text) {
      db.Messages.create({
        text: req.body.text,
        senderId: req.body.sender_id,
        recipientId: req.body.recipient_id,
      })
      .then((queryData) => res.status(201).send(queryData));
    } else {
      res.status(400).send({});
    }
  },

  // RENTAL LISTING FUNCTIONS
  // expects none or 1 filter parameter
  getListings: (req, res) => {
    // if no parameters, return all listings

    const searchFilters = {
      name: req.params.name || null,
      owner_id: req.params.owner_id || null,
      max_fee: req.params.max_fee || null,
      rental_fee: req.params.rental_fee || null,
      rental_period: req.params.rental_fee || null,
    };
    // if parameters provided, only return a filtered list
    // eslint-disable-next-line no-console
    console.log('GET //// getListings route');
    db.Listings.findAll({
      where: searchFilters,
    }).then((items) => res.status(200).send(items));
  },
  // expects item, owner_id, max_fee, rental_fee, rental_period, image
  createListing: (req, res) => {
    // adds a new listing entry in database
    // eslint-disable-next-line no-console
    console.log('POST //// createListing route');
    db.Listings.create({
      name: req.body.item,
      owner_id: req.body.owner_id,
      max_fee: req.body.max_fee,
      rental_fee: req.body.rental_fee,
      rental_period: req.body.rental_period,
      image: req.body.image,
    })
    .then((queryData) => res.status(201).send(queryData));
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
