const { GeneralResponse } = require("../../utils/response");
const { GeneralError, NotFound } = require("../../utils/error");
const albumModel = require("../../models/album.model");
const config = require("../../utils/config");
exports.list = async (req, res, next) => {
    try {
          albumModel.getAdminAlbum(req,(err, response) => {
               if (err) next(new NotFound('no album found'));
               else if(!err & response == 0)
               next(new GeneralResponse('no album list',response))
               else next(new GeneralResponse('album list',response))
          })
    } catch (err) {
        next(new GeneralError('error while getting album list'))
    }
}

exports.add =async (req,res,next) => {
    try{
        let { name } = req.body;
        albumModel.addAdminAlbum({ name },(err, response) => {
            if (err) {
                console.log(err)
                next(new NotFound('album add error'));
            }
            else next(
                new GeneralResponse(
                  "album successfully added",
                  undefined,
                  config.HTTP_CREATED
                )
              );
        })
     }catch (err) {
        next(new GeneralError('error while getting album add'))
    }
}

exports.details = async (req,res,next) => {
    try {
         let id = req.query.id
         console.log(id)
         albumModel.getAdminalbumDetails(id,(err, response) => {
             if (err) next(new NotFound('no album found'));
             else if(!err & response == 0)
             next(new GeneralResponse('album list',response))
             else next(new GeneralResponse('album list',response[0]))
        })
  } catch (err) {
      next(new GeneralError('error while getting album list'))
  }
}

exports.edit = async (req,res,next) => {
    let { id } = req.params;
    let { name } = req.body;
    let updaterequest = {};
    updaterequest = {
        name
    },
    albumModel.getAdminalbumId(id, async (err, response) => {
        if (err) next(new GeneralError('error in getting album detail'))
        else {
            if (response && response.length > 0) {
                albumModel.updatealbum({album: updaterequest, id : id}, (err, updateresponse) => {
                        if (err) next(new GeneralError("error in updating album"))
                        else {
                            next(new GeneralResponse("This album update successfully"));
                        }
                    })  
            } else {
                next(new GeneralError('no such album found against your request'))
            }
        }
    })
}

exports.delete = async (req,res,next) => {
    let { id } = req.params;
    console.log(id)
    albumModel.getAdminalbumId(id, async (err, response) => {
        if (err) next(new GeneralError('error in getting album detail'))
        else {
            if (response && response.length > 0) {
                albumModel.delete(id, (err, updateresponse) => {
                        if (err) next(new GeneralError("error in deleteing album"))
                        else {
                            next(new GeneralResponse("This album delete successfully"));
                        }
                    })  
            } else {
                next(new GeneralError('no such album found against your request'))
            }
        }
    })
}

