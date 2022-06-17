const AppError = require("../utils/apperror.js");

const { sendToken } = require("./tokenController.js");
const citizen = require("../model/citizenModel.js");

const checkCitizen = async (id_) => {
  return await citizen.findOne({ citizen_id: id_ });
};

// data parsing
const parseData = (req) => {
  return {
    citizen_id: req.body.citizen_id,
    citizen_name: req.body.citizen_name,
    citizen_mobile: req.body.citizen_mobile,
    citizen_email: req.body.citizen_email,
    citizen_address: req.body.citizen_address,
    citizen_username: req.body.citizen_username,
    citizen_password: req.body.citizen_password,
  };
};

const findCitizen = async (req) => {
  const citizen_find = await citizen.findOne({
    citizen_email: req.body.citizen_email,
  });
  if (citizen_find === null) {
    return "false";
  } else if (citizen_find.citizen_password !== req.body.citizen_password) {
    return "false";
  } else {
    return citizen_find;
  }
};

//  login citizen
const loginCitizen = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }
  try {
    const resultcandidate = await findCitizen(req);
    if (resultcandidate === "false")
      return next(new AppError("Incorrect email or password!", 204));
    else {
      // calling send token
      sendToken(
        resultcandidate.citizen_email,
        resultcandidate.user_role_id,
        req,
        res
      );
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// add citizen
const addCitizen = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }
  try {
    const resultCitizen = await checkCitizen(req.body.citizen_id);

    if (resultCitizen === null) {
      const data_ = parseData(req);
      citizen.create(data_, (err, collection) => {
        if (err) {
          return next(new AppError(err, 500));
        }
        return res.status(200).send("Citizen added successfully!");
      });
    } else {
      next(new AppError("Id already exist", 500));
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// updateCitizen
const updateCitizen = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }
  try {
    const resultCitizen = await checkCitizen(req.body.citizen_id);
    if (resultCitizen !== null) {
      const data_ = parseData(req);
      citizen.findOneAndUpdate(
        { citizen_id: req.body.citizen_id },
        data_,
        (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("Citizen updated successfully!");
        }
      );
    } else {
      return next(new AppError("Citizen id does not exist.", 500));
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// delete Citizen
const delteCitizen = async (req, res, next) => {
  try {
    if (!req.params.citizen_id) {
      return next(new AppError("Please provide role id for delete", 204));
    }
    const resultCitizen = await checkCitizen(req.params.citizen_id);

    if (resultCitizen !== null) {
      citizen.findOneAndRemove(
        { citizen_id: req.params.citizen_id },
        (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("Citizen deleted successfully!");
        }
      );
    } else {
      return next(
        new AppError(`this ${req.params.citizen_id} ID does not exist`, 500)
      );
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// search Citizen
const searchCitizen = async (req, res, next) => {
  try {
    if (!req.body.citizen_id) {
      return next(
        new AppError("Please provide citizen id for search permission", 204)
      );
    }
    const resultCitizen = await checkCitizen(req.body.citizen_id);
    if (resultCitizen === null) {
      return res.status(204).send(" Citizen id does not exist!");
    }
    return res.status(200).send(JSON.stringify(resultCitizen));
  } catch (error) {
    next(new AppError(error, 500));
  }
};

module.exports = {
  addCitizen,
  updateCitizen,
  delteCitizen,
  searchCitizen,
  loginCitizen,
};
