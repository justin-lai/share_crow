/* eslint-disable no-console */
// const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require(path.resolve(__dirname, '../../db/dbDesign.js'));

module.exports = {

  // ////////////////////////// SIGN UP FUNCTIONS ////////////////////////////
  // expects username, password, email, phoneNumber, address, aboutMe
  signup: (req, res) => {
    console.log('POST //// SIGNUP ROUTE');
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
      res.status(400).send({});
    }
  },

  // //////////////////////////// LOGIN FUNCTIONS ////////////////////////////
  // expects username, password
  login: (req, res) => {
    if (!req.query.password || !req.query.username) {
      res.status(400).send({});
    }
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

  // //////////////////////////// PROFILE FUNCTIONS ////////////////////////////
  // expects id
  getUser: (req, res) => {
    // query database for a specific profile
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

  // expects id with an arbitrary number of parameters to change
  updateProfile: (req, res) => {
    console.log('PUT //// updateProfile Route');

    // change database entry depending on parameters
    if (!req.body.id) {
      res.status(400).send({});
    } else {
      const updateProfile = {
        password: req.body.password || null,
        email: req.body.email || null,
        address: req.body.address || null,
        phone: req.body.phoneNumber || null,
        about: req.body.aboutMe || null,
      };

      if (!req.body.password) {
        delete updateProfile.password;
      } else {
        updateProfile.password = bcrypt.hashSync(req.body.password, 10);
      }
      if (!req.body.email) {
        delete updateProfile.email;
      }
      if (!req.body.address) {
        delete updateProfile.address;
      }
      if (!req.body.phoneNumber) {
        delete updateProfile.phone;
      }
      if (!req.body.aboutMe) {
        delete updateProfile.about;
      }
      db.User.find(
        {
          where: {
            id: req.body.id,
          },
        })
        .then(queryData => queryData.updateAttributes(updateProfile))
        .then(() => {
          db.User.find({
            where: {
              id: req.body.id,
            },
          }).then(newEntry => res.status(200).send(newEntry));
        });
    }
  },

  // //////////////////////////// PRIVATE MESSAGING FUNCTIONS ////////////////////////////
  // expects username and id
  getMessages: (req, res) => {
    // pulls all messages associated with username and id
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

  // //////////////////////////// RENTAL LISTING FUNCTIONS ////////////////////////////
  // expects none or 1 filter parameter
  getListings: (req, res) => {
    console.log('GET //// getListings route');
    // if no parameters, return all listings
    const searchFilters = {
      name: req.query.name || null,
      ownerId: req.query.owner_id || null,
      maxFee: req.query.max_fee || null,
      rentalFee: req.query.rental_fee || null,
    };

    if (!req.query.name) {
      delete searchFilters.name;
    }
    if (!req.query.owner_id) {
      delete searchFilters.ownerId;
    }
    if (!req.query.max_fee) {
      delete searchFilters.maxFee;
    }
    if (!req.query.rental_fee) {
      delete searchFilters.rentalFee;
    }
    // if parameters provided, only return a filtered list
    // eslint-disable-next-line no-console
    db.Listings.findAll({
      where: searchFilters,
    }).then((items) => res.status(200).send(items));
  },

  // expects item, owner_id, max_fee, rental_fee, image
  createListing: (req, res) => {
    // adds a new listing entry in database
    console.log('POST //// createListing route');
    db.Listings.create({
      name: req.body.item,
      owner_id: req.body.owner_id,
      max_fee: req.body.max_fee,
      rental_fee: req.body.rental_fee,
      image: req.body.image,
      rented: false,
      itemReturned: false,
    })
    .then((queryData) => res.status(201).send(queryData));
    res.status(201).send(req.body);
  },

  // expects listingId and an arbitrary number of parameters
  changeListing: (req, res) => {
    // modifies entry with 'listing id' in database
    console.log('PUT //// changeListing Route');

    // change database entry depending on parameters
    if (!req.body.listingId) {
      res.status(400).send({});
    } else {
      const updateListing = {
        renterId: req.body.renterId || null,
        maxFee: req.body.maxFee || null,
        rentalFee: req.body.rentalFee || null,
        rentedOn: req.body.rentedOn || null,
        itemImage: req.body.itemImage || null,
        returnedOn: req.body.returnedOn || null,
        itemReturned: req.body.itemReturned || null,
        rented: req.body.rented || null,
      };

      if (!req.body.renterId) {
        delete updateListing.renterId;
      }
      if (!req.body.maxFee) {
        delete updateListing.maxFee;
      }
      if (!req.body.rentalFee) {
        delete updateListing.rentalFee;
      }
      if (!req.body.rentedOn) {
        delete updateListing.rentedOn;
      }
      if (!req.body.returnedOn) {
        delete updateListing.returnedOn;
      }
      if (!req.body.rented) {
        delete updateListing.rented;
      }
      if (!req.body.itemReturned) {
        delete updateListing.itemReturned;
      }
      if (!req.body.itemImage) {
        delete updateListing.itemImage;
      }
      db.Listings.find(
        {
          where: {
            id: req.body.listingId,
          },
        })
        .then(queryData => queryData.updateAttributes(updateListing))
        .then(() => {
          db.Listings.find({
            where: {
              id: req.body.listingId,
            },
          }).then(newEntry => res.status(200).send(newEntry));
        });
    }
  },

  // expects listing id
  returnedListing: (req, res) => {
    // call change listing to change renting period to 'complete'
    console.log('DELETE //// returnedListing route');
    if (!req.body.listingId) {
      res.status(400).send({});
    } else {
      db.Listings.find(
        {
          where: {
            id: req.body.listingId,
          },
        })
        .then(queryData => queryData.updateAttributes({
          itemReturned: true,
        }))
        .then(() => {
          db.Listings.find({
            where: {
              id: req.body.listingId,
            },
          }).then(newEntry => res.status(200).send(newEntry));
        });
    }
  },

  // //////////////////////////// USER REVIEW FUNCTIONS ////////////////////////////
  // expects lenderId
  getUserReviews: (req, res) => {
    // returns all entries associated with username and id from database
    console.log('GET //// getUserReviews route');

    db.Reviews.findAll({
      where: {
        lenderId: req.query.lenderId,
      },
    })
    .then(queryData => {
      if (queryData.length) {
        res.status(200).send(queryData);
      } else {
        res.status(400).send({});
      }
    });
  },

  // expects reviewerId, lenderId, rating, text
  createUserReview: (req, res) => {
    // add a new review entry in database
    console.log('POST //// createUserReview route');
    if (!req.body.lenderId || !req.body.reviewerId || !req.body.rating || !req.body.text) {
      res.status(400).send({});
    } else {
      db.Reviews.create({
        lenderId: req.body.lenderId,
        reviewerId: req.body.reviewerId,
        rating: req.body.rating,
        text: req.body.text,
      })
      .then(queryData => res.status(200).send(queryData));
    }
  },

  // expects reviewId
  deleteUserReview: (req, res) => {
    // id associated with the review must match the user id
    // deletes a user review from database by id
    console.log('DELETE //// deleteUserReview route');
    db.Reviews.destroy({
      where: {
        id: req.body.reviewId,
      },
    }).then(queryData => {
      if (queryData) {
        res.status(200).send({});
      } else {
        res.status(400).send({});
      }
    });
  },
};
