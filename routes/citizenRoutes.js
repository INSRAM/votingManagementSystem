const express = require("express");
const { logout_ } = require("../controller/tokenController.js");
const {
  checkPermission,
} = require("../controller/permissionCheckerController.js");

const {
  addCitizen,
  updateCitizen,
  delteCitizen,
  searchCitizen,
  loginCitizen,
} = require("../controller/citizenController.js");

const routes = express.Router();

routes.get("/logoutcitizen", logout_);
routes.post("/logincitizen", loginCitizen);
routes.post("/addcitizen", checkPermission("addcitizen"), addCitizen);
routes.post("/searchcitizen", checkPermission("searchcitizen"), searchCitizen);
routes.patch("/updatecitizen", checkPermission("updatecitizen"), updateCitizen);
routes.delete(
  "/deletecitizen/:citizen_id",
  checkPermission("deletecitizen"),
  delteCitizen
);

module.exports = routes;
