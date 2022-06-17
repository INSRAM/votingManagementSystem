const express = require("express");
const {
  checkPermission,
} = require("../controller/permissionCheckerController.js");

const {
  addVoterList,
  deleteVoterList,
  updateVoterList,
  searchVoterList,
} = require("../controller/voterListController.js");

const routes = express.Router();

routes.post("/addvoterlist", checkPermission("addvoterlist"), addVoterList);
routes.post(
  "/searchvoterlist",
  checkPermission("searchvoterlist"),
  searchVoterList
);
routes.patch(
  "/updatevoterlist",
  checkPermission("updatevoterlist"),
  updateVoterList
);
routes.delete(
  "/deletevoterlist/:voter_li_id",
  checkPermission("deletevoterlist"),
  deleteVoterList
);

module.exports = routes;
