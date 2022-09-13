const mongoose = require('mongoose');
var dbConnection = null;
// main();

async function main() {
  try {
    
      console.log("Mongo Connection 1")
      let dsn = process.env.DSN || 'mongodb://localhost:27017/lambdatest';
      let isTls = process.env.TLS || '0';
      
      console.log("Mongo Connection 2 " + dsn)
      
      let options = {};
      if(isTls == '1') {
        options = {
          socketTimeoutMS: 1000,
          connectTimeoutMS: 1000,
          serverSelectionTimeoutMS: 1000,
  
          ssl: true,
          // tlsValidate: true,
          sslCA: `${__dirname}/rds-combined-ca-bundle.pem`,
        }
      } else {
        options = {
          socketTimeoutMS: 1000,
          connectTimeoutMS: 1000,
          serverSelectionTimeoutMS: 1000,
  
        }
      }
      dbConnection = await mongoose.connect(dsn, options);
      console.log("Mongo Connection 3")
      mongoose.set('debug', true);
      console.log("Mongo Connection 4")
      return true;
      /*mongoose.set("debug", true);
      mongoose.Promise = global.Promise;
      // console.log(process.env);
      await mongoose.connect(dsn, {
        server: {
          socketOptions: {
            socketTimeoutMS: 1000,
            connectionTimeout: 1000
          }
        }
      });
      console.log("Mongo Connection 3")
      mongoose.connection.on("error", (err) => {
        console.log("Mongdb connection failed due to error : ", err);
      });
      console.log("Mongo Connection 4")*/
  } catch (error) {
    console.log("Mongo Connection failure ", error)
    return false;

  }
  
}

module.exports = main()
