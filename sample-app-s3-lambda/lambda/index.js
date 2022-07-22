exports.handler = async (event) => {
    // TODO implement
    const userService = require('./services/users');
    let results = {};
    console.log(event)
        
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
                body = JSON.stringify(event.body);
            } catch (error) {

            }
            results = userService.addUser(body);
            break;
        case "PATCH":
            body = {};
            try {
                body = JSON.stringify(event.body);
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
    const response = {
        statusCode: 200,
        body: JSON.stringify(results),
    };
    return response;
};
