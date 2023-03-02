const { GeneralError } = require("../../utils/error");
const { GeneralResponse } = require("../../utils/response");
const { upload,uploadingsong } = require("../../helpers/multer.helper");
const usersModel = require("../../models/users.model");

exports.upload = (req, res, next) => {
    try {
        upload(req, res, function (err) {
            if (err) {
                next(new GeneralError(err.toString()));
            }else{
                if(req.file){
                    let filesname = req.file.filename
                    next(new GeneralResponse("image uploaded", `${process.env.IMAGE_BASE_URL}${filesname}`));
                }else{
                    next(new GeneralError("image uploading failed"));

                }
            }
        })
    } catch (err) {
        next(new GeneralError("image uploading failed"));
    }
}

exports.uploadsong = (req, res, next) => {
    try {
        uploadingsong(req, res, function (err) {
            if (err) {
                next(new GeneralError(err.toString()));
            }else{
                if(req.file){
                    let filesname = req.file.filename
                    next(new GeneralResponse("song uploaded", `${process.env.SONG_BASE_URL}${filesname}`));
                }else{
                    next(new GeneralError("song uploading failed"));

                }
            }
        })
    } catch (err) {
        next(new GeneralError("image uploading failed"));
    }
}
/** 
 * *********************************** Dash board ***********************************
*/

exports.getdashboard = (req,res,next) =>{
    try{
        usersModel.getdashboard((err,response) => {
            if(err) next(new GeneralError("failure in getting dashboard data"));
            else {
                next(new GeneralResponse("dashboard data", response));
            } 
        })
    }catch(err){
        next(new GeneralError("failure in getting dashboard data"));
    }
}

/** 
 * *********************************** Contact ***********************************
*/

exports.getcontact = (req,res,next) =>{
    try{
        usersModel.getcontact(req,(err,response) => {
            if(err) next(new GeneralError("failure in getting contact data"));
            else {
                next(new GeneralResponse("contact data", response));
            } 
        })
    }catch(err){
        next(new GeneralError("failure in getting contact data"));
    }
}