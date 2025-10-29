
const { fetchallDistricts, LoginMunicipal, fetchDistrict, fetchByName } = require("../controllers/Municipal_controller.js");
const { getComplaintCategories } = require("../controllers/Categories_controller.js");
const { verifyToken } = require("../middleware/authMiddleware.js");
const express = require("express");

const MunicipalRouter = express.Router();

// Public routes (no auth required)
MunicipalRouter.post("/login", LoginMunicipal);
MunicipalRouter.get("/categories", getComplaintCategories);

// Protected routes (auth required)
MunicipalRouter.get("/allDistricts", verifyToken, fetchallDistricts);
MunicipalRouter.post("/fetchDistrict", verifyToken, fetchDistrict);
MunicipalRouter.post("/fetchByName", verifyToken, fetchByName);

module.exports = MunicipalRouter;


