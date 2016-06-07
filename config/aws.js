const aws = require('aws-sdk')
const AWS_ACCESS_KEY = process.env.S3_ACCESS_KEY
const AWS_SECRET_KEY = process.env.S3_SECRET_KEY
const S3_BUCKET = process.env.VC_S3_BUCKET


function getS3SignedUrl(dataObj, cb){
  console.log('Inside getS3SignedUrl');
  console.log(dataObj);
  aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY})
  var s3 = new aws.S3()
  var options = {
    Bucket: S3_BUCKET,
    Key: dataObj.fileName,
    Expires: 60000,
    ContentType: dataObj.fileType,
    ACL: 'public-read'
  }

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', options, (err, data) => {
      if (err) {
        console.log('error of s3.getSignedUrl');
        reject(err)
        return cb(err)
      }
      console.log('Inside s3.getSignedUrl');
      dataObj.awsData = data
      // dataObj.url = data.slice(0, data.indexOf('?'))
      dataObj.url = "https://s3-us-west-2.amazonaws.com/vivacity1/" + dataObj.fileName
      console.log('inside aws');
      console.log(dataObj.url);
      resolve(dataObj)
      return cb(null, data)
    });
  })
}

module.exports = exports = getS3SignedUrl
