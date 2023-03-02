const { GeneralResponse } = require("../../utils/response");
const { GeneralError, NotFound } = require("../../utils/error");
const splashscreenModel = require("../../models/splashscreen.model");
const config = require("../../utils/config");
exports.list = async (req, res, next) => {
    try {
          splashscreenModel.getAdminsplashscreen(req,(err, response) => {
               if (err) next(new NotFound('no splashscreen found'));
               else if(!err & response == 0)
               next(new GeneralResponse('no splashscreen list',response))
               else next(new GeneralResponse('splashscreen list',response))
          })
    } catch (err) {
        next(new GeneralError('error while getting splashscreen list'))
    }
}

exports.add =async (req,res,next) => {
    try{
        let { image } = req.body;
        splashscreenModel.addAdminsplashscreen({ image },(err, response) => {
            if (err) {
                console.log(err)
                next(new NotFound('splashscreen add error'));
            }
            else next(
                new GeneralResponse(
                  "splashscreen successfully added",
                  undefined,
                  config.HTTP_CREATED
                )
              );
        })
     }catch (err) {
        next(new GeneralError('error while getting splashscreen add'))
    }
}

// exports.details = async (req,res,next) => {
//     try {
//          let id = req.query.id
//          console.log(id)
//          splashscreenModel.getAdminsplashscreenDetails(id,(err, response) => {
//              if (err) next(new NotFound('no splashscreen found'));
//              else if(!err & response == 0)
//              next(new GeneralResponse('splashscreen list',response))
//              else next(new GeneralResponse('splashscreen list',response[0]))
//         })
//   } catch (err) {
//       next(new GeneralError('error while getting splashscreen list'))
//   }
// }

// exports.edit = async (req,res,next) => {
//     let { id } = req.params;
//     let { name } = req.body;
//     let updaterequest = {};
//     updaterequest = {
//         name
//     },
//     splashscreenModel.getAdminsplashscreenId(id, async (err, response) => {
//         if (err) next(new GeneralError('error in getting splashscreen detail'))
//         else {
//             if (response && response.length > 0) {
//                 splashscreenModel.updatesplashscreen({splashscreen: updaterequest, id : id}, (err, updateresponse) => {
//                         if (err) next(new GeneralError("error in updating splashscreen"))
//                         else {
//                             next(new GeneralResponse("This splashscreen update successfully"));
//                         }
//                     })  
//             } else {
//                 next(new GeneralError('no such splashscreen found against your request'))
//             }
//         }
//     })
// }

exports.delete = async (req,res,next) => {
    let { id } = req.params;
    console.log(id)
    splashscreenModel.getAdminsplashscreenId(id, async (err, response) => {
        if (err) next(new GeneralError('error in getting splashscreen detail'))
        else {
            if (response && response.length > 0) {
                splashscreenModel.delete(id, (err, updateresponse) => {
                        if (err) next(new GeneralError("error in deleteing splashscreen"))
                        else {
                            next(new GeneralResponse("This splashscreen delete successfully"));
                        }
                    })  
            } else {
                next(new GeneralError('no such splashscreen found against your request'))
            }
        }
    })
}

