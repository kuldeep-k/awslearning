let users = [];

const getUsers = () => {
    return users;
}

const addUser = (body) => {
  let user = body;
  
  error = false;
  console.log(users);
  users.forEach((userRow) => {
    console.log([userRow.name, user.name]);
    if(userRow.name === user.name) {
      error = true;
    }
  });

  if(!error) {

    users.push(user);
    console.log("users")
    console.log(users)
    return users;
  } else {
    console.log("IN ERRRO")
    throw new Error("Duplicate User");
  }
}

const editUser = (id, body) => {
  let userId = Number(id);
  let user = body;

  users.forEach((userRow) => {
    console.log([userRow.name, user.name]);
    if(userRow.id !== userId && userRow.name === user.name) {
      error = true;
    }
  });

  if(!error) {

    users = users.map((userRow) => {
      if(userRow.id === userId) {
        userRow = user;
      }
      return userRow;
    })
  } else {
    console.log("IN ERRRO")
    throw new Error("Duplicate User");
  }
  return users;
}

const getUser = (id) => {
  let userId = Number(id);
  console.log(userId)
  let user = null;
  users.forEach((userRow) => {
    if(userRow.id === Number(userId)) {
      user = userRow;
    }
  });
  return user;
}

const deleteUser = (id) => {
  let userId = Number(id);
  users = users.filter((userRow) => {
    return userRow.id !== userId;
  })
  return users;
}

module.exports = {
    addUser,
    editUser,
    getUsers,
    getUser,
    deleteUser
}