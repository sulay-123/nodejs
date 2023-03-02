const { GeneralResponse } = require("../utils/response");
const { GeneralError, NotFound } = require("../utils/error");
const albumModel = require("../models/album.model");

exports.list = async (req, res, next) => {
    try {
          albumModel.getAllalbum((err, response) => {
               if (err) next(new NotFound('no album found'));
               else next(new GeneralResponse('album list',response))
          })
    } catch (err) {
        next(new GeneralError('error while getting album list'))
    }
}