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
    if (req.session.username) {
      res.status(200).send(true);
    } else {
      res.status(400).send(false);
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
