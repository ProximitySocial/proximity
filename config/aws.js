const aws = require('aws-sdk')
const AWS_ACCESS_KEY = process.env.S3_ACCESS_KEY
const AWS_SECRET_KEY = process.env.S3_SECRET_KEY
const S3_BUCKET = process.env.VC_S3_BUCKET


function getS3SignedUrl(dataObj, cb){
  aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY})
  var s3 = new aws.S3()
  var options = {
    Bucket: S3_BUCKET,
    Key: dataObj.fileName,
    Expires: 60,
    ContentType: dataObj.fileType,
    ACL: 'public-read'
  }

  return new Promise((resolve, reject) => {
    s3.getSignedUrl('putObject', options, (err, data) => {
      if (err) {
        reject(err)
        return cb(err)
      }
      dataObj.awsData = data
      dataObj.url = data.slice(0, data.indexOf('?'))
      resolve(dataObj)
      return cb(null, data)
    });
  })
}

module.exports = exports = getS3SignedUrl
