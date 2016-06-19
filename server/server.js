const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

require('./routes.js')(app, express);

app.use(express.static('dev/client'));
app.use(express.static('client/assets'));

app.listen(3000, () => {
  //eslint-disable-next-line
  console.log('Listening on port 3000!');
});

module.exports = app;
