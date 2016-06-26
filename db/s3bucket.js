const AWS = require('aws-sdk');
const fs = require('fs');
const config = require('../config.js');
const image = fs.readFileSync('./photos/Char-Broil-Four-burner-Kettle-Grill-P15074099.jpg');

AWS.config.update({
  accessKeyId: config.AWSAccessKeyId,
  secretAccessKey: config.AWSSecretKey,
});
const s3 = new AWS.S3();


s3.createBucket({ Bucket: 'sharecrowimages' }, () => {
  const params = {
    Bucket: 'sharecrow',
    Key: 'grill2.jpg',
    ACL: 'public-read',
    Body: image,
    ContentType: 'image/jpeg',
  };

  s3.putObject(params, (err, data) => {
    if (err) {
      //eslint-disable-next-line
      console.log(err);
    } else {
      //eslint-disable-next-line
      console.log("Successfully uploaded data to myBucket/myKey", data);
    }
  });
});
