
** Variant 1 **

- Frontend : NA
  Backend: API-Gateway/Lambda
  DB: NA

1) Lambda Specifc code is write into handle labmda/index.js along withh service file labmda/services/users.js . This code the uploaded to S3 bucket to become accessible for CloudFormation templates. Handler support Basic REST APIs for GET, POST as HTTP collection actions and GET, PATCH, DELETE as single object actions.
APIs is seems to defined as

    i. GET / -> User List
    ii. GET /:id -> User Details
    iii. POST / -> Add User
    iv. PATCH /:id -> Edit User
    v. DELETE /:id -> Delete User     

2) CloudFormation Script creating following resources .

    i. UserApi -> AWS REST API Resource
    ii. UserApiResource -> Resource/s for UserAPI. This define the main route endpoint ( /users ) for REST API
    iii. UserSingleApiResource  -> Resource/s for UserAPI. This define the child route endpoint ( /users/:id ) for REST API
    iv. UserApiAnyMethod -> API Method (For ANY HTTP Method) It integrated with Lamda function. API also linked to Resource UserApiResource
    v. UserSingleApiAnyMethod -> API Method (For ANY HTTP Method) It integrated with Lamda function. API also linked to Resource UserSingleApiResource
    vi. ApiGatewayCloudWatchLogsRole -> This added IAM role having capability for Invoke Lambda and add cloudwatch logs for API gateway.
    vii. 
    viii. UserApiStage -> API Stage information.. It given API url for test/use.
    ix.UserApiGatewayDeployment -> Deployment for User API Methods
    x. UserFunction -> Lambda Function, Code for lambda function got from AWS S3 object zip file.
    xi. UserFunctionRole ->  This added IAM role having capability for Use AWS Services from the Lambda function inside and add cloudwatch logs for Lambda.


    NOTE: UserApiAnyMethod API Method required lot of other parametes like RequestParameters, MethodResponses, IntegrationResponses which is not found in basic docs of AWS. But these parameters is very much required to integrate and run LAMBDA successfully.
