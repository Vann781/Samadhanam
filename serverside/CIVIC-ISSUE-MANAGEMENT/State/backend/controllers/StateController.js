const mongoose = require('mongoose');
const Municipal = require('../models/District.js');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const State = require('../models/State.js');
require('dotenv').config();
const jwt = require("jsonwebtoken");


 const LoginState = async (req, res) => {  
  try {
    const {enteredUserName,enteredPassword} = req.body;
      console.log(enteredUserName,enteredPassword);
      const user = await State.findOne({official_username: enteredUserName});
      console.log(user);
      if(!user){
        return res.status(401).json({success:false,message:"User not found"});
      }
      const isMatch = await bcrypt.compare(enteredPassword, user.hashed_password);
      if (!isMatch) return res.status(401).json({ success:false,message: "Invalid password" });
      const tokens = jwt.sign({enteredUserName,enteredPassword},process.env.JWT_SECRET);
      console.log(tokens + " Generated during login");
      console.log(req.body);
      console.log(true);
      return res.json({success:true,user:user,tokens:tokens});
  } catch (error) {
      return res.json({success:false,message:error});
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

