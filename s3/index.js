const S3Instance  = require("@aws-sdk/client-s3");
require('dotenv').config();
const path = require('path');
const fs = require('fs');

// Set the AWS Region.
const REGION = process.env.defaultRegion || "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Instance.S3Client({ region: REGION });
const S3 = new S3Instance.S3({ region: REGION });

const defaultBucket = process.env.defaultBucket || "default-bucket";
const folderPath = process.env.awsS3Folder || "";
const s3Url = process.env.awsS3Host || "";
const createObjectOnS3 = async (filePath) =>  {
    let key = folderPath + +(new Date()) + '-'+ path.basename(filePath).replace(" ", "-");
    const params = {
        Bucket: defaultBucket,
        Key: key,
        Body: fs.readFileSync(filePath),
        // ACL: "public-read"
    }

    try {
        /*const results = await s3Client.send(
            new S3Instance.PutObjectCommand(params)
        );*/
        const results = await S3.putObject(params)
        
        return { results, fileUrl: s3Url + '/' + key, key: key };
    } catch (error) {
        console.error("Unable to upload on S3");
        console.error(error);
    }
}

const listObjectFromS3 = async () =>  {
    const params = {
        Bucket: defaultBucket,
        Key: +(new Date()) + '-'+ path.basename(filePath).replace(" ", "-"),
        Body: fs.readFileSync(filePath),
        
    }

    try {
        const results = s3Client.send(
            new S3Instance.PutObjectCommand(params)
        );
        return results;
    } catch (error) {
        console.error("Unable to upload on S3");
        console.error(error);
    }
}

const getObjectFromS3 = async (filePath) =>  {
    let key = filePath;
    const params = {
        Bucket: defaultBucket,
        Key: key
    }

    try {
        return new Promise( async (resolve,reject) => {
            const response = await S3.getObject(params);
            // console.log(results);
            let responseDataChunks = []

            // Handle an error while streaming the response body
            response.Body.once('error', err => reject(err))
        
            // Attach a 'data' listener to add the chunks of data to our array
            // Each chunk is a Buffer instance
            response.Body.on('data', chunk => responseDataChunks.push(chunk))
        
            // Once the stream has no more data, join the chunks into a string and return the string
            response.Body.once('end', () => resolve(responseDataChunks.join('')))
            return responseDataChunks;
        })
        
    } catch (error) {
        console.error("Unable to get from S3");
        console.error(error);
    }
}

const deleteObjectFromS3 = async (filePath) =>  {
    let key = filePath;
    const params = {
        Bucket: defaultBucket,
        Key: key
    }

    try {
        const results = await S3.deleteObject(params)
        console.log(results)
        return results;
    } catch (error) {
        console.error("Unable to delete from S3");
        console.error(error);
    }
}

let fileKey = null;
createObjectOnS3("./static/product1.jpeg")
.then((results) => {
    console.log(results);
    return results;
})
.then((results) => {
    fileKey = results.key;
    return getObjectFromS3(results.key);
})
.then((results) => {
    /// console.log(Buffer.from(results.Body.toString()));
    console.log(results);
    return results;
}).then((results) => {
    return deleteObjectFromS3(fileKey);
}).catch((error) => {
    console.error("Unable to handle exception");
    console.error(error);
});