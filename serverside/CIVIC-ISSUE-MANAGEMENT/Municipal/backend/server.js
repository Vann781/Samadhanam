const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongodb.js');
const connectCloudinary = require('./config/cloudinary.js');
require('dotenv').config();
const app = express();
const path = require('path'); // ✅ Add this line!
const MunicipalRouter = require('./routes/Municipal_routes.js');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
connectDB();
connectCloudinary();

// api endpoints 

// app.get('/', (req, res) => {
//     res.send('Hello from the backend! This is server');
// }
// )

app.use("/municipalities",MunicipalRouter)

const port = 4040;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server has started on port http://localhost:${port}`);
})

