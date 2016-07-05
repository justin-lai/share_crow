/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable max-len */
const path = require('path');
const db = require(path.resolve(__dirname, '../../db/dbDesign.js'));
const stripe = require('stripe')('sk_test_NKcbGwQJ7qeEaOhiMMzDf2WU');
const Sequelize = require('sequelize');

module.exports = {
	// //////////////////////////// PAYMENT FUNCTIONS ////////////////////////////
  generatePayment: (req, res) => {
    console.log('POST //// generatePayment route');
    req.session.cookie.path = '/main/payment';
    db.Listings.find({
      where: {
        id: req.body.id,
      },
    })
      .then(queryData => {
        const rentalFee = Math.ceil((queryData.returnedOn - queryData.rentedOn) / (1000 * 60 * 60 * 24)) * queryData.rentalFee;

        db.Payments.create({
          $Amount: rentalFee,
          startDate: queryData.rentedOn,
          ListingId: queryData.id,
          itemName: queryData.name,
          paymentComplete: false,
          payerId: queryData.renterId,
          paidId: queryData.ownerId,
        })
          .then(newPayment => res.status(200).send({ payment: newPayment.dataValues }));
      });
  },

  getPaymentInfo: (req, res) => {
    console.log('GET //// getPaymentInfo route');
    req.session.cookie.path = '/main/payment';
    if (req.query.grabAll) {
      db.Payments.findAll({
        where: Sequelize.or({
          payerId: req.query.grabAll,
        }, {
          paidId: req.query.grabAll,
        }),
      })
        .then(queryData => {
          if (queryData) {
            res.status(200).send(queryData);
          } else {
            res.status(400).send({
              message: 'No Transaction History',
            });
          }
        });
    } else if (req.query.payerId) {
      db.Payments.findAll({
        where: {
          payerId: req.query.payerId,
        },
      })
        .then(queryData => {
          if (queryData) {
            res.status(200).send(queryData);
          } else {
            res.status(400).send({
              message: 'you owe nothing',
            });
          }
        });
    } else if (req.query.paidId) {
      db.Payments.findAll({
        where: {
          paidId: req.query.paidId,
        },
      })
        .then(queryData => {
          if (queryData) {
            res.status(200).send(queryData);
          } else {
            res.status(400).send({
              message: 'you owe nothing',
            });
          }
        });
    } else {
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
    }
  },

  submitPayment: (req, res) => {
    console.log('DELETE //// submitPayment');
    req.session.cookie.path = '/main/payment';
    console.log(req);
    const stripeToken = req.body.id;
    if (!req.body.id) {
      res.status(400).send({ message: `payment entry not found at ${req.body.id}` });
    } else {
      db.Payments.find({
        where: {
          id: req.body.paymentId,
        },
      })
        .then(queryData => {
          queryData.updateAttributes({ paymentDate: new Date().toISOString(), paymentComplete: true });
          db.User.find({
            where: {
              id: req.body.ownerId,
            },
          }).then(userData => {
            const charge = stripe.charges.create({
              amount: req.body.amount,
              currency: 'usd',
              source: stripeToken,
              description: 'Example charge',
              destination: userData.stripeToken,
            },
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log('CHARGE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', charge);
              }
            });
          });
          db.Listings.find({
            where: {
              id: req.body.listingId,
            },
          }).then(listingData => listingData.updateAttributes({ rented: false }));
          res.status(200).send(queryData);
        });
    }
  },

  deletePayment: (req, res) => {
    console.log('PUT //// deletePayment');
    console.log(req.body);
    req.session.cookie.path = '/main/payment';

    if (!req.body.id) {
      res.status(400).send({ message: 'id of a payment must be included to delete' });
    } else {
      db.Payments.destroy({
        where: {
          id: req.body.id,
        },
      })
        .then(() => res.status(200).send({ message: 'deletion succesful' }));
    }
  },
};
