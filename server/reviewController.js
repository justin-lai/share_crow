/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable max-len */

const path = require('path');
const db = require(path.resolve(__dirname, '../../db/dbDesign.js'));

module.exports = {
  // //////////////////////////// USER REVIEW FUNCTIONS ////////////////////////////
  // expects lenderId equals req.query.id
  getUserReviews: (req, res) => {
    // returns all entries associated with username and id from database
    console.log('GET //// getUserReviews route');
    req.session.cookie.path = '/main/getUserReview';
    if (!req.query.id) {
      res.status(400).send({ message: 'id was not provided' });
    } else {
      db.Reviews.findAll({
        where: {
          lenderId: req.query.id,
        },
      }).then(queryData => {
        let sum = 0;
        queryData.forEach(data => {
          sum += data.rating;
        });
        res.status(200).send({
          percentage: sum / (queryData.length * 5),
          data: queryData,
          total: sum,
          totalReviews: queryData.length,
        });
      });
    }

    // if (!req.query.lenderId) {
    //   res.status(400).send({ message: 'lenderId not provided' });
    // } else {
    //   db.Reviews.findAll({
    //     where: {
    //       lenderId: req.query.lenderId,
    //     },
    //   })
    //   .then(queryData => {
    //     const results = [];
    //     queryData.forEach(review => results.push(review.dataValues));
    //     if (results.length) {
    //       res.status(200).send(results);
    //     } else {
    //       res.status(400).send({ message: `No user review was found from lenderId# ${req.query.lenderId}` });
    //     }
    //   });
    // }
  },
  // expects reviewerId, lenderId, rating, text
  createUserReview: (req, res) => {
    // add a new review entry in database
    console.log('POST //// createUserReview route');
    req.session.cookie.path = '/main/profile';
    if (!req.body.lenderId || !req.body.reviewerId || !req.body.rating || !req.body.text) {
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
