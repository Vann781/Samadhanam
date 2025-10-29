const express = require("express");
const multer = require("multer");
const { verifyToken } = require("../middleware/authMiddleware.js");
const { 
  updateComplaintStatus, 
  getComplaintById, 
  uploadEvidence,
  getComplaintsWithFilters
} = require("../controllers/Complaint_controller.js");

const ComplaintRouter = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// All complaint routes require authentication
ComplaintRouter.use(verifyToken);

// Get complaint by ID
ComplaintRouter.get("/:id", getComplaintById);

// Update complaint status
ComplaintRouter.patch("/update", updateComplaintStatus);

// Upload evidence (with file upload)
ComplaintRouter.post("/uploadEvidence", upload.single('evidence'), uploadEvidence);

// Get complaints with filters
ComplaintRouter.post("/filter", getComplaintsWithFilters);

module.exports = ComplaintRouter;
