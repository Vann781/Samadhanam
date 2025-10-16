const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    
  })
  console.log('CLOUDINARY CONNECTED');
  
}

module.exports = connectCloudinary;