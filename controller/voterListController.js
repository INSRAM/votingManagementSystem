const AppError = require("../utils/apperror.js");

const voterList = require("../model/voterListModel.js");

const checkVoterList = async (id_) => {
  return await voterList.findOne({ voter_li_id: id_ });
};

// data parsing
const parseData = (req) => {
  return {
    voter_li_id: req.body.voter_li_id,
    voter_li_name: req.body.voter_li_name,
    voter_li_desc: req.body.voter_li_desc,
    voter_li_type: req.body.voter_li_type,
  };
};

// add voter list
const addVoterList = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }

  try {
    const resultVoterList = await checkVoterList(req.body.voter_li_id);
    if (resultVoterList === null) {
      const data_ = parseData(req);
      voterList.create(data_, (err, collection) => {
        if (err) {
          return next(new AppError(err, 500));
        }
        return res.status(200).send("Voter list added successfully!");
      });
    } else {
      next(new AppError("Voter list id already exist", 500));
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// update voter list
const updateVoterList = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }

  try {
    const resultVoterList = await checkVoterList(req.body.voter_li_id);
    if (resultVoterList !== null) {
      const data_ = parseData(req);

      voterList.findOneAndUpdate(
        { voter_li_id: req.body.voter_li_id },
        data_,
        (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("voter list updated successfully!");
        }
      );
    } else {
      return next(new AppError("voter list id does not exist.", 500));
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// delete voter list
const deleteVoterList = async (req, res, next) => {
  try {
    if (!req.params.voter_li_id) {
      return next(
        new AppError("Please provide Voteer list id for delete", 204)
      );
    }
    const resultVoterList = await checkVoterList(req.params.voter_li_id);
    if (resultVoterList !== null) {
      voterList.findByIdAndRemove(
        { voter_li_id: req.params.voter_li_id },
        (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("Voter list deleted successfully!");
        }
      );
    } else {
      return next(
        new AppError(`this ${req.params.voter_li_id} ID does not exist`, 500)
      );
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

//  search voter list
const searchVoterList = async (req, res, next) => {
  try {
    if (!req.body.voter_li_id) {
      return next(
        new AppError("Please provide voter list id for search voter list", 204)
      );
    }
    const resultVoterList = await checkVoterList(req.body.voter_li_id);

    if (resultVoterList === null) {
      return res.status(204).send("This votter list id does not exist!");
    }

    return res.status(200).send(JSON.stringify(resultVoterList));
  } catch (error) {
    next(new AppError(error, 500));
  }
};

module.exports = {
  addVoterList,
  updateVoterList,
  deleteVoterList,
  searchVoterList,
};
