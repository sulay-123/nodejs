const { GeneralResponse } = require("../utils/response");
const { GeneralError, NotFound } = require("../utils/error");
const splashscreenModel = require("../models/splashscreen.model");

exports.list = async (req, res, next) => {
    try {
        splashscreenModel.getSplashscreen((err, response) => {
            if (err) next(new NotFound('no splashscreen found'));
            else next(new GeneralResponse('splashscreen list',response))
        })
    } catch (err) {
        next(new GeneralError('error while getting splashscreen list'))
    }
}

