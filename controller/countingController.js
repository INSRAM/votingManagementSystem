const AppError = require("../utils/apperror.js");

const counting = require("../model/countingModel.js");

const checkCounting = async (id_) => {
  return await counting.findOne({ counting_id: id_ });
};

// data parsing
const parseData = (req) => {
  return {
    counting_id: req.body.counting_id,
    counting_type: req.body.counting_type,
    counting_desc: req.body.counting_desc,
    counting_name: req.body.counting_name,
    counting_date: req.body.counting_date,
  };
};

// add counting
const addCounting = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }

  try {
    const resultCounting = await checkCounting(req.body.counting_id);
    if (resultCounting === null) {
      const data_ = parseData(req);
      counting.create(data_, (err, collection) => {
        if (err) {
          return next(new AppError(err, 500));
        }
        return res.status(200).send("Counting added successfully!");
      });
    } else {
      next(new AppError("Counting id already exist", 500));
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// update counting
const updateCounting = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }
  try {
    const resultCounting = await checkCounting(req.body.counting_id);
    if (resultCounting !== null) {
      const data_ = parseData(req);
      counting.findOneAndUpdate(
        { counting_id: req.body.counting_id },
        data_,
        (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("counting updated successfully!");
        }
      );
    } else {
      return next(new AppError("Counting id does not exist.", 500));
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

//  delete counting
const deleteCounting = async (req, res, next) => {
  try {
    if (!req.params.counting_id) {
      return next(
        new AppError("Please provide Voteer list id for delete", 204)
      );
    }
    const resultCounting = await checkCounting(req.params.counting_id);
    if (resultCounting !== null) {
      counting.findOneAndRemove(
        { counting_id: req.params.counting_id },
        (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("Counting deleted successfully!");
        }
      );
    } else {
      return next(
        new AppError(`this ${req.params.counting_id} ID does not exist`, 500)
      );
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// search counting
const searchCounting = async (req, res, next) => {
  try {
    if (!req.body.counting_id) {
      return next(
        new AppError("Please provide counting id for search counting", 204)
      );
    }
    const resultCounting = await checkCounting(req.body.counting_id);
    if (resultCounting === null) {
      return res.status(204).send("This counting id does not exist!");
    }
    return res.status(200).send(JSON.stringify(resultCounting));
  } catch (error) {
    next(new AppError(error, 500));
  }
};

module.exports = {
  addCounting,
  updateCounting,
  deleteCounting,
  searchCounting,
};
