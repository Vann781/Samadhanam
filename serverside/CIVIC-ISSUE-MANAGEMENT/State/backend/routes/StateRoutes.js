
const { fetchallDistricts, LoginState } = require("../controllers/StateController");
const express = require("express");

const StateRouter = express.Router();

StateRouter.post("/allDistricts", fetchallDistricts);
StateRouter.post("/login", LoginState);
module.exports = StateRouter;

