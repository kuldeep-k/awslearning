const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/lambdatest');
    mongoose.set('debug', true);
  }
module.exports = mongoose;
