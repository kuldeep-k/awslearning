exports.handler = async (event) => {
    // TODO implement
    const userService = require('./services/users');
    let results = {};
    console.log(event)
    try {
        switch(event.httpMethod) {
            case "GET":
                if(event.pathParameters && event.pathParameters.userId) {
                    results = userService.getUser(event.pathParameters.userId);
                } else {
                    results = userService.getUsers();
                }
                
                break;
            case "POST":
                body = {};
                try {
                    body = JSON.parse(event.body);
                } catch (error) {
                    body = {};
                }
                results = userService.addUser(body);
                break;
            case "PATCH":
                body = {};
                try {
                    body = JSON.parse(event.body);
                } catch (error) {
    
                }
                if(event.pathParameters && event.pathParameters.userId) {
                    results = userService.editUser(event.pathParameters.userId, body);
                } else {
                    throw new Error("Method not allowed with specific user id");
                }
                
                // results = userService.editUser(body);
                break;
            case "DELETE":
                if(event.pathParameters && event.pathParameters.userId) {
                    results = userService.deleteUser(event.pathParameters.userId);
                } else {
                    throw new Error("Method not allowed with specific user id");
                }
                
                break;
        }
        let response = {
            statusCode: 200,
            body: JSON.stringify(results),
            // body: results
        };
        console.log(results)
        console.log("SUCCESS RESPONSE")
        console.log(response)
        return response;
    
    } catch (error) {
        let response = {
            statusCode: 422,
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
