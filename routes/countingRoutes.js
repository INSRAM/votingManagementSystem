const express = require("express");
const {
  checkPermission,
} = require("../controller/permissionCheckerController.js");

const {
  addCounting,
  deleteCounting,
  updateCounting,
  searchCounting,
} = require("../controller/countingController.js");

const routes = express.Router();

routes.post("/addcounting", checkPermission("addcounting"), addCounting);
routes.post(
  "/searchcounting",
  checkPermission("searchcounting"),
  searchCounting
);
routes.patch(
  "/updatecounting",
  checkPermission("updatecounting"),
  updateCounting
);
routes.delete(
  "/deletecounting/:counting_id",
  checkPermission("deletecounting"),
  deleteCounting
);

module.exports = routes;
