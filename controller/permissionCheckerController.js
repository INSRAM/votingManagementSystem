const jwt = require("jsonwebtoken");
const permission = require("../model/permissionModel.js");
const AppError = require("../utils/apperror.js");
// checking cookie
const checkCookie = (token) => {
  try {
    var result = jwt.verify(token, process.env.key);
    return result;
  } catch (error) {
    return error;
  }
};

const userPermissionChecker = async (id_, per_module) => {
  const result_ = await permission.findOne({ perm_role_id: id_ });
  if (result_ === null) return false;
  return result_.perm_module.includes(per_module);
};

const checkPermission = (permission_module) => {
  return async (req, res, next) => {
    try {
      var cookie_result = checkCookie(req.cookies.token);
      if (!cookie_result.email) return next(new AppError(cookie_result, 500));

      var permission_result = await userPermissionChecker(
        cookie_result.user_role_id,
        permission_module
      );

      if (!permission_result)
        return next(
          new AppError("You do not have permission on this route!", 500)
        );

      next();
    } catch (error) {
      next(new AppError(error, 500));
    }
  };
};

module.exports = { checkPermission };
