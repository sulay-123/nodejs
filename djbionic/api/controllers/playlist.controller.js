const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const playlistModel = require("../models/playlist.model");
const config = require("../utils/config");
exports.addPlayList = async (req, res, next) => {
  try {
    let request = req;
    playlistModel.isPlaylistExist(request, async (err, response) => {
      if (!err && response.length > 0)
          next(new GeneralError("this name play list already exist", undefined, config.HTTP_ACCEPTED));
      else {
        playlistModel.createPlaylist(request,
          (err, response) => {
            if (err || response.affectedRows == 0)
              next(new GeneralError("play list add failed"));
            else
              console.log(response.insertId)
              next(
                new GeneralResponse(
                  "play list successfully added",
                  { id:response.insertId }
                  
                )
              );
          }
        );
      }
    });
  } catch (err) {
    next(new GeneralError("playlist add failed"));
  }
};

exports.getPlayList = async (req, res, next) => {
  try {
    let user_id = req.decoded.id;
    playlistModel.getPlaylistuser_id(user_id,(err, response) => {
      if (err) next(new NotFound('no playlist found'));
      else if(!err && response.length == 0)
      next(new GeneralError("no play list exist", undefined, config.HTTP_ACCEPTED,response));
      else next(new GeneralResponse('playlist list',response))
    })
  } catch (err) {
    next(new GeneralError("playlist list failed"));
  }
};

exports.removePlayList = async (req, res, next) => {
  try {
    let id = req.query.id;
    playlistModel.getPlaylistByid(id,(err, response) => {
      if (!err && response.length == 0)
          next(new GeneralError("no play list exist", undefined, config.HTTP_ACCEPTED));
      else
      {
        playlistModel.removeplaylistfromuser(id,(err, response) => {
          if (err) next(new NotFound('no playlist found'));
          else next(new GeneralResponse('playlist remove successful'))
        })
      }
    })
  } catch (err) {
    next(new GeneralError("play list remove failed"));
  }
};
