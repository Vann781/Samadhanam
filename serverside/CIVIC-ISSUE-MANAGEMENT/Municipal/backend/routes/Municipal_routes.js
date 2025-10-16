
const { fetchallDistricts,LoginMunicipal,fetchDistrict,fetchByName } = require("../controllers/Municipal_controller.js");

const express = require("express");

const MunicipalRouter = express.Router();

MunicipalRouter.get("/allDistricts", fetchallDistricts);
MunicipalRouter.post("/login",LoginMunicipal);
MunicipalRouter.post("/fetchDistrict",fetchDistrict);
MunicipalRouter.post("/fetchByName",fetchByName);
module.exports = MunicipalRouter;


