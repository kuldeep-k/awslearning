## Kubernetes

This is kubernetes implemenatation of same docker project. 

Following are steps to setup application on kubernetes using minikube. ( Cloud option like AWS in future with EKS ) . 

1. Start minikube ( I used kvm on ubuntu machine, other options I used are docker  ). This will create cluster environment on local machine. It would Virtualization to get cluster based environemnt.  

    ```
    $ minikube start --driver=kvm
    ```

2. We can stop or delete minikube using commands

    ```
    $ minikube stop 
    $ minikube delete 
    ```
3. Write config files ( deployment, service and configmaps ). 

    1. secrets.yml : File is used to setup secret data like passwords
    2. db-deployment.yml : File is used to create one or more DB deployments  ( Mongo DB ) 
    3. db-service.yml : File is used to create DB Internal Load balancer ( Mongo DB )
    4. configmap.yml: File is used to create config map for sharable configuration across containers ( like DB DSN in App )
    5. backend-deployment.yml : File is used to create one or more application deployments 
    6. backend-service.yml : File is used to create App external load balancer service. 
    7. ingress.yml : File is used to expose service to actual domain/IP instead to use port based URL ;  

    #### secrets.yml


    #### db-deployment.yml

        This will create DB deployments. As this is set replicas set as 2, So new pods ( containes ) will be created . 
        TODO: Mongo User/Pass should be set through secrets yml.
        Commands to create and verify 

        ```
        $ kubectl apply -f ./db-deployment.yml
        $ kubectl get deployment
        $ kubectl describe deployment db-deployment         # Get information about deployment, "db-deployment" is name from previous command
        $ kubectl get pods         
        $ kubectl describe pod db-deployment-aaaaaaa-bbbbb   # Get information about pod, "db-deployment-aaaaaaa-bbbbb" is name from previous command
        # kubectl logs db-deployment-aaaaaaa-bbbbb              # Get container logs for specified pod    
        ```

    #### db-service.yml

        This will create internal service for DB. So all DB container can be accessible through single endpoint from Applications.  
        Commands to create and verify 

        ```
        $ kubectl apply -f ./db-service.yml
        $ kubectl get service
        $ kubectl describe service db-service         # Get information about service, "db-service" is name from previous command
            
        ```


    #### configmap.yml

        This will used to set and expose DB HOST ( from DB Service ) to Backend Application

        Commands to create and verify 

        ```
        $ kubectl apply -f ./configmap.yml
        ```

    #### backend-deployment.yml

        This will create Backend API deployments. As this is set replicas set as 2, So new pods ( containes ) will be created . 
        This will utilize config map for DB DSN Url and other params .

        Commands to create and verify 

        ```
        $ kubectl apply -f ./backend-deployment.yml
        $ kubectl get deployment
        $ kubectl describe deployment backend-deployment         # Get information about deployment, "backend-deployment" is name from previous command
        $ kubectl get pods         
        $ kubectl describe pod backend-deployment-aaaaaaa-bbbbb   # Get information about pod, "backend-deployment-aaaaaaa-bbbbb" is name from previous command
        # kubectl logs backend-deployment-aaaaaaa-bbbbb              # Get container logs for specified pod    
        ```


    #### backend-service.yml

        This will create external service for Backend. So all Application container can be accessible through single HTTP endpoint ( effectively work as Application Load Balancer ).  

        Commands to create and verify 

        ```
        $ kubectl apply -f ./backend-service.yml
        $ kubectl get service
        $ kubectl describe service backend-service         # Get information about service, "backend-service" is name from previous command
            
        ```


    #### ingress.yml

