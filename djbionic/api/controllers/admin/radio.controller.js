const { GeneralResponse } = require("../../utils/response");
const { GeneralError, NotFound } = require("../../utils/error");
const radioModel = require("../../models/radio.model");

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

exports.update = async (req,res,next) => {
     let { id } = req.params;
     let { url } = req.body;
          radioModel.getradioByID(id, async (err, response) => {
          if (err) next(new GeneralError('error in getting radio detail'))
          else {
             if (response && response.length > 0) {
               radioModel.updateSingleColumn({ key: 'link', value: url, id }, (err, updateresponse) => {
                               if (err) next(new GeneralError("error in updating user status"))
                               else {
                                   next(new GeneralResponse("This radio update successfully"));
                               }
                     })  
             } else {
                 next(new GeneralError('no such radio found against your request'))
             }
         }
     })
}