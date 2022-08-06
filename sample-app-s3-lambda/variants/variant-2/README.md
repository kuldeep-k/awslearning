
## Variant 2

- Frontend : NONE
- Backend: API-Gateway/Lambda
- DB: Document DB

1) Lambda Specifc code is write into handle labmda/index.js along withh service file labmda/services/users.js . Code used Document DB as DB end. This code the uploaded to S3 bucket to become accessible for CloudFormation templates. Handler support Basic REST APIs for GET, POST as HTTP collection actions and GET, PATCH, DELETE as single object actions.
APIs is seems to defined as

```

	GET /            -> User List

	GET /:id         -> User Details

	POST /           -> Add User

	PATCH /:id       -> Edit User

	DELETE /:id      -> Delete User

```

2) CloudFormation Script creating following resources .

	1. UserApi:  AWS REST API Resource
	2. UserApiResource:  Resource/s for UserAPI. This define the main route endpoint ( /users ) for REST API
	3. UserSingleApiResource:  Resource/s for UserAPI. This define the child route endpoint ( /users/:id ) for REST API
	4. UserApiAnyMethod:  API Method (For ANY HTTP Method) It integrated with Lamda function. API also linked to Resource UserApiResource
	5. UserSingleApiAnyMethod:  API Method (For ANY HTTP Method) It integrated with Lamda function. API also linked to Resource UserSingleApiResource
	6. UserApiOptionsMethod:  API Method (For OPTION HTTP Method) It setup the Preflight Opton request for all APIs. It also set the required CORS headers.
	7. ApiGatewayCloudWatchLogsRole:  This added IAM role having capability to use API gateway and add cloudwatch logs for API gateway.
	8. UserLambdaInvokePermission:  Lambda Invoke permission provided to API gateway.
	9. UserApiStage:  API Stage information.. It given API url for test/use.
	10. UserApiGatewayDeployment:  Deployment for User API Methods
	11. UserFunction:  Lambda Function, Code for lambda function got from AWS S3 object zip file.
	12. UserFunctionRole:   This added IAM role having capability for Use AWS Services from the Lambda function inside and add cloudwatch logs for Lambda.
	13. ApiGatewayAccount:  Needed to attach role for API gateway ApiGatewayCloudWatchLogsRole, 


NOTE:   **UserApiAnyMethod API Method required lot of other parametes like RequestParameters, MethodResponses, IntegrationResponses which is not found in basic docs of AWS. But these parameters is very much required to integrate and run LAMBDA successfully.**
NOTE: **CORS header correctly need to set in OPTION API method and Lambda Response ( in code ). Otherwise APIs will not work with any frontend application while will give CORS errors.** 


3) In Addition to above Variant 1 Items, variant 2 also setup the Documenr DB ( MongoDB Compatible )

	1. DatabaseDocumentDBCluster: Document DB Cluster with cluster configurations like VPC/Subnet/DB Engine/DB Port/DB Credentials, Credentials used througb Clioud formation parameters.
	2. DatabaseDocumentDBInstance: Document DB Instance with instance configurations like Instance type ( Used T3 medium for now )

	Also 

	1. Lambda code changes for Mongoose integration
	2. Lambda setting changes for environment settings ( DSN for Document DB Cluster, TLS )
	3. Lambda setting changes for VPC. It needed to call AWS Document Db as both should be in same VPC/Subnet, So added Subnet, Security Group and increased connection time
	4. Lambda setting changes for add extra permission for Network interfaces
	

### Custom VPC Version

In this version New VPC, Subnet, Internet Gaetwaym Route Tables  and Security Groups are created. And resources ( Lmabda and Document DB ) placed in this VPC instead of using default VPC

New resources created :

1. MyCustomVPC: Custom VPC
2. MyCustomVPCInternetGateway: Custom Internet Gateway 
3. MyCustomVPCAttachGateway: To attach VPC and Internet Gateway
4. MyCustomVPCSubnet1: Public Subnet 1 
5. MyCustomVPCSubnet2: Public Subnet 2
6. MyCustomVPCRouteTable: Route table linked with Internet gateway and subnet 1 and 2
7. MyCustomVPCRoute1: Route defining above route table link with Internet gateway 
8. MyCustomVPCRouteSubnetAssoc1: Subnet 1 link with Route Table
9. MyCustomVPCRouteSubnetAssoc2: Subnet 2 link with Route Table
10. MyCustomVPCLambdaSecurityGroup: Security Group of lambda allowing DB connection to Document DB ( However main reason is  able to create Lambda SG to DB SG access role in DB SG  ). As name suggests, this SG is link with Lambda. 
11. MyCustomVPCDBSecurityGroup: Security Group of DB allowing connection from Lambda SG group. As name suggests, this SG is link with Document DB. 
12. DatabaseDocumentDBSubnetGroup: As document DB support link to Subnet group. This need to created to define document DB subnet group and VPC.  

Changed Impacted on Existing resources

1. UserFunction:  Attached updated Subnet and SG group.
2. DatabaseDocumentDBCluster:   Attached updated Subnet group and SG group..

