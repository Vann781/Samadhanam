const mongoose = require('mongoose');
const Municipal = require('../models/District.js');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const State = require('../models/State.js');
const { generateTokens } = require('../middleware/authMiddleware.js');
require('dotenv').config();


 const LoginState = async (req, res) => {  
  try {
    const {enteredUserName, enteredPassword} = req.body;
    
    // Validate input
    if (!enteredUserName || !enteredPassword) {
      return res.status(400).json({
        success: false, 
        message: "Username and password are required"
      });
    }
    
    console.log("Login attempt for username:", enteredUserName);
    
    // Find user
    const user = await State.findOne({official_username: enteredUserName});
    if (!user) {
      return res.status(401).json({
        success: false, 
        message: "User not found"
      });
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(enteredPassword, user.hashed_password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid password" 
      });
    }
    
    // Generate tokens with user info
    const { accessToken, refreshToken } = generateTokens({
      username: user.official_username,
      state_id: user.state_id,
      state_name: user.state_name
    });
    
    console.log("✅ Login successful for:", enteredUserName);
    
    return res.json({
      success: true,
      user: user,
      token: accessToken,
      refreshToken: refreshToken
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false, 
      message: "Server error during login"
    });
  }
}
const fetchallDistricts = async (req, res) => {
    try {
        const {id} = req.body;
        console.log(id);
        const districts = await Municipal.find({state_id:id});
        const state = await State.findOne({state_id:id});
        console.log(districts);
        return res.json({success: true,districts: districts,state:state});
    } catch (error) {
        console.error("Error fetching districts:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}



module.exports = {fetchallDistricts, LoginState};

