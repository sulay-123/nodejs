const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const favouriteModel = require("../models/favourite.model");
const config = require("../utils/config");
exports.addfavourite = async (req, res, next) => {
  try {
    let request = req;
    favouriteModel.isfavouriteExist(request, async (err, response) => {
      if (!err && response.length > 0)
      {
        favouriteModel.unfavouritefromuser(request,(err, response) => {
          if (err) next(new NotFound('no favourite found'));
          else next(new GeneralResponse('unfavourite successful'))
        })

      }
      else {
        favouriteModel.createfavourite(request,
          (err, response) => {
            if (err || response.affectedRows == 0)
              next(new GeneralError("favourite add failed"));
            else
              next(
                new GeneralResponse(
                  "favourite successfully added",
                  undefined,
                  config.HTTP_CREATED
                )
              );
          }
        );
      }
    });
  } catch (err) {
    next(new GeneralError("favourite add failed"));
  }
};

exports.getfavourite = async (req, res, next) => {
  try {
    let user_id = req.decoded.id;
    favouriteModel.getfavouriteuser_id(user_id,(err, response) => {
      if (err) next(new NotFound('no favourite found'));
      else if(!err && response.length == 0)
      (new GeneralResponse('no favourite list',response))
      else next(new GeneralResponse('favourite list',response[0]))
    })
  } catch (err) {
    next(new GeneralError("favourite list failed"));
  }
};

exports.removefavourite = async (req, res, next) => {
  try {
    let id = req.query.id;
    favouriteModel.getfavouriteByid(id,(err, response) => {
      if (!err && response.length == 0)
          next(new GeneralError("no favourite exist", undefined, config.HTTP_ACCEPTED));
      else
      {
        favouriteModel.removefavouritefromuser(id,(err, response) => {
          if (err) next(new NotFound('no favourite found'));
          else next(new GeneralResponse('favourite remove successful'))
        })
      }
    })
  } catch (err) {
    next(new GeneralError("play list remove failed"));
  }
};
