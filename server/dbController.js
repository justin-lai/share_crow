/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');
const path = require('path');
const config = require('../config');
const db = require(path.resolve(__dirname, '../../db/dbDesign.js'));
const AWS = require('aws-sdk');
const Sequelize = require('sequelize');
const stripe = require('stripe')('sk_test_NKcbGwQJ7qeEaOhiMMzDf2WU');

AWS.config.accessKeyId = config.AWS_ACCESSKEY;
AWS.config.secretAccessKey = config.AWS_SECRETKEY;
AWS.config.region = config.AWS_REGION;

const verificationCode = () => {
  let text = '';
  const possible = '0123456789';
  for (let i = 0; i < 4; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const getFileName = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 10; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return `${text}.png`;
};

module.exports = {


  getImage: (req, res) => {
    console.log('GET //// getImage route');
    req.session.cookie.path = 'main/imageUpload';
    console.log(req.query);
    if (!req.query.id || req.query.id <= 0) {
      res.status(400).send({ message: 'invalid or non-included image id' });
    } else {
      db.Images.find({
        where: {
          ListingId: req.query.id,
        },
      })
        .then(responseData => res.status(200).send(responseData));
    }
  },

  changeImageListing: (req, res) => {
    console.log('PUT //// changeImageListing route');
    req.session.cookie.path = 'main/imageUpload';
    if (!req.body.id) {
      res.status(400).send({ message: 'id not provided in request body' });
    } else {
      db.Images.find({
        where: {
          id: req.body.id,
        },
      })
        .then(responseData => responseData.updateAttributes({ ListingId: req.body.listingId }))
        .then(newImageListing => res.status(200).send(newImageListing));
    }
  },

  imageUpload: (req, res) => {
    console.log('POST //// imageUpload route');
    // console.log('ACCESSKEY!!!!!!!!!!!!!!!! ', AWS.config.accessKeyId);
    // console.log('SECRET!!!!!!!!!!!!!!!', AWS.config.secretAccessKey);
    req.session.cookie.path = 'main/imageUpload';
    if (!req.body.imageBinary) {
      res.status(400).send({ message: 'imageBinary invalid or nonexistant' });
    } else {
      const s3Bucket = new AWS.S3({ params: { Bucket: 'sharecrow' } });
      const buf = new Buffer(req.body.imageBinary.replace(/^data:image\/\w+;base64,/, ''), 'base64');
      const filename = getFileName();
      const data = {
        Key: filename,
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg',
      };
      s3Bucket.putObject(data, (err, data2) => {
        if (err) {
          console.log(err);
          console.log('Error uploading data: ', data2);
          res.send(data2);
        } else {
          db.Images.create({
            listingImage: `https://s3-us-west-2.amazonaws.com/sharecrow/${filename}`,
          })
            .then(response => res.status(200).send(response.dataValues));
          //     .then(photoID => {
          //       db.listings.find({
          //         where: {
          //           id: req.body.listingId,
          //         },
          //       })
          //         .then(listing => listing.updateAttributes({ itemImage: photoID }))
          //         .then(() => {
          //           db.listings.find({
          //             where: {
          //               id: req.body.listingId,
          //             },
          //           })
          //             .then(updatedListing => res.status(201).send(updatedListing));
          //         });
          //     });
          // console.log('succesfully uploaded the image!');
        }
      });
    }
  },

  // ////////////////////////// SIGN UP FUNCTIONS ////////////////////////////
  // expects username, password, email, phoneNumber, address, aboutMe
  signup: (req, res) => {
    console.log('this is the body', req.body);
    console.log(req.session);
    req.session.cookie.path = '/main/signup';
    console.log('POST //// SIGNUP ROUTE');
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
            phone: req.body.phone,
          }).then((user) => {
            req.session.username = req.body.username;
            delete user.dataValues.password;
            req.session.userID = user.dataValues;
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
          delete queryData[0].dataValues.password;
          req.session.userID = queryData[0].dataValues;
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
    if (req.query.id || req.query.username) {
      db.User.findAll({
        where: Sequelize.or({
          id: req.query.id,
        }, {
          username: req.query.username,
        }),
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
    } else if (!req.body.password && !req.body.email && !req.body.address && !req.body.phone && !req.body.about) {
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
      console.log('!!!!!!!!!!!!!!!!');
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
        console.log('message results: ', results);
        if (results.length) {
          res.status(200).send(results);
        } else {
          res.status(400).send(results);
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

  deleteMessage: (req, res) => {
    // id associated with the message must match the user id
    // deletes a user review from database by id
    console.log('DELETE //// deleteUserReview route');
    req.session.cookie.path = '/main/profile';
    console.log('DELETING MESSAGE ID', req.body);
    db.Messages.destroy({
      where: {
        id: req.body.messageId,
      },
    }).then(queryData => {
      if (queryData) {
        res.status(200).send({ message: 'delete successful' });
      } else {
        res.status(400).send({ message: 'there was an error with deleting the message' });
      }
    });
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
      categoryName: req.query.category || null,
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
    if (!req.query.category) {
      delete searchFilters.categoryName;
    }
    // if parameters provided, only return a filtered list
    db.Listings.findAll({
      where: searchFilters,
      include: [{
        model: db.User,
        as: 'owner',
      },
      {
        model: db.User,
        as: 'renter',
      },
      {
        model: db.Category,
      },
      {
        model: db.Images,
        as: 'listingImage',
      }],
    }).then((items) => {
      const results = [];
      items.forEach(entry => {
        results.push(entry.dataValues);
      });
      if (results.length) {
        res.status(200).send(results);
      // } else {
        // res.status(400).send({ message: `no results were found given: ${searchFilters}` });
      }
    });
  },
  // expects item, owner_id, max_fee, rental_fee, image
  createListing: (req, res) => {
    // adds a new listing entry in database
    console.log('POST //// createListing route');
    req.session.cookie.path = '/main/listing';
    console.log(req.body.previewImage);
    // item name, owner_id, max_fee, and rental_fee required. image is optional
    if (req.body.item && req.body.owner_id && req.body.max_fee && req.body.rental_fee) {
      db.Listings.create({
        name: req.body.item,
        ownerId: req.body.owner_id,
        maxFee: req.body.max_fee,
        rentalFee: req.body.rental_fee,
        category: req.body.category,
        rented: false,
        itemReturned: false,
        previewImage: 'test', //req.body.previewImage || '',
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
          returnedOn: new Date().toISOString(),
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

  // //////////////////////////// CATEGORY FUNCTIONS ////////////////////////////
  getCategory: (req, res) => {
    console.log('GET //// getCategory route');
    const searchOptions = req.query;
    req.session.cookie.path = '/main/category';
    db.Category.findAll({
      where: searchOptions,
      include: [{
        model: db.Category,
        as: 'subCategory',
        include: [{
          model: db.Listings,
          include: [{
            model: db.User,
            as: 'owner',
          },
          {
            model: db.User,
            as: 'renter',
          }],
        }],
      },
      {
        model: db.Listings,
        include: [{
          model: db.User,
          as: 'owner',
        },
        {
          model: db.User,
          as: 'renter',
        }],
      }],
    })
      .then(queryData => {
        const results = [];
        queryData.forEach(category => results.push(category));
        res.status(200).send(results);
      });
  },

  // //////////////////////////// PAYMENT FUNCTIONS ////////////////////////////
  generatePayment: (req, res) => {
    console.log('POST //// generatePayment route');


    req.session.cookie.path = '/main/payment';
    const stripeToken = req.body.stripeToken;
    db.Listings.find({
      where: {
        id: req.body.id,
      },
    })
      .then(queryData => {
        const rentalFee = Math.ceil((queryData.returnedOn - queryData.rentedOn) / (1000 * 60 * 60 * 24)) * queryData.rentalFee;
        // console.log(rentalFee);
        const charge = stripe.charges.create({
          amount: 5000,
          currency: 'usd',
          source: stripeToken,
          description: 'Example charge',
          // metadata: { 'order_id': '6735' }
        }, (err) => {
          if (err && err.type === 'StripeCardError') {
            // The card has been declined
          } else {
            console.log(charge);
          }
        });
        // console.log(rentalFee);

        db.Payments.create({
          $Amount: rentalFee,
          startDate: queryData.rentedOn,
          itemId: queryData.id,
          payerId: queryData.renterId,
          paidId: queryData.ownerId,
        })
          .then(newPayment => { console.log(newPayment.dataValues); res.status(200).send({ payment: newPayment.dataValues }); });
      });
  },
  getPaymentInfo: (req, res) => {
    console.log('GET //// getPaymentInfo route');
    req.session.cookie.path = '/main/payment';
    if (!req.query.id) {
      res.status(400).send({ message: 'payment id not provided' });
    } else {
      db.Payments.find({
        where: {
          id: req.query.id,
        },
      })
        .then(queryData => {
          if (queryData) {
            res.status(200).send(queryData);
          } else {
            res.status(400).send({ message: `payment entry not found at ${req.query.id}` });
          }
        });
    }
  },
  submitPayment: (req, res) => {
    console.log('DELETE //// submitPayment');
    req.session.cookie.path = '/main/payment';
    if (!req.body.id) {
      res.status(400).send({ message: `payment entry not found at ${req.body.id}` });
    } else {
      db.Payments.find({
        where: {
          id: req.body.id,
        },
      })
        .then(queryData => {
          queryData.updateAttributes({ paymentDate: new Date().toISOString() });
          db.Listings.find({
            where: {
              id: queryData.itemId,
            },
          })
            .then(listingData => listingData.updateAttributes({ rented: false }));
          res.status(200).send(queryData);
        });
    }
  },

};
