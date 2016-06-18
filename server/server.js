const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

require('./routes.js')(app, express);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('dev/client'));
app.use(express.static('client/assets'));

app.listen(3000, () => {
  //eslint-disable-next-line
  console.log('Listening on port 3000!');
});

module.exports = app;
