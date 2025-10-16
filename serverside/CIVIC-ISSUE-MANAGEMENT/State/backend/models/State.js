const mongoose = require('mongoose');

const MunicipalSchema = new mongoose.Schema({
    state_id : {type: Number, required: true},
    state_name : {type: String, required: true},
    official_username: {type: String, required: true},
    hashed_password: {type: String, required: true},
    complaints: { type: [String], default:[],required: true },
    solved: {type: Number,required: true},
    pending: {type: Number,required: true},
},{
  timestamps: true,
  collection: "State", 
  minimize: false
});
    
    

const MunicipalModel = mongoose.models.State || mongoose.model("State", MunicipalSchema);

module.exports = MunicipalModel;
