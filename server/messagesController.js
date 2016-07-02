/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable max-len */
const path = require('path');
const db = require(path.resolve(__dirname, '../../db/dbDesign.js'));

module.exports = {
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
          res.status(200).send({ message: `no messages were found from user: ${req.query.senderId}` });
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
        subject: req.body.subject,
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
};
