const AppError = require("../utils/apperror.js");

const vote = require("../model/voteModel.js");

const checkVote = async (id_) => {
  return await vote.findOne({ vote_id: id_ });
};

// data parsing
const parseData = (req) => {
  return {
    vote_id: req.body.vote_id,
    vote_name: req.body.vote_name,
    vote_desc: req.body.vote_desc,
    vote_type: req.body.vote_type,
  };
};

// add vote
const addVote = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }
  try {
    const reslutVote = await checkVote(req.body.vote_id);
    if (reslutVote === null) {
      const data_ = parseData(req);

      vote.create(data_, (err, collection) => {
        if (err) {
          return next(new AppError(err, 500));
        }
        return res.status(200).send("Vote added successfully!");
      });
    } else {
      next(new AppError("Vote id already exist", 500));
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

// update vote
const updateVote = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new AppError("Body is empty", 204));
  }
  try {
    const reslutVote = await checkVote(req.body.vote_id);

    if (reslutVote !== null) {
      const data_ = parseData(req);
      vote.findOneAndUpdate(
        { vote_id: req.body.vote_id },
        data_,
        (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("vote updated successfully!");
        }
      );
    } else {
      return next(new AppError("vote id does not exist.", 500));
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

//  delete vote
const deleteVote = async (req, res, next) => {
  try {
    if (!req.params.vote_id) {
      return next(new AppError("Please provide Vote id for delete", 204));
    }

    const reslutVote = await checkVote(req.params.vote_id);

    if (reslutVote !== null) {
      vote.findOneAndRemove(
        { vote_id: req.params.vote_id },
        (err, collection) => {
          if (err) {
            return next(new AppError(err, 500));
          }
          return res.status(200).send("vote deleted successfully!");
        }
      );
    } else {
      return next(new AppError("vote id does not exist.", 500));
    }
  } catch (error) {
    next(new AppError(error, 500));
  }
};

const searchVote = async (req, res, next) => {
  try {
    if (!req.body.vote_id) {
      return next(
        new AppError("Please provide vote id for search permission", 204)
      );
    }
    const reslutVote = await checkVote(req.body.vote_id);

    if (reslutVote === null) {
      return res.status(204).send(" vote id does not exist!");
    }
    return res.status(200).send(JSON.stringify(reslutVote));
  } catch (error) {
    next(new AppError(error, 500));
  }
};

module.exports = { addVote, updateVote, deleteVote, searchVote };
