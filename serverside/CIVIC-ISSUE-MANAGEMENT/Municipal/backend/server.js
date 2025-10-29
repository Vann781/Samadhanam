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
const MunicipalRouter = require('./routes/Municipal_routes.js');
const ComplaintRouter = require('./routes/Complaint_routes.js');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
connectDB();
connectCloudinary();

// api endpoints 

app.use("/municipalities", MunicipalRouter);
app.use("/complaints", ComplaintRouter);

const port = process.env.PORT || 4040;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server has started on port http://localhost:${port}`);
})

