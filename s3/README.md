AWS S3
============================

S3 Functionality are set upon following IAM Permissions for Creating, Fetching and Deleting an object.

- PutObject
- GetObject
- GetObjectAcl
- GetObjectAttributes
- GetObjectVersion
- DeleteObject

Steps to Setup S3
1) Create Bucket in S3
2) Creare Policy for Read Write S3 Object Pemrmissions ( below ), List Bucket policy is for Get listing  of objects in bucket. 

```

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "S3ReadWriteObjectCustom",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::BUCKETNAME/*"
        },
        {
            "Sid": "S3LisBucketCustom",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::BUCKETNAME"
        }
    ]
}

```

3) Assign policy to IAM user with service account ( for node js app ) with policy   



While uploaded object can be get through Get Object API without any extra access. But if needed to public access download via URL. Then two steps needed

1. Turn off Bucket -> Block Public Access .
2. Add some policy in Bucket Policy. Like below given public access to objects in public folder in bucket.

```

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::BUCKETNAME/public/*"
        }
    ]
}

```

