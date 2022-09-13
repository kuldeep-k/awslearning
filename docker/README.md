# DOCKER 


Four Major things

- Dockerfile 
    Used to define docker build and deploy steps for single application
    Using steps we can used multiple project but only one is as final project. Other will be intermediate images

- Docker compose
    Build and deploy basis upon instructions in docker-compose.yml
    Can use dockerfile to build and deploy ( ex backend/frontend ) OR Can use docker image directly ( ex mongo/redis from docker hub ) 
    Enable multiple services deployment in a single run ( Ex. Frontend, Backend, DB, Cache Services )
    Not suppprt the multiple container nodes for single node.       

    Can use folllowing commands

    ```
        $ docker-compose build
        $ docker-compose up
        $ docker-compose down
        $ docker-compose up -d
     ```


- Docker Swarm

    Docker Swarm is container orchestration tool . Following swarm commands can be used to creare searm cluster

    Following command initiare swarm on mamager node ( server/node/machine )
    ```    
    $ docker swarm init

    


- Docker Stack Deploy

