const dbController = require('./dbController.js');
const apiController = require('./apiController.js');
const path = require('path');
// const utilityController = require('./utilityController.js');

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
    .post(dbController.postMessages);

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

  // API ACCESSING ROUTES
  app.route('/api/distanceMatrix')
    .get(apiController.distanceMatrix);

  app.route('/api/sendTextNotification')
    .post(apiController.sendTextNotification);

  // UTILITY ROUTES
  // eslint-disable-next-line

  app.get('/isLoggedIn', (req, res) => {
    if (req.session.username) {
      res.status(200).send(true);
    } else {
      res.status(500).send(false);
    }
  });

  app.get('/logout', (req, res) => {
    console.log('12312312312321', req.session);
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/index.html'));
  });
};
