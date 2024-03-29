## DOCKER COMPOSE WAY

```
$ cd aws_training/ecs/backend
$ docker build -t kuldeepkm/sample-backend-app .

$ cd aws_training/ecs/frontend
$ docker build -t kuldeepkm/sample-frontend-app .

$ cd aws_training/ecs
$ docker tag kuldeepkm/sample-backend-app kuldeepkm/sample-backend-app
$ docker push kuldeepkm/sample-backend-app

$ docker tag kuldeepkm/sample-frontend-app kuldeepkm/sample-frontend-app
$ docker push kuldeepkm/sample-frontend-app

$ sudo docker-compose up -d

```

## ECS WAY

1. Create Repo on ECR ( elastic container repository ). This will give the repo URL like `782326730434.dkr.ecr.ap-south-1.amazonaws.com/trainingrepo`

2. Run following steps to build and upload docker containers in repository.

```
$ cd aws_training/ecs/backend
$ docker build -t kuldeepkm/sample-backend-app .

$ cd aws_training/ecs/frontend
$ docker build -t kuldeepkm/sample-frontend-app .

$ cd aws_training/ecs
$ docker tag kuldeepkm/sample-backend-app 782326730434.dkr.ecr.ap-south-1.amazonaws.com/trainingrepo:backend
$ docker push 782326730434.dkr.ecr.ap-south-1.amazonaws.com/trainingrepo:backend

$ docker tag mongo:4.4.15 782326730434.dkr.ecr.ap-south-1.amazonaws.com/trainingrepo:db
$ docker push 782326730434.dkr.ecr.ap-south-1.amazonaws.com/trainingrepo:db

$ docker build -t kuldeepkm/sample-frontend-app .
$ docker tag kuldeepkm/sample-frontend-app 782326730434.dkr.ecr.ap-south-1.amazonaws.com/trainingrepo:frontend
$ docker push 782326730434.dkr.ecr.ap-south-1.amazonaws.com/trainingrepo:frontend

```

3. Create cluster on ECS, If chosen type EC2, This will lanuch EC2 Server. Choose following settings accordingly  

        1. Provision Model -> On Demand 
        2. EC2 instance type -> T2micro ( for starter )
        3. Num instances -> 1
        4. VPC -> recommended new VPC, setup subnet and security groups 

4. Create Task Definition/s. 

        1.  Network Mode
                None option mean container will be in accessible from other container. Good for run  isolated functionality.
                Host option mean container will given host machine ( EC2 ) network ( VPC, Subnet, SG, IP)
                Bridge option will work like normal docker architecture where port mapping can be done on container level. But AWS security (security group & ENI) is still applied on host EC2 cluster. 
                awsvpc option allow to attach dedicated VPC and security group functionality to container itself. So firewall security control on container level.  

        2. Task Memory -> Setup in form as it should less than Ec2 memory. ( Less than 1GB in case t2micro, ex. 800 MB).
        3. Task CPU ->  Setup in form as it should less than Ec2 CPU. ( Less than 1vCPU/1000 CPU units in case t2micro, ex. 800 CPU Unit).
        4. Add containers
            1. Image is ECR image URL like `782326730434.dkr.ecr.ap-south-1.amazonaws.com/trainingrepo:backend`
            2. Memory limit should be setup in form, that sum of all container memory is lesser than assigned Task memory in second step above.
            3. Add possible port mapping ( source and target port ) in case of Network mode is bridge, In all other network modes, We can only defined port which need to exposed. But not target port number.
            3. CPU limit should be setup in form, that sum of all container CPU is lesser than assigned Task CPU in third step above.
            4. Environment variable and their values can be set here.

5. Create Task, This will launch containers in cluster setting depends upon task defintion.

        1. Choose specific task defintion ( latest version is default selected )   
        2. Cluster VPC details in case of network mode is awsvpc
        3. Inter container communcation is not achieved through Task as their is no easy way to know that how they can communicate through private IPs instead of public EC2 IP . Private IPs only assigned after Task is run, So it can not be set through Environment variables, Example DB container DSN passed to App container as Env Variables. Did not explored the cloudformation way yet.  Service is recommended in this case.
        4. Any mistakes done in task defintion can results into fainure of task  creation  like Resource:Memory, Resourec:ENI errors. 

6. Service.

    #### Without inter-container commuincation
    
        1. Setup both task definition ( App and DB ) in bridge mode.
        2. Create Service for DB, Select latest DB task definition version. Do not choose load balancer OR service discovery. Leave all other options as default.
        3. Create Service for App, Select latest App task definition version. Do not choose load balancer OR service discovery. Leave all other options as default.  
    
    #### With inter-container communication
    
        1. Setup DB task definition in awsvpc mode. That is required.
        2. Create Service for DB, Select latest DB task definition version. Do not choose load balancer.
        3. Select service discovery. Enter options like namespace, service discovery name. Select A Record Type.
        4. Verify in AWS Route 53 If A Record is created for service discovery. It should like NAMESPACE.SERVICE-DISCOVERY-NAME. example if namespace is `sampleapp-db-srv-dv` and service discovery name is `sampleapp.containerdb` then Entry in Route 53 would be like sampleapp-db-srv-dv.sampleapp.containerdb. This is available as domain. in our VPC, So can be used as DB DSN .
        5. Setup App task definition in bridge mode, set SOURCE PORT as 300 and DEST PORT as 0,  update DSN as above route 53 entry like `mongodb://sampleapp-db-srv-dv.sampleapp.containerdb:27017/testdb` .
        6. Create Service for App, Select latest App task definition version. Do not choose load balancer OR service discovery. Leave all other options as default.  
        7. Enable following SG Rule
            a. In Security group link to DB service : Enable DB access for container by provide 27017 port access for SG relate to cluster itself.
            b. In Security group link to Cluster enable PORT access for newly generated PORT in service task ex. 49155 accessible to public 0.0.0.0/0
            c. Optionally In Security group link to Cluster enable SSH 22 PORT access to accessible to your local system's public IP for SSH and debug  

    #### With inter-container communication plus load balancer

        1. Setup load balancer with App Service. Setup Listener /  


### CloudFormation : With inter-container communication plus load balancer 

##### With FAGATAE

    1. Four cloudformation templates is needed
        1. vpc.yml for Setup VPC and related entities ( except security groups which will be set in related objects in other ymls )
        2. iam.yml for setup ECS execution role 
        3. cluster.yml for 
            - Cluster setup with FARGATE
            - Load Balancer
            - Load Balancer -> Listener
            - Load Balancer -> Target Group ( VPC )
            - Load Balancer -> security groups for add public HTTP access
            - Log Group
            - Security Group for App container
            - Security Group for DB container
        4. container.yml
            - App Task Definition setup with FARGATE
            - App Service setup with FARGATE
            - Listener Rule for path condition to redirect request from LB to app container
            - DB Task Definition setup with FARGATE
            - DB Service setup with FARGATE
            - Private DNS Namespace for Service Discovery 
            - Service Discovery for setup Route 53 based DNS record
                  
    Note: Outputs from each container is used in Other containers using function  `!ImportValue
    `
##### With ECS

     ***Not Implemented Yet***

     https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/quickref-ecs.html


