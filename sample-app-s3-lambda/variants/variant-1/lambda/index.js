exports.handler = async (event) => {
    // TODO implement
    const userService = require('./services/users');
    let results = {};
    console.log(event)

    const validateData = (body) => {
        if(!body.id) {
            throw new Error("Required id");
        }

        if(!body.name) {
            throw new Error("Required name");
        }

        if(body.age === undefined) {
            throw new Error("Required age");
        }

        if(body.dob === undefined) {
            throw new Error("Required dob");
        }
    }

    try {
        switch(event.httpMethod) {
            case "GET":
                if(event.pathParameters && event.pathParameters.id) {
                    results = userService.getUser(Number(event.pathParameters.id));
                } else {
                    results = userService.getUsers();
                }
                
                break;
            case "POST":
                body = event.body;
                try {
                    console.log(body);
                    body = body.replace(/\r?\n|\r/g, '');
                    console.log(body);
                    body = JSON.parse(body);
                    console.log(body);
                } catch (error) {
                    console.log("A1",  error);
                    body = {};
                }
                validateData(body);
                results = userService.addUser(body);
                break;
            case "PATCH":
                body = event.body;
                try {
                    body = body.replace(/\r?\n|\r/g, '');
                    body = JSON.parse(body);
                } catch (error) {
                    console.log("B1",  error);
                }
                validateData(body);
                if(event.pathParameters && event.pathParameters.id) {
                    results = userService.editUser(Number(event.pathParameters.id), body);
                } else {
                    throw new Error("Method not allowed with specific user id");
                }
                
                // results = userService.editUser(body);
                break;
            case "DELETE":
                if(event.pathParameters && event.pathParameters.id) {
                    results = userService.deleteUser(Number(event.pathParameters.id));
                } else {
                    throw new Error("Method not allowed with specific user id");
                }
                
                break;
        }
        let response = {
            statusCode: 200,
            body: JSON.stringify(results),
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,PUT,OPTIONS"
            },
        };
        console.log(results)
        console.log("SUCCESS RESPONSE")
        console.log(response)
        return response;
    
    } catch (error) {
        let response = {
            statusCode: 422,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,PUT,OPTIONS"
            },
            body: JSON.stringify({error:error.message}),
        };
        console.log(error);
        console.log(error.message);
        try {
            console.log(JSON.stringify(error.message));    
        
        } catch (err) {
            console.log(JSON.stringify(error));    
        
        }
        console.log("ERROR RESPONSE")
        console.log(response)
        return response;
    }        

    
};
