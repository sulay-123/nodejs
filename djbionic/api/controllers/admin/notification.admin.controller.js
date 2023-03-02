const { GeneralResponse } = require("../../utils/response");
const { GeneralError, NotFound } = require("../../utils/error");
const notificationModel = require("../../models/notification.model");
const config = require("../../utils/config");
exports.list = async (req, res, next) => {
    try {
          notificationModel.getAdminnotification(req,(err, response) => {
               if (err) next(new NotFound('no notification found'));
               else if(!err & response == 0)
               next(new GeneralResponse('no notification list',response))
               else next(new GeneralResponse('notification list',response))
          })
    } catch (err) {
        next(new GeneralError('error while getting notification list'))
    }
}

exports.add =async (req,res,next) => {
    try{
        let { title , message ,image,user_type } = req.body;
        notificationModel.addAdminnotification({ title , message ,image,user_type },(err, response) => {
            if (err) {
                console.log(err)
                next(new NotFound('notification add error'));
            }
            else next(
                new GeneralResponse(
                  "notification successfully added",
                  undefined,
                  config.HTTP_CREATED
                )
              );
        })
     }catch (err) {
        next(new GeneralError('error while getting notification add'))
    }
}

exports.delete = async (req,res,next) => {
    let { id } = req.params;
    console.log(id)
    notificationModel.getAdminnotificationId(id, async (err, response) => {
        if (err) next(new GeneralError('error in getting notification detail'))
        else {
            if (response && response.length > 0) {
                notificationModel.delete(id, (err, updateresponse) => {
                        if (err) next(new GeneralError("error in deleteing notification"))
                        else {
                            next(new GeneralResponse("This notification delete successfully"));
                        }
                    })  
            } else {
                next(new GeneralError('no such notification found against your request'))
            }
        }
    })
}

