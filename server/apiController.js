/* eslint no-unused-vars: ["error", { "args": "none" }] */
const apiKeys = require('../config.js');
const twilio = require('twilio');
const client = new twilio.RestClient(apiKeys.twilioKeys.accountSid, apiKeys.twilioKeys.authToken);
const baseLink = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=';
const fetch = require('node-fetch');

module.exports = {
  // find the distance between two points, given 2 lat,long pairs
  // returns miles and eta time away driving
  distanceMatrix: (req, res) => {
    const lat1 = req.query.lat1;
    const long1 = req.query.long1;
    const lat2 = req.query.lat2;
    const long2 = req.query.long2;
    /*eslint-disable */
    fetch(baseLink + lat1 + ',' + long1 + '&destinations=' + lat2 + ',' + long2 + '&key=' + apiKeys.GOOGLEMAP_API_KEY)
      /*eslint-enable */
      .then(response => response.json())
        .then(responseData => {
          const obj = {
            miles: responseData.rows[0].elements[0].distance.text,
            time: responseData.rows[0].elements[0].duration.text,
          };
          res.status(200).send(obj);
        });
  },

  sendTextNotification: (req, res) => {
    client.sendSms({
      to: '+1 ${req.body.phoneNumber}',
      from: '+19259058241',
      body: 'From ${req.body.name}: ${req.body.message}',
    }, (error, receiptMessage) => {
      if (!error) {
        // eslint-disable-next-line no-console
        console.log('Message sent on: ${receiptMessage.dateCreated}');
      } else {
        // eslint-disable-next-line no-console
        console.log('Oops! There was an error.');
      }
    });
    res.sendStatus(200);
  },

  stripeOAuth: (req, res) => {
  // Redirect to Stripe /oauth/authorize endpoint
    res.redirect(apiKeys.AUTHORIZE_URI);
    // get('/oauth/callback', (req, res) => {

    const code = req.query.code;

  // Make /oauth/token endpoint POST request
    req.post({
      url: apiKeys.TOKEN_URI,
      form: {
        grant_type: 'authorization_code',
        client_id: apiKeys.CLIENT_ID,
        code,
        client_secret: apiKeys.API_KEY,
      },
    }, (err, r, body) => {
      const accessToken = JSON.parse(body).access_token;
      res.send({ 'Your Token': accessToken });
    });
    // });
  },

};
