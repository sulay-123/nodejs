const { GeneralResponse } = require("../utils/response");
const { GeneralError, NotFound } = require("../utils/error");
const eventModel = require("../models/event.model");

exports.list = async (req, res, next) => {
    try {
          eventModel.getAllEvent((err, response) => {
               if (err) next(new NotFound('no event found'));
               else next(new GeneralResponse('event list',response))
          })
    } catch (err) {
        next(new GeneralError('error while getting event list'))
    }
}

exports.details = async (req, res, next) => {
    try {
          let id = req.query.id;
          eventModel.getEventByID(id,(err, response) => {
               if (err) next(new NotFound('no event found'));
               else next(new GeneralResponse('event details',response[0]))
          })
    } catch (err) {
        next(new GeneralError('error while getting event details'))
    }
}


