
const { fetchallDistricts, LoginState } = require("../controllers/StateController");
const { verifyToken } = require("../middleware/authMiddleware.js");
const express = require("express");

const StateRouter = express.Router();

// Public routes (no auth required)
StateRouter.post("/login", LoginState);

// Protected routes (auth required)
StateRouter.post("/allDistricts", verifyToken, fetchallDistricts);

module.exports = StateRouter;

