const express = require("express");
const {
  checkPermission,
} = require("../controller/permissionCheckerController.js");

const {
  addVote,
  deleteVote,
  updateVote,
  searchVote,
} = require("../controller/voteController.js");

const routes = express.Router();

routes.post("/addvote", checkPermission("addvote"), addVote);
routes.post("/searchvote", checkPermission("searchvote"), searchVote);
routes.patch("/updatevote", checkPermission("updatevote"), updateVote);
routes.delete(
  "/deletevote/:vote_id",
  checkPermission("deletevote"),
  deleteVote
);

module.exports = routes;
