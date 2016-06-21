const AWS = require('aws-sdk');
const config = require('../config.js')
AWS.config.region = 'us-west-2';

AWS.config.accessKeyId = config.AWSAccessKeyId;
AWS.config.secretAccessKey = config.AWSSecretKey;

const s3bucket = new AWS.S3({ params: { Bucket: 'sharecrow' } });
s3bucket.createBucket(() => {
  const params = { Key: 'myKey', Body: 'Hello!' };
  s3bucket.upload(params, (err, data) => {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log("Successfully uploaded data to myBucket/myKey");
    }
  });
});
