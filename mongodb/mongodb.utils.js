const mongoose = require("mongoose");
require("dotenv").config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb connected");
  } catch {
    console.log(err);
    throw new Error(err);
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect( );
  } catch {
    console.log(err);
    throw new Error(err);
  }
};

const dropCollection = async (collectionName) => {
  try {
    await mongoose.connection.collection(collectionName).drop();
  } catch {
    if (err.code === 26) {
      console.log(`namespace ${collectionName} not found`);
    } else {
    throw new Error(err);
    }
  }
};

module.exports = {
  connect,
  disconnect,
  dropCollection
};
 