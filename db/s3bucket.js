const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const config = require('../config.js');

AWS.config.update({ accessKeyId: config.AWSAccessKeyId, secretAccessKey: config.AWSSecretKey });

s3.createBucket({ Bucket: 'myBucket' }, () => {
  const params = { Bucket: 'myBucket', Key: 'myKey', Body: 'Hello!' };
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
