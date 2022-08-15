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
