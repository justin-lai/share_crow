/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
// const fetch = require('node-fetch');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require(path.resolve(__dirname, '../../db/dbDesign.js'));

const verificationCode = () => {
  let text = '';
  const possible = '0123456789';
  for (let i = 0; i < 4; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

module.exports = {

  // ////////////////////////// SIGN UP FUNCTIONS ////////////////////////////
  // expects username, password, email, phoneNumber, address, aboutMe
  signup: (req, res) => {
    req.session.cookie.path = '/main/signup';
    console.log('POST //// SIGNUP ROUTE');
    // eslint-disable-next-line
    if (req.body.username && req.body.password && req.body.email && req.body.phone) {
      // generate a new hash based on password and make new entry in table
      db.User.find({
        where: {
          username: req.body.username,
        },
      }).then(listings => {
        if (!listings) {
          const hash = bcrypt.hashSync(req.body.password, 10);
          db.User.create({
            username: req.body.username,
            password: hash,
            email: req.body.email,
            address: req.body.address || null,
            city: req.body.city || null,
            zipcode: req.body.zipcode || null,
            state: req.body.state || null,
            about: req.body.about || null,
            verification: verificationCode(),
            firstName: req.body.firstName || null,
            lastName: req.body.lastName || null,
            verified: false,
            phone: req.body.phoneNumber,
          }).then((user) => {
            req.session.username = req.body.username;
            res.status(201).send(user.dataValues);
          });
        } else {
          res.status(500).send({ message: 'username taken' });
        }
      });
    } else {
      res.status(400).send({ message: 'a required field was not provided' });
    }
  },

  // //////////////////////////// LOGIN FUNCTIONS ////////////////////////////
  // expects username, password
  login: (req, res) => {
    req.session.cookie.path = '/main/login';
    if (!req.query.password || !req.query.username) {
      res.status(400).send({ message: 'username or password not provided' });
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
          req.session.username = req.query.username;
          res.status(200).send(queryData[0].dataValues);
          console.log(req.session);
        } else {
          res.status(400).send({ message: 'password does not match the password in the database' });
        }
      } else {
        res.status(400).send({ message: 'username was not found in the database, please create a new account' });
      } })
      .catch(err => err);
  },

  // //////////////////////////// PROFILE FUNCTIONS ////////////////////////////
  // expects id
  getUser: (req, res) => {
    // query database for a specific profile
    console.log('GET //// getUser Route');
    req.session.cookie.path = '/main/profile';
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
          res.status(400).send({ message: `user: ${req.query.id} was not found in the database` });
        }
      });
    } else {
      res.status(400).send({ message: 'id was not provided' });
    }
  },

  // expects id with an arbitrary number of parameters to change
  updateProfile: (req, res) => {
    console.log('PUT //// updateProfile Route');
    req.session.cookie.path = '/main/profile';
    // change database entry depending on parameters
    if (!req.body.id) {
      res.status(400).send({ message: 'id was not provided' });
    } else if (!req.body.password && !req.body.email && !req.body.address && !req.body.phoneNumber && !req.body.about) {
      res.status(400).send({ message: 'a required field was not provided' });
    } else {
      const updateProfile = {
        password: req.body.password || null,
        email: req.body.email || null,
        address: req.body.address || null,
        phone: req.body.phone || null,
        about: req.body.about || null,
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
      if (!req.body.phone) {
        delete updateProfile.phone;
      }
      if (!req.body.about) {
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
  // expects id
  getMessages: (req, res) => {
    // pulls all messages associated with username and id
    console.log('GET //// getMessages');
    req.session.cookie.path = '/main/message';
    if (req.query.senderId && req.query.recipientId) {
      res.status(400).send({ message: 'make 2 separate calls, either query for senderId or recipientId' });
    } else if (!req.query.senderId && !req.query.recipientId) {
      res.status(400).send({ message: 'id not provided for messenger' });
    } else if (req.query.senderId) {
      const searchFilters = {
        senderId: req.query.senderId,
      };
      // needs to get messages from based on both sender or receiver
      db.Messages.findAll({
        where: searchFilters,
        include: [{
          model: db.User,
          as: 'sender',
        },
        {
          model: db.User,
          as: 'recipient',
        }],
      })
      .then(queryData => {
        const results = [];
        queryData.forEach(message => {
          results.push(message.dataValues);
        });
        if (results.length) {
          res.status(200).send(results);
        } else {
          res.status(400).send({ message: `no messages were found from user: ${req.query.senderId}` });
        }
      });
    } else {
      const searchFilters = {
        recipientId: req.query.recipientId,
      };
      db.Messages.findAll({
        where: searchFilters,
        include: [{
          model: db.User,
          as: 'sender',
        },
        {
          model: db.User,
          as: 'recipient',
        }],
      })
      .then(queryData => {
        const results = [];
        queryData.forEach(message => {
          results.push(message.dataValues);
        });
        if (results.length) {
          res.status(200).send(results);
        } else {
          res.status(400).send({ message: `no messages send from user: ${req.query.recipientId}` });
        }
      });
    }
  },

  // expects sender_id, recipient_id, text
  postMessages: (req, res) => {
    // adds a new message entry in database
    console.log('POST //// postMessages');
    req.session.cookie.path = '/main/message';
    if (req.body.text && req.body.sender_id && req.body.recipient_id) {
      db.Messages.create({
        text: req.body.text,
        senderId: req.body.sender_id,
        recipientId: req.body.recipient_id,
      })
      .then((queryData) => res.status(201).send(queryData));
    } else {
      res.status(400).send({ message: 'a required field was not provided' });
    }
  },

  // //////////////////////////// RENTAL LISTING FUNCTIONS ////////////////////////////
  // expects none or 1 filter parameter
  getListings: (req, res) => {
    console.log('GET //// getListings route');
    req.session.cookie.path = '/main/listing';
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
      include: [{
        model: db.User,
        as: 'owner',
      },
      {
        model: db.User,
        as: 'renter',
      }],
    }).then((items) => {
      const results = [];
      items.forEach(entry => {
        results.push(entry.dataValues);
      });
      if (results.length) {
        res.status(200).send(results);
      } else {
        res.status(400).send({ message: `no results were found given: ${searchFilters}` });
      }
    });
  },

  // expects item, owner_id, max_fee, rental_fee, image
  createListing: (req, res) => {
    // adds a new listing entry in database
    console.log('POST //// createListing route');
    req.session.cookie.path = '/main/listing';
    // item name, owner_id, max_fee, and rental_fee required. image is optional
    if (req.body.item && req.body.owner_id && req.body.max_fee && req.body.rental_fee) {
      db.Listings.create({
        name: req.body.item,
        ownerId: req.body.owner_id,
        maxFee: req.body.max_fee,
        rentalFee: req.body.rental_fee,
        image: req.body.image || null,
        rented: false,
        itemReturned: false,
      })
      .then((queryData) => res.status(201).send(queryData));
    } else {
      res.status(400).send({ message: 'a required parameter was not provided' });
    }
  },

  // expects listingId and an arbitrary number of parameters
  changeListing: (req, res) => {
    // modifies entry with 'listing id' in database
    console.log('PUT //// changeListing Route');
    req.session.cookie.path = '/main/listing';
    // change database entry depending on parameters
    if (!req.body.listingId) {
      res.status(400).send({ message: 'listingId was not provided' });
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
    req.session.cookie.path = '/main/listing';
    if (!req.body.listingId) {
      res.status(400).send({ message: 'listingId was not provided' });
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

  // //////////////////////////// UNIQUE LISTING ACQUIRE FUNCTIONS ////////////////////////////
  getUniqueListing: (req, res) => {
    console.log('GET //// getUniqueListing route');
    req.session.cookie.path = '/main/listing/unique';
    if (!req.query.id) {
      res.status(400).send({ message: 'id not sent with request' });
    } else {
      db.Listings.find({
        where: {
          id: req.query.id,
        },
      }).then((listing) => {
        if (listing) {
          res.status(200).send(listing.dataValues);
        } else {
          res.status(400).send({ message: `listing is empty at id: ${req.query.id}` });
        }
      });
    }
  },
  // //////////////////////////// USER REVIEW FUNCTIONS ////////////////////////////
  // expects lenderId
  getUserReviews: (req, res) => {
    // returns all entries associated with username and id from database
    console.log('GET //// getUserReviews route');
    req.session.cookie.path = '/main/getUserReview';
    if (!req.query.lenderId) {
      res.status(400).send({ message: 'lenderId not provided' });
    } else {
      db.Reviews.findAll({
        where: {
          lenderId: req.query.lenderId,
        },
      })
      .then(queryData => {
        const results = [];
        queryData.forEach(review => results.push(review.dataValues));
        if (results.length) {
          res.status(200).send(results);
        } else {
          res.status(400).send({ message: `No user review was found from lenderId# ${req.query.lenderId}` });
        }
      });
    }
  },

  // expects reviewerId, lenderId, rating, text
  createUserReview: (req, res) => {
    // add a new review entry in database
    console.log('POST //// createUserReview route');
    req.session.cookie.path = '/main/profile';
    console.log('***************', req.body);
    if (!req.body.lenderId || !req.body.reviewerId || !req.body.rating || !req.body.text) {
      console.log('BAM');
      res.status(400).send({ message: 'a required field was missing' });
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
    req.session.cookie.path = '/main/profile';
    db.Reviews.destroy({
      where: {
        id: req.body.reviewId,
      },
    }).then(queryData => {
      if (queryData) {
        res.status(200).send({ message: 'delete successful' });
      } else {
        res.status(400).send({ message: 'there was an error with deleting the review' });
      }
    });
  },
};
