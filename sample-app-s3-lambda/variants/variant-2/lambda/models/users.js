const mongoose = require("../connection");

const userSchema = new mongoose.Schema({
    name: String,
    age: String,
    date: String
});

module.exports = new mongoose.model("User", userSchema); 

