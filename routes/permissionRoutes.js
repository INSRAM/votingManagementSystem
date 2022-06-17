const express = require("express");
const {
  checkPermission,
} = require("../controller/permissionCheckerController.js");

const {
  addPermission,
  updatePermission,
  deletPermission,
  searchPermission,
} = require("../controller/permissionController.js");

const routes = express.Router();

routes.post("/addpermission", checkPermission("addpermission"), addPermission);
routes.post(
  "/searchpermission",
  checkPermission("searchpermission"),
  searchPermission
);
routes.patch(
  "/updatepermission",
  checkPermission("updatepermission"),
  updatePermission
);
routes.delete(
  "/deletepermission/:perm_id",
  checkPermission("deletepermission"),
  deletPermission
);

module.exports = routes;
