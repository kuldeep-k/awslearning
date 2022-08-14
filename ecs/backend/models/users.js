const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    age: String,
    date: String
});

module.exports = new mongoose.model("User", userSchema); 

