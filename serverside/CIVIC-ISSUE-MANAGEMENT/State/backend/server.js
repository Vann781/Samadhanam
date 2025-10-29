const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb.js');
const connectCloudinary = require('./config/cloudinary.js');
const validateEnv = require('./config/validateEnv.js');
require('dotenv').config();

// Validate environment variables before starting
validateEnv();

const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

// ✅ Import and use routes
const StateRouter = require('./routes/StateRoutes.js');
app.use("/State", StateRouter);

// ✅ Start the server
const port = process.env.PORT || 4005;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server has started on port http://localhost:${port}`);
});
