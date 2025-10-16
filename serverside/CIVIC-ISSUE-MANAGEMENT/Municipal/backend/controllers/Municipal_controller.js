const MunicipalModel = require("../models/Municipal.js");
const ComplaintModel = require("../models/Complaint.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const fetchallDistricts = async (req, res) => {
    try {
        const districts = await MunicipalModel.find({});
        console.log(districts);
        return res.json({success: true,districts: districts});
    } catch (error) {
        console.error("Error fetching districts:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
}

const fetchDistrict = async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id);
        const district = await MunicipalModel.findOne({ district_id: id });
        console.log(district);
        if (!district) {
            return res.status(404).json({ success: false, message: "District not found" });
        }
        return res.json({ success: true, district: district });
    } catch (error) {
        console.error("Error fetching districts:", error);
        return res.status(500).json({ success: false, message: error});
    }
}


const LoginMunicipal = async (req, res) => {  
  try {
    const {username,password} = req.body;
      console.log(username,password);
      const user = await MunicipalModel.findOne({official_username: username});
      if(!user){
        return res.status(401).json({success:false,message:"User not found"});
      }
      const isMatch = await bcrypt.compare(password, user.hashed_password);
      if (!isMatch) return res.status(401).json({ message: "Invalid password" });
      const tokens = jwt.sign({username,password},process.env.JWT_SECRET);
      console.log(tokens + " Generated during login");
      console.log(req.body);
      console.log(true);
      return res.json({success:true,user:user,tokens:tokens});
  } catch (error) {
      return res.json({success:false,message:error});
  }
      

}

const fetchByName = async (req,res) => {
      try {
           const { municipalityName} = req.body;
           const complaints = await ComplaintModel.find({municipalityName: municipalityName});
           if(!complaints){
            return res.json({success:false,complaints:[]});
           }
           else{
            return res.json({success:true,complaints:complaints});
           }
      } catch (error) {
            return res.json({success:false,message:error});
      }
}

module.exports = {LoginMunicipal,fetchallDistricts,fetchDistrict, fetchByName};

