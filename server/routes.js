var controller = require('./controller.js');

module.exports = function (app, express) {
  app.get('/q', controller.hello);
  app.post('/signin', controller.signin);
};
