const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
      
    // id : {type: Number, required: true},
    title : {type: String, required: true},
    location : {type: String, required: true},
    latitude : {type: Number, required: true},
    longitude : {type: Number, required: true},
    date : {type: Date, required: true},
    status : {type: String, required: true},
    description : {type: String, required: true},
    imageUrl : {type: String, required: true},
    timeline : {type: [Date], required: true},
    
},{
  timestamps: true,
  collection: "Complaints", 
  minimize: false
});
    
    

const ComplaintModel = mongoose.models.Complaints || mongoose.model("Complaints", ComplaintSchema);

module.exports = ComplaintModel;


// title, location, latitude, longitude, date, status, description, imageUrl, timeline