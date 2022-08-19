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
            Bridge option will work like normal docker architecture where port mapping and other can be done on container level.
            awsvpc option allow to attach dedeicated VPC and related functionality to container. 

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

  
Keep remvoing older revisions, VPC, SG and Task Defintions, they cann results into task creation error. 
Their is few options for setup multi container architecture
Single task definition with multiple container. 
Separate task defintion for each container





