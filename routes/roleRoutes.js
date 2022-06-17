const express = require("express");
const {
  checkPermission,
} = require("../controller/permissionCheckerController.js");

const {
  addRole,
  updateRole,
  deleteRole,
  searchRole,
} = require("../controller/roleController.js");

const routes = express.Router();

routes.post("/addrole", checkPermission("addrole"), addRole);
routes.post("/searchrole", checkPermission("searchrole"), searchRole);
routes.patch("/updaterole", checkPermission("updaterole"), updateRole);
routes.delete(
  "/deleterole/:role_id",
  checkPermission("deleterole"),
  deleteRole
);

routes.get("/addrole", (req, res) => {
  res.send("welcome to addrole");
});

module.exports = routes;
