const express = require("express");
const { logout_ } = require("../controller/tokenController.js");
const {
  checkPermission,
} = require("../controller/permissionCheckerController.js");

const {
  addUser,
  deleteUser,
  updateUser,
  searchUser,
  loginUser,
} = require("../controller/userController.js");
const routes = express.Router();

routes.post("/adduser", checkPermission("adduser"), addUser);
routes.get("/logoutuser", logout_);
routes.post("/loginuser", loginUser);
routes.post("/searchuser", checkPermission("searchuser"), searchUser);
routes.patch("/updateuser", checkPermission("updateuser"), updateUser);
routes.delete(
  "/deleteuser/:user_id",
  checkPermission("deleteuser"),
  deleteUser
);

module.exports = routes;
