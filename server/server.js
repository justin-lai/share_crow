var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({}));

require('./routes.js')(app, express);

app.listen(3000, function (err) {
  if (err) {
    console.log(err);
  }
  console.log('Example app listening on port 3000!');
});

module.exports = app;