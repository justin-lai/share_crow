'use strict';

const dbController = require('./dbController.js');
const apiController = require('./apiController.js');
const utilityController = require('./utilityController.js');

module.exports = function (app) {

  // DB ACCESSING ROUTES
  app.route('/signup')
   .post(dbController.signup);

  app.route('/login')
    .get(dbController.login);
  
  app.route('/profile')
    .get(dbController.getProfile)
    .post(dbController.createProfile)
    .put(dbController.updateProfile);
  
  app.route('/rent')
    .get(dbController.getRentInfo);
  
  app.route('/returnItem')
    .post(dbController.rentalReturn);
  
  app.route('/messages')
    .get(dbController.getMessages)
    .post(dbController.postMessages);
  
  app.route('/listings')
    .get(dbController.getListings)
    .post(dbController.createListing)
    .put(dbController.changeListing);

  // API ACCESSING ROUTES

};
