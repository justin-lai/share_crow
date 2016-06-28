const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const utilityController = require('./utilityController.js');

app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379,
    db: 1,
    pass: 'sharecrow',
  }),
  secret: 'C44THY',
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(utilityController.loggedInMiddleware);

require('./routes.js')(app, express);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('dev/client'));
app.use(express.static('client/assets'));
app.use(express.static('client/assets/images'));
app.use(express.static('client/assets/styles'));

app.listen(3000, () => {
  //eslint-disable-next-line
  console.log('Listening on port 3000!');
});

module.exports = app;
