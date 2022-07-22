let users = [];

const getUsers = () => {
    return users;
}

const addUser = (body) => {
  let user = body;
  error = false;
  users.forEach((userRow) => {
    if(userRow.name === user.name) {
      error = true;
    }
  });

  if(!error) {
    users.push(user);
    return users;
  } else {
    throw new Error({error: "Duplicate User"});
  }
}

const editUser = (id, body) => {
  let userId = Number(id);
  let user = body;
  users = users.map((userRow) => {
    if(userRow.id === userId) {
      userRow = user;
    }
    return userRow;
  })
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