const dbController = require('./dbController.js');
const apiController = require('./apiController.js');
const utilityController = require('./utilityController.js');
const imageController = require('./imageController.js');
const messagesController = require('./messagesController.js');
const listingsController = require('./listingsController.js');
const reviewController = require('./reviewController.js');
const paymentsController = require('./paymentsController.js');

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
    .get(messagesController.getMessages)
    .post(messagesController.postMessages)
    .delete(messagesController.deleteMessage);

  app.route('/main/listing')
    .get(listingsController.getListings)
    .post(listingsController.createListing)
    .put(listingsController.changeListing)
    .delete(listingsController.returnedListing);

  app.route('/main/listing/unique')
    .get(listingsController.getUniqueListing);

  app.route('/main/userReview')
    .get(reviewController.getUserReviews)
    .post(reviewController.createUserReview)
    .delete(reviewController.deleteUserReview);

  app.route('/main/category')
    .get(dbController.getCategory);

  app.route('/main/payment')
    .get(paymentsController.getPaymentInfo)
    .post(paymentsController.generatePayment)
    .delete(paymentsController.submitPayment);

  app.route('/main/imageUpload')
    .get(imageController.getImage)
    .post(imageController.imageUpload)
    .put(imageController.changeImageListing)
    .delete(imageController.deleteImage);

  // API ACCESSING ROUTES
  app.route('/api/distanceMatrix')
    .get(apiController.distanceMatrix);

  app.route('/api/sendTextNotification')
    .post(apiController.sendTextNotification);

  app.route('/authorize')
    .get(apiController.stripeOAuth);

  app.route('/oauth/callback')
    .get(apiController.stripeCallback);

  // UTILITY ROUTES
  app.get('/isLoggedIn', utilityController.isLoggedIn);

  app.get('/logout', utilityController.logoutUser);

  app.get('/', utilityController.serveIndexFile);
};
