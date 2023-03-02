const { GeneralResponse } = require("../utils/response");
const { GeneralError, NotFound } = require("../utils/error");
const radioModel = require("../models/radio.model");

exports.list = async (req, res, next) => {
    try {
        radioModel.getRadio((err, response) => {
            if (err) next(new NotFound('no radio found'));
            else next(new GeneralResponse('radio list',response))
        })
    } catch (err) {
        next(new GeneralError('error while getting radio list'))
    }
}

