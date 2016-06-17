const api_keys = require('../config.js');
const baseLink = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=';
const fetch = require('node-fetch');

module.exports = {
  // find the distance between two points, given 2 lat,long pairs
  // returns miles and eta time away driving
  distanceMatrix(req, res) => {
    const lat1 = req.body.lat1;
    const long1 = req.body.long1;
    const lat2 = req.body.lat2;
    const long2 = req.body.long2;
    fetch(baseLink + lat1 + ',' + lat2 + '&destinations=' + lat2 + ',' + long2 + '&key=' + api_keys.GOOGLEMAP_API_KEY)
      .then( response => response.json())
        .then( responseData => {
          let obj = {
            miles: responseData.rows[0].elements[0].distance.text,
            time: responseData.rows[0].elements[0].duration.text,
          };
          res.status(200).send(obj);
        });
  },
  
};