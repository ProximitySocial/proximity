const aws = require('aws-sdk')
const AWS_ACCESS_KEY = process.env.CL_S3_ACCESS_KEY
const AWS_SECRET_KEY = process.env.CL_S3_SECRET_KEY
console.log(AWS_SECRET_KEY)
console.log(AWS_SECRET_KEY)
console.log(AWS_SECRET_KEY)
console.log(AWS_SECRET_KEY)
const S3_BUCKET = process.env.VC_S3_BUCKET


function getS3SignedUrl(userData, res, done){
  aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY})
  var s3 = new aws.S3()
  var options = {
    Bucket: S3_BUCKET,
    Key: userData.fileName,   //// file name
    Expires: 60,
    ContentType: userData.fileType,
    ACL: 'public-read'
  }

  // return new Promise((resolve,reject) => {
  //   s3.getSignedUrl('putObject', options, (err, data) => {
  //     if (err) {
  //       reject(err)
  //       return cb(err)
  //     }
  //     userData.awsData = data
  //     userData.pic = 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + userData.fileName
  //     resolve(userData);
  //     return cb(null, data)
  //   });
  // })

  s3.getSignedUrl('putObject', options, (err, data) => {
    if (err) return res.send('Error with S3')
    userData.awsData = data
    userData.pic = 'https://s3.amazonaws.com/' + S3_BUCKET + '/' + userData.fileName
    done(userData, res)
  })
}

module.exports = exports = getS3SignedUrl
