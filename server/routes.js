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
  
  app.route('/messages')
    .get(dbController.getMessages)
    .post(dbController.postMessages);
  
  app.route('/listings')
    .get(dbController.getListings)
    .post(dbController.createListing)
    .put(dbController.changeListing)
    .delete(dbController.returnListing);

  app.route('/userReviews')
    .get(dbController.getUserReviews)
    .post(dbController.createUserReview)
    .delete(dbController.deleteUserReview);

  // API ACCESSING ROUTES
  app.route('/distanceMatrix')
    .get(apiController.distanceMatrix);

  app.route('/sendTextNotification')
    .post(apiController.sendTextNotification);

  // UTILITY ROUTES

};
