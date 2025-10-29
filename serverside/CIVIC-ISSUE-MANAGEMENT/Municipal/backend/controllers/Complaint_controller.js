const ComplaintModel = require("../models/Complaint.js");
const MunicipalModel = require("../models/Municipal.js");
const cloudinary = require('cloudinary').v2;

/**
 * Update complaint status
 */
const updateComplaintStatus = async (req, res) => {
  const { complaintId, status, assignedTo } = req.body;
  
  // Validate status
  const validStatuses = ['pending', 'in-progress', 'solved', 'escalated'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ 
      success: false, 
      message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` 
    });
  }
  
  try {
    const updateData = {};
    if (status) updateData.status = status;
    if (assignedTo) updateData.assignedTo = assignedTo;
    
    // Add current timestamp to timeline
    updateData.$push = { timeline: new Date() };
    
    const complaint = await ComplaintModel.findByIdAndUpdate(
      complaintId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!complaint) {
      return res.status(404).json({ 
        success: false, 
        message: 'Complaint not found' 
      });
    }
    
    // Update municipal statistics
    if (status === 'solved') {
      await MunicipalModel.findOneAndUpdate(
        { district_name: complaint.municipalityName },
        { 
          $inc: { solved: 1, pending: -1 }
        }
      );
    }
    
    res.json({ 
      success: true, 
      complaint,
      message: 'Complaint updated successfully' 
    });
  } catch (error) {
    console.error("Update complaint error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/**
 * Get complaint by ID
 */
const getComplaintById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const complaint = await ComplaintModel.findById(id);
    
    if (!complaint) {
      return res.status(404).json({ 
        success: false, 
        message: 'Complaint not found' 
      });
    }
    
    res.json({ 
      success: true, 
      complaint 
    });
  } catch (error) {
    console.error("Get complaint error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/**
 * Upload evidence for resolved complaint
 */
const uploadEvidence = async (req, res) => {
  try {
    const { complaintId } = req.body;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No file uploaded' 
      });
    }
    
    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { 
          folder: 'complaint-evidence',
          resource_type: 'auto'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(file.buffer);
    });
    
    // Update complaint with evidence URL and mark as solved
    const complaint = await ComplaintModel.findByIdAndUpdate(
      complaintId,
      {
        evidenceUrl: result.secure_url,
        status: 'solved',
        $push: { timeline: new Date() }
      },
      { new: true }
    );
    
    if (!complaint) {
      return res.status(404).json({ 
        success: false, 
        message: 'Complaint not found' 
      });
    }
    
    // Update municipal statistics
    await MunicipalModel.findOneAndUpdate(
      { district_name: complaint.municipalityName },
      { 
        $inc: { solved: 1, pending: -1 }
      }
    );
    
    res.json({ 
      success: true, 
      url: result.secure_url,
      complaint,
      message: 'Evidence uploaded and complaint marked as solved' 
    });
  } catch (error) {
    console.error("Upload evidence error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

/**
 * Get complaints with filters and pagination
 */
const getComplaintsWithFilters = async (req, res) => {
  try {
    const { 
      municipalityName,
      status,
      category,
      date,
      complaintId,
      page = 1, 
      limit = 10 
    } = req.body;
    
    // Build query
    const query = {};
    if (municipalityName) query.municipalityName = municipalityName;
    if (status) query.status = status;
    if (category) query.type = category;
    if (complaintId) query._id = complaintId;
    
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      query.date = { $gte: startDate, $lte: endDate };
    }
    
    // Execute query with pagination
    const complaints = await ComplaintModel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ date: -1 });
    
    const count = await ComplaintModel.countDocuments(query);
    
    res.json({
      success: true,
      complaints,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalComplaints: count
    });
  } catch (error) {
    console.error("Get complaints with filters error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = { 
  updateComplaintStatus, 
  getComplaintById, 
  uploadEvidence,
  getComplaintsWithFilters
};
