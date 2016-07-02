/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable max-len */

const config = require('../config');
const AWS = require('aws-sdk');
const path = require('path');
const db = require(path.resolve(__dirname, '../../db/dbDesign.js'));
AWS.config.accessKeyId = config.AWS_ACCESSKEY;
AWS.config.secretAccessKey = config.AWS_SECRETKEY;
AWS.config.region = config.AWS_REGION;


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
        .then(responseData => {
          if (req.body.listingId) {
            responseData.updateAttributes({ ListingId: req.body.listingId });
          } else if (req.body.userId) {
            responseData.updateAttributes({ UserId: req.body.userId });
          }
          console.log('RESPONSE DATA---------:', responseData.dataValues);
          return responseData.dataValues;
        })
        .then(newImageListing => res.status(200).send(newImageListing));
    }
  },

  imageUpload: (req, res) => {
    console.log('POST //// imageUpload route');
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
            image: `https://s3-us-west-2.amazonaws.com/sharecrow/${filename}`,
          })
            .then(response => res.status(200).send(response.dataValues));
        }
      });
    }
  },

  deleteImage: (req, res) => {
    console.log('DELETE //// deleteImage route');
    db.Images.destroy({
      where: {
        UserId: req.body.userId,
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
