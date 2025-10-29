const requiredEnvVars = [
  'MONGODBURL',
  'JWT_SECRET',
  'CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_SECRET_KEY'
];

const validateEnv = () => {
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(varName => console.error(`   - ${varName}`));
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  console.log('✅ All required environment variables are set');
};

module.exports = validateEnv;
