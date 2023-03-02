const { GeneralResponse } = require("../utils/response");
const { GeneralError, NotFound } = require("../utils/error");
const genricModel = require("../models/genric.model");

exports.list = async (req, res, next) => {
    try {
          genricModel.getGenric((err, response) => {
               if (err) next(new NotFound('no genric found'));
               else if(!err & response == 0)
               next(new GeneralResponse('no genric list',response))
               else next(new GeneralResponse('genric list',response))
          })
    } catch (err) {
        next(new GeneralError('error while getting genric list'))
    }
}

exports.djlist = async (req, res, next) => {
    try {
          genricModel.getdj((err, response) => {
               if (err) next(new NotFound('no genric found'));
               else if(!err & response == 0)
               next(new GeneralResponse('no dj list',response))
               else next(new GeneralResponse('genric list',response))
          })
    } catch (err) {
        next(new GeneralError('error while getting genric list'))
    }
}

