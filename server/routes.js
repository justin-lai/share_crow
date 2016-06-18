const dbController = require('./dbController.js');
const apiController = require('./apiController.js');
const path = require('path');
// const utilityController = require('./utilityController.js');

module.exports = app => {
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
    .delete(dbController.returnedListing);

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
  // eslint-disable-next-line
  app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../../client/index.html')));
};
