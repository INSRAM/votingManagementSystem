const AppError = require("../utils/apperror.js");
const { sendToken } = require("./tokenController.js");
const candidate = require("../model/candidateModel.js");

const checkCandidate = async (id_) => {
  return await candidate.findOne({ candidate_id: id_ });
};

// data parsing
const parseData = (req) => {
  return {
    candidate_id: req.body.candidate_id,
    candidate_name: req.body.candidate_name,
    candidate_mobile: req.body.candidate_mobile,
    candidate_email: req.body.candidate_email,
    candidate_address: req.body.candidate_address,
    candidate_username: req.body.candidate_username,
    candidate_password: req.body.candidate_password,
  };
};

const findCandidate = async (req) => {
  const candidate_find = await candidate.findOne({
    candidate_email: req.body.candidate_email,
  });
  if (candidate_find === null) {
    return "false";
  } else if (
    candidate_find.candidate_password !== req.body.candidate_password
  ) {
    return "false";
  } else {
    return candidate_find;
  }
};

//  login candidate
const loginCandidate = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }
  try {
    const resultcandidate = await findCandidate(req);
    if (resultcandidate === "false")
      return next(new AppError("Incorrect email or password!", 204));
    else {
      // calling send token
      sendToken(
        resultcandidate.candidate_email,
        resultcandidate.user_role_id,
        req,
        res
      );
      // sendToken(req.body.candidate_email, req, res);
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// add candidate
const addCandidate = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }
  try {
    const resultcandidate = await checkCandidate(req.body.candidate_id);

    if (resultcandidate === null) {
      const data_ = parseData(req);
      candidate.create(data_, (err, collection) => {
        if (err) {
          return next(new AppError(err, 500));
        }
        return res.status(200).send("candidate added successfully!");
      });
    } else {
      next(new AppError("Id already exist", 500));
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// updatecandidate
const updateCandidate = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }
  try {
    const resultcandidate = await checkCandidate(req.body.candidate_id);
    if (resultcandidate !== null) {
      const data_ = parseData(req);
      candidate.findOneAndUpdate(
        { candidate_id: req.body.candidate_id },
        data_,
        (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("candidate updated successfully!");
        }
      );
    } else {
      return next(new AppError("candidate id does not exist.", 500));
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// delete candidate
const delteCandidate = async (req, res, next) => {
  try {
    if (!req.params.candidate_id) {
      return next(new AppError("Please provide candidate id for delete", 204));
    }
    const resultcandidate = await checkCandidate(req.params.candidate_id);

    if (resultcandidate !== null) {
      candidate.findOneAndRemove(
        { candidate_id: req.params.candidate_id },
        (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("candidate deleted successfully!");
        }
      );
    } else {
      return next(
        new AppError(`this ${req.params.candidate_id} ID does not exist`, 500)
      );
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// search candidate
const searchCandidate = async (req, res, next) => {
  try {
    if (!req.body.candidate_id) {
      return next(
        new AppError("Please provide candidate id for search permission", 204)
      );
    }
    const resultcandidate = await checkCandidate(req.body.candidate_id);
    if (resultcandidate === null) {
      return res.status(204).send(" candidate id does not exist!");
    }
    return res.status(200).send(JSON.stringify(resultcandidate));
  } catch (error) {
    next(new AppError(error, 500));
  }
};

module.exports = {
  addCandidate,
  updateCandidate,
  delteCandidate,
  searchCandidate,
  loginCandidate,
};
