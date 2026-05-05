const mongoose = require("mongoose");

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to the Database");
  } catch (err) {
    console.log("Database connection error: ", err);
  }
}

module.exports = connectToDb;
