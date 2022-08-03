const userModel = require('../models/users');
const mongoose = require('mongoose');

const getUsers = async () => {
  return await userModel.find();
}

const addUser = async (body) => {
  let user = body;
  
  let error = false;
  /*console.log(users);
  users.forEach((userRow) => {
    console.log([userRow.name, user.name]);
    if(userRow.name === user.name) {
      error = true;
    }
  });*/
  const record = await userModel.findOne({name: user.name});
  if(record) {
    error = true;
  }
  if(!error) {
    let userres = await userModel.create(user);
    // users = await userModel.find();
    // console.log("users")
    // console.log(userres)
    return userres;
  } else {
    console.log("IN ERRRO")
    throw new Error("Duplicate User");
  }
}

const editUser = async (id, body) => {
  console.log(id);
  id = mongoose.Types.ObjectId(id);
  let user = body;
  let error = false;
  /*users.forEach((userRow) => {
    console.log([userRow.name, user.name]);
    if(userRow.id !== userId && userRow.name === user.name) {
      error = true;
    }
  });*/
  const record = await userModel.findOne({id: { ne: id },name: user.name});
  if(record) {
    error = true;
  }
  if(!error) {
    await userModel.updateOne({ _id: id }, user);
    return await userModel.findById(id);
  } else {
    console.log("IN ERRRO")
    throw new Error("Duplicate User");
  }
}

const getUser = async (id) => {
  id = mongoose.Types.ObjectId(id);
  console.log(id)
  let user = null;
  user = await userModel.findById(id);
  
  return user;
}


const deleteUser = async (id) => {
  id = mongoose.Types.ObjectId(id);
  
  await userModel.deleteOne({ _id: id });
  users = await userModel.find();
  return users;
}

module.exports = {
    addUser,
    editUser,
    getUsers,
    getUser,
    deleteUser
}