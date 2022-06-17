const express = require("express");
const { logout_ } = require("../controller/tokenController.js");
const {
  checkPermission,
} = require("../controller/permissionCheckerController.js");
const {
  addCandidate,
  updateCandidate,
  delteCandidate,
  searchCandidate,
  loginCandidate,
} = require("../controller/candidateController.js");

const routes = express.Router();

routes.get("/logoutcandidate", logout_);
routes.post("/logincandidate", loginCandidate);
routes.post("/addcandidate", checkPermission("addcandidate"), addCandidate);
routes.post(
  "/searchcandidate",
  checkPermission("searchcandidate"),
  searchCandidate
);
routes.patch(
  "/updatecandidate",
  checkPermission("updatecandidate"),
  updateCandidate
);
routes.delete(
  "/deletecandidate/:candidate_id",
  checkPermission("deletecandidate"),
  delteCandidate
);

module.exports = routes;
