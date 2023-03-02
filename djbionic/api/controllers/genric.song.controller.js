const { GeneralResponse } = require("../utils/response");
const { GeneralError, NotFound } = require("../utils/error");
const genricSongModel = require("../models/genric.song.model");

exports.list = async (req, res, next) => {
    try {
          genricSongModel.getGenricSong(req,(err, response) => {
               if (err) next(new NotFound('no genric song found'));
               else if(!err & response == 0)
               next(new GeneralResponse('genric list',response))
               else next(new GeneralResponse('genric song list',response[0]))
          })
    } catch (err) {
        next(new GeneralError('error while getting genric song list'))
    }
}

exports.djsonglist = async (req,res,next) => {
    try {
        genricSongModel.getdjSong(req,(err, response) => {
             if (err) next(new NotFound('no dj song found'));
             else if(!err & response == 0)
             next(new GeneralResponse('dj song list',response))
             else next(new GeneralResponse('dj song list',response))
        })
  } catch (err) {
      next(new GeneralError('error while getting dj song list'))
  }
}

