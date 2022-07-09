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
const folderPath = "public/";

const createObjectOnS3 = async (filePath) =>  {
    const params = {
        Bucket: defaultBucket,
        Key: folderPath + +(new Date()) + '-'+ path.basename(filePath).replace(" ", "-"),
        Body: fs.readFileSync(filePath),
        // ACL: "public-read"
    }

    try {
        /*const results = await s3Client.send(
            new S3Instance.PutObjectCommand(params)
        );*/
        const results = await S3.putObject(params)
        
        return results;
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
    const params = {
        Bucket: defaultBucket,
        Key: +(new Date()) + '-'+ path.basename(filePath).replace(" ", "-"),
        Body: fs.readFileSync(filePath)
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

const deleteObjectFromS3 = async (filePath) =>  {
    const params = {
        Bucket: defaultBucket,
        Key: +(new Date()) + '-'+ path.basename(filePath).replace(" ", "-"),
        Body: fs.readFileSync(filePath)
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

createObjectOnS3("./static/product1.jpeg").then((results) => {
    console.log(results);
}).catch((error) => {
    console.error("Unable to handle exception");
    console.error(error);
});