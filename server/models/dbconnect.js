const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/CodeIDE" || process.env.MONGODB_URL);
    console.log("DB connected successfully");
  } catch (err) {
    console.error("DB connection failed:", err);
    process.exit(1); 
  }
};

module.exports = connectDB;
