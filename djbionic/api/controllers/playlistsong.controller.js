const { GeneralResponse } = require("../utils/response");
const { GeneralError } = require("../utils/error");
const playlistsongModel = require("../models/playlistsong.model");
const config = require("../utils/config");
exports.addPlayListsong = async (req, res, next) => {
  try {
    playlistsongModel.isPlaylistsongExist(req, async (err, response) => {
      if (!err && response.length > 0)
          next(new GeneralError("this song is already in play list exist", undefined, config.HTTP_ACCEPTED));
      else {
        playlistsongModel.createPlaylistsong(req,
          (err, response) => {
            if (err || response.affectedRows == 0)
              next(new GeneralError("play list song add failed"));
            else
              next(
                new GeneralResponse(
                  "play list song successfully added",
                  undefined,
                  config.HTTP_CREATED
                )
              );
          }
        );
      }
    });
  } catch (err) {
    next(new GeneralError("playlist song add failed"));
  }
};

exports.getPlayListsong = async (req, res, next) => {
  try {
    let playlist_id = req.query.id;
    let user_id = req.decoded.id;
    playlistsongModel.getPlaylistsongplay_id(playlist_id,user_id,(err, response) => {
      if (err) next(new NotFound('no playlist song found'));
      else if(!err && response.length == 0)
             next(new GeneralResponse('no play list song list',response))
      else next(new GeneralResponse('playlist song list',response[0]))
    })
  } catch (err) {
    next(new GeneralError("playlist song list failed"));
  }
};

exports.removePlayListsong = async (req, res, next) => {
  try {
    playlistsongModel.getPlaylistByid(req,async (err, response) => {
      if (!err && response.length == 0)
          next(new GeneralError("no play list song exist", undefined, config.HTTP_ACCEPTED));
      else
      {
        playlistsongModel.removeplaylistfromuser(req,async (err, response) => {
          if (err) next(new NotFound('no playlist song found'));
          else next(new GeneralResponse('playlist song remove successful'))
        })
      }
    })
  } catch (err) {
    next(new GeneralError("play list song remove failed"));
  }
};
