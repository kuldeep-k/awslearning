const userService = require('./services/users');

const execute = async () => {
    console.log("Getting User List");
    let users = await userService.getUsers();
    console.log(users);

    console.log(" ==================================== Add User ===============================================");
    const results1 = await userService.addUser({
        name: "Kuldeep",
        age: 41,
        date: "djsdsfdsf"
    });
    const results2 = await userService.addUser({
        name: "Rajneesh",
        age: 40,
        date: "dddd"
    });
    const results3 = await userService.addUser({
        name: "PWEO",
        age: 30,
        date: "dddd"
    });
    
    let users1 = await userService.getUsers();
    console.log(users1);
    console.log(results2);
    console.log(" ==================================== Edit User ===============================================");
    const resultsedit = await userService.editUser(results2.id, {
        name: "Rajneesh Sharma",
        age: 40,
        date: "dddd dddd"
    });
    
    console.log(resultsedit);

    users1 = await userService.getUsers();
    console.log(users1);

    console.log(" ==================================== Delete User ===============================================");
    const resultsdelete = await userService.deleteUser(results3.id);
    console.log(resultsdelete);

    let users2 = await userService.getUsers();
    console.log(users2);

}

execute().then(() => {
    console.log("Everything executes");
}).catch((error) => {
    console.log("Error coming" + error);
})

