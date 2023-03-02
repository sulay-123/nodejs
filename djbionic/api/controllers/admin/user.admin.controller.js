const { GeneralResponse } = require("../../utils/response");
const { GeneralError, NotFound } = require("../../utils/error");
const userModel = require("../../models/users.model");

exports.list = async (req, res, next) => {
    try {
     userModel.getUser(req,(err, response) => {
            if (err) next(new NotFound('no user found'));
            else if(!err & response == 0)
            next(new GeneralResponse('Users do not exists',response))
            else next(new GeneralResponse('user list',response))
        })
    } catch (err) {
        next(new GeneralError('error while getting user list'))
    }
}

exports.changestatus = async (req,res,next) => {
    try {
        let { id } = req.params;
        const user_id =id;
        userModel.getUserFromId(id, async (err, response) => {
            if (err) next(new GeneralError('error in getting user detail'))
            else {
                if (response && response.length > 0) {
                    if (response[0].is_approve == 1) {
                        userModel.updateSingleColumn({ key: 'is_approve', value: '2', user_id }, (err, updateresponse) => {
                            if (err) next(new GeneralError("error in updating user status"))
                            else {
                                next(new GeneralResponse("This user rejected successfully"));
                            }
                        })
                    } else if (response[0].is_approve == 2) {
                        userModel.updateSingleColumn({ key: 'is_approve', value: '1', user_id }, (err, updateresponse) => {
                            if (err) next(new GeneralError("error in updating user status"))
                            else {
                                next(new GeneralResponse("This user accepted successfully"));
                            }
                        })
                    }
                    
                } else {
                    next(new GeneralError('no such user found against your request'))
                }
            }
        })
    } catch (err) {
        console.log(err)
        next(new GeneralError("error in user status change"))
    }
}