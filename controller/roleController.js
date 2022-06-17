const AppError = require("../utils/apperror.js");
const roles = require("../model/roleModel.js");
const parseData = (req) => {
  return {
    role_id: req.body.role_id,
    role_title: req.body.role_title,
    role_desc: req.body.role_desc,
  };
};

const checkRole = async (id_) => {
  const rolefind_ = await roles.findOne({ role_id: id_ });
  return rolefind_;
};
// adding role
const addRole = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }

  try {
    const rolefind = await checkRole(req.body.role_id);
    if (rolefind === null) {
      // calling parseData function
      const data_ = parseData(req);
      roles.create(data_, (err, collection) => {
        if (err) {
          return next(new AppError(err, 500));
        }
        return res.status(200).send("Role added successfully!");
      });
    } else {
      return next(new AppError("ID already exist", 500));
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// update role
const updateRole = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }
  try {
    const rolefind = await checkRole(req.body.role_id);
    if (rolefind !== null) {
      const data_ = parseData(req);
      roles.findOneAndUpdate(
        { role_id: req.body.role_id },
        data_,
        (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("Role updated successfully!");
        }
      );
    } else {
      return next(
        new AppError(`this ${req.body.role_id} ID does not exist`, 500)
      );
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// delete role
const deleteRole = async (req, res, next) => {
  try {
    if (!req.params.role_id) {
      return next(new AppError("Please provide role id for delete", 204));
    }
    const rolefind = await checkRole(req.params.role_id);
    if (rolefind !== null) {
      roles.findOneAndRemove(
        { role_id: req.params.role_id },
        (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("Role deleted successfully!");
        }
      );
    } else {
      return next(
        new AppError(`this ${req.params.role_id} ID does not exist`, 500)
      );
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// searching role
const searchRole = async (req, res, next) => {
  try {
    if (!req.body.role_id) {
      return next(new AppError("Please provide role id for search role", 204));
    }
    const rolefind = await checkRole(req.body.role_id);
    if (rolefind === null) {
      return res.status(204).send("This role id does not exist!");
    }
    return res.status(200).send(JSON.stringify(rolefind));
  } catch (error) {
    next(new AppError(error, 500));
  }
};

module.exports = { addRole, updateRole, deleteRole, searchRole };
