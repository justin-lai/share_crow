const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));

require('./routes.js')(app, express);

	// eslint-disable-next-line
app.use(express.static(__dirname + '/dev/client/'));

app.listen(3000, () => {
	// eslint-disable-next-line no-console
  console.log('Example app listening on port 3000!');
});

module.exports = app;
