const { GeneralResponse } = require("../utils/response");
const { GeneralError, NotFound } = require("../utils/error");
const songModel = require("../models/song.model");

exports.list = async (req, res, next) => {
    try {
        let user_id =req.decoded.id;
        songModel.getSong(req,user_id,(err, response) => {
            if (err) next(new NotFound('no song found'));
            else if(!err & response == 0)
            next(new GeneralResponse('no  song list',response))
            else next(new GeneralResponse('song list',response))
        })
    } catch (err) {
        next(new GeneralError('error while getting song list'))
    }
}

exports.newsonglist = async (req,res,next) => {
    try {
        let user_id =req.decoded.id;
        songModel.getnewSong(req,user_id,(err, response) => {
            if (err) next(new NotFound('no song found'));
            else if(!err & response == 0)
            next(new GeneralResponse('no new song list',response))
            else next(new GeneralResponse('song list',response))
        })
    } catch (err) {
        next(new GeneralError('error while getting song list'))
    }
}

