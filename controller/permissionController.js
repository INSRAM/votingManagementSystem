const AppError = require("../utils/apperror.js");
const roles = require("../model/roleModel.js");
const permission = require("../model/permissionModel.js");

// data parsing
const parseData = (req) => {
  return {
    perm_id: req.body.perm_id,
    perm_role_id: req.body.perm_role_id,
    perm_title: req.body.perm_title,
    perm_module: req.body.perm_module,
    perm_desc: req.body.perm_desc,
  };
};

const checkPermission = async (id_) => {
  const permissionfind_ = await permission.findOne({ perm_id: id_ });
  return permissionfind_;
};

const checkRoleId = async (id_) => {
  const rolefind_ = await roles.findOne({ role_id: id_ });
  return rolefind_;
};

// add permission
const addPermission = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }
  const roleIdResult = await checkRoleId(req.body.perm_role_id);
  if (roleIdResult !== null) {
    try {
      const permissionFind = await checkPermission(req.body.perm_id);
      if (permissionFind === null) {
        // calling parseData function
        const data_ = parseData(req);
        permission.create(data_, (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("Permission added successfully!");
        });
      } else {
        return next(new AppError("Permission ID already exist", 500));
      }
    } catch (error) {
      next(new AppError(error, 500));
    }
  } else {
    return next(new AppError("Incorrect role id", 500));
  }
};

// update permission
const updatePermission = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }

  try {
    const permissionFind = await checkPermission(req.body.perm_id);
    if (permissionFind !== null) {
      const data_ = parseData(req);
      permission.findOneAndUpdate(
        { perm_id: req.body.perm_id },
        data_,
        (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("Permission updated successfully!");
        }
      );
    } else {
      return next(
        new AppError(`this ${req.body.perm_id} ID does not exist`, 500)
      );
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// delete permission
const deletPermission = async (req, res, next) => {
  try {
    if (!req.params.perm_id) {
      return next(new AppError("Please provide role id for delete", 204));
    }
    const permissionFind = await checkPermission(req.params.perm_id);
    if (permissionFind !== null) {
      permission.findOneAndRemove(
        { perm_id: req.params.perm_id },
        (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("Permission deleted successfully!");
        }
      );
    } else {
      return next(
        new AppError(`this ${req.params.perm_id} ID does not exist`, 500)
      );
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// search Permission
const searchPermission = async (req, res, next) => {
  try {
    if (!req.body.perm_id) {
      return next(
        new AppError("Please provide permission id for search permission", 204)
      );
    }
    const permissionFind = await checkPermission(req.body.perm_id);

    if (permissionFind === null) {
      return res.status(204).send("This permission id does not exist!");
    }
    return res.status(200).send(JSON.stringify(permissionFind));
  } catch (error) {
    next(new AppError(error, 500));
  }
};

module.exports = {
  addPermission,
  updatePermission,
  deletPermission,
  searchPermission,
};
