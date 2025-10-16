// const mongoose = require('mongoose');
// require('dotenv').config();
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URL, {
//       dbName: "civic",
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });

//     mongoose.connection.on('connected', () => {
//       console.log("✅ MongoDB connected successfully");
//     });

//     mongoose.connection.on('error', (err) => {
//       console.error("MongoDB connection error:", err);
//     });
//   } catch (err) {
//     console.error("MongoDB connection failed:", err);
//     process.exit(1);
//   }
// }

// module.exports = connectDB;

const mongoose = require('mongoose');
const Municipal = require('../models/Municipal.js');
require('dotenv').config();

const connectDB = async () => {
    try {
        
        await mongoose.connect(`${process.env.MONGODBURL}/civic`);
        console.log("DataBase connected:", mongoose.connection.name); // should print 'civic'
        await Municipal.init();
        console.log(mongoose.connection.collections);
    } catch (err) {
        console.error("DB connection error:", err);
    }
}

module.exports = connectDB;

