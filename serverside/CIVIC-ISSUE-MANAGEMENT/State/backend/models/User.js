const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {type: Number, required: true},
    email : {type: String, required: true},
    password: {type: String, required: true},
    role : {type: Number, required: true},
    rewardPoints: {type: String, required: true},
    complaints: { type: [String], default:[],required: true },
    
},{
  timestamps: true,
  collection: "users", 
  minimize: false
});
    
    

const UserModel = mongoose.models.users || mongoose.model("users", UserSchema);

module.exports = UserModel;