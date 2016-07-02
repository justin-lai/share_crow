/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');
const path = require('path');
const db = require(path.resolve(__dirname, '../../db/dbDesign.js'));
const Sequelize = require('sequelize');

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
          }).then(user => {
            db.Images.create({
              image: 'http://cdn.litlepups.net/2016/04/10/small_crow-flying-png-bird-flying-silhouette.png',
              userId: user.dataValues.id,
            });
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
        include: [{
          model: db.Images,
        }],
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
      },
      ],
    })
      .then(queryData => {
        const results = [];
        queryData.forEach(category => results.push(category));
        res.status(200).send(results);
      });
  },

};
