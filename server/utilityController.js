/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {

  loggedInMiddleware: (req, res, next) => {
    if (!req.session.username && req.session.cookie.path !== '/') {
      req.session.cookie.path = '/';
      res.redirect('/');
    } else {
      next();
    }
  },

  isLoggedIn: (req, res) => {
    console.log('loggedin?: ', req.session);
    if (req.session.username) {
      res.status(200).send({
        status: true,
        username: req.session.username,
        userInfo: req.session.userID,
      });
    } else {
      res.status(401).send({ status: false });
    }
  },

  logoutUser: (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  },

  serveIndexFile: (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/index.html'));
  },
};
