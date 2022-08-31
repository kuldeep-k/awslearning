aws ecr create-repository --repository-name sampleapp-repo

aws ecr describe-repositories --repository-name sampleapp-repo

aws cloudformation create-stack --stack-name sample-app-ecs-vpc --template-body file://$PWD/vpc.yml

aws cloudformation delete-stack --stack-name sample-app-ecs-vpc

aws cloudformation create-stack --stack-name sample-app-ecs-vpc --capabilities CAPABILITY_IAM --template-body file://$PWD/iam.yml 