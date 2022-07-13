VPC Knowledge Base
================================================

1) VPC Subnet is decided upon availabilty zones ( ap-south-1a, ap-south-1b, ap-south-1c  ), So three AZ can have each one their own subnet assigned.

2) We can secure Server setup like below. Create different securty group for Frontend, Backend Server, DB, Cache. So

    - Webserver ( React, Angular, Nginx ) -> Assigned security group allow all incoming traffic

    - Backend -> Assigned security group allow only incoming traffic from frontend servers

    - DB/Cache -> Assigned security group allow only incoming traffic from frontend servers


3) OR We can secure Server setup like below. Put Frontend, Backend Server, DB, Cache in different subnet. So

    - Webserver ( React, Angular, Nginx ) -> Subnet allow all incoming traffic

    - Backend -> Assigned subnet allow only incoming traffic from frontend servers

    - DB/Cache -> Assigned subnet allow only incoming traffic from frontend servers