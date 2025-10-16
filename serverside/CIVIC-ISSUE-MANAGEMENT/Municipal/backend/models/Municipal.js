

const mongoose = require('mongoose');

const MunicipalSchema = new mongoose.Schema({
    district_id : {type: Number, required: true},
    district_name : {type: String, required: true},
    state_name : {type: String, required: true},
    state_id : {type: Number, required: true},
    official_username: {type: String, required: true},
    hashed_password: {type: String, required: true},
    complaints: { type: [String], default:[],required: true },
    solved: {type: Number,required: true},
    demerits: {type: Number,required: true},
    pending: {type: Number,required: true},
},{
  timestamps: true,
  collection: "municipality_new", 
  minimize: false
});
    
    

const MunicipalModel = mongoose.models.municipality_new || mongoose.model("municipality_new", MunicipalSchema);

module.exports = MunicipalModel;

