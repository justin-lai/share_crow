const dbController = require('./dbController.js');
const apiController = require('./apiController.js');
const utilityController = require('./utilityController.js');

module.exports = app => {
  // DB ACCESSING ROUTES
  app.route('/main/signup')
   .post(dbController.signup);

  app.route('/main/login')
    .get(dbController.login);

  app.route('/main/profile')
    .get(dbController.getUser)
    .put(dbController.updateProfile);

  app.route('/main/message')
    .get(dbController.getMessages)
    .post(dbController.postMessages)
    .delete(dbController.deleteMessage);

  app.route('/main/listing')
    .get(dbController.getListings)
    .post(dbController.createListing)
    .put(dbController.changeListing)
    .delete(dbController.returnedListing);

  app.route('/main/listing/unique')
    .get(dbController.getUniqueListing);

  app.route('/main/userReview')
    .get(dbController.getUserReviews)
    .post(dbController.createUserReview)
    .delete(dbController.deleteUserReview);

  app.route('/main/category')
    .get(dbController.getCategory);

  app.route('/main/payment')
    .get(dbController.getPaymentInfo)
    .post(dbController.generatePayment)
    .delete(dbController.submitPayment);

  app.route('/main/imageUpload')
    .get(dbController.getImage)
    .post(dbController.imageUpload)
    .put(dbController.changeImageListing);

  // API ACCESSING ROUTES
  app.route('/api/distanceMatrix')
    .get(apiController.distanceMatrix);

  app.route('/api/sendTextNotification')
    .post(apiController.sendTextNotification);

  // UTILITY ROUTES
  app.get('/isLoggedIn', utilityController.isLoggedIn);

  app.get('/logout', utilityController.logoutUser);

  app.get('/', utilityController.serveIndexFile);
};
