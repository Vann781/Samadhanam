const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    title: { type: String, required: true },
    municipalityName: { type: String, required: true, index: true },
    districtId: { type: Number },
    stateId: { type: Number },
    type: { type: String }, // Category of complaint (Potholes, Garbage, etc.)
    location: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    raisedDate: { type: Date, default: Date.now },
    status: { 
      type: String, 
      enum: ['pending', 'in-progress', 'solved', 'escalated'],
      default: 'pending'
    },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    evidenceUrl: { type: String }, // URL of resolution evidence
    timeline: { type: [Date], default: [] },
    assignedTo: { type: String, default: 'N/A' }
}, {
  timestamps: true,
  collection: "Complaints", 
  minimize: false
});

// Add index for better query performance
ComplaintSchema.index({ municipalityName: 1, status: 1 });
ComplaintSchema.index({ date: -1 });

const ComplaintModel = mongoose.models.Complaints || mongoose.model("Complaints", ComplaintSchema);

module.exports = ComplaintModel;