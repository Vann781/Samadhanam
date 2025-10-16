const mongoose = require('mongoose');
const Municipal = require('../models/District.js');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const State = require('../models/State.js');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Connect to DB once
    const conn = await mongoose.connect(`${process.env.MONGODBURL}/civic`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.name}`);

    // Optional: ensure indexes are created for models
    await Promise.all([Municipal.init(), User.init(), State.init()]);

    // Optional: debug collections
    console.log("Collections:", Object.keys(mongoose.connection.collections));
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1); // stop server if DB fails
  }
};

module.exports = connectDB;
