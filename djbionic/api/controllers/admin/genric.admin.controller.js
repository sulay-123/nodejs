const { GeneralResponse } = require("../../utils/response");
const { GeneralError, NotFound } = require("../../utils/error");
const genricModel = require("../../models/genric.model");
const genricSongModel = require("../../models/genric.song.model");
const config = require("../../utils/config");
exports.list = async (req, res, next) => {
    try {
          genricModel.getGenricAdmin(req,(err, response) => {
               if (err) next(new NotFound('no genric found'));
               else if(!err & response == 0)
               next(new GeneralResponse('no genric list',response))
               else next(new GeneralResponse('genric list',response))
          })
    } catch (err) {
        next(new GeneralError('error while getting genric list'))
    }
}

exports.listgenric = async (req,res,next) =>{
    try {
        genricModel.getAdminGenric(req,(err, response) => {
             if (err) next(new NotFound('no genric found'));
             else if(!err & response == 0)
             next(new GeneralResponse('no genric list',response))
             else next(new GeneralResponse('genric list',response))
        })
  } catch (err) {
      next(new GeneralError('error while getting genric list'))
  }
}

exports.add =async (req,res,next) => {
    try{
        let { name,genric_type } = req.body;
        genricModel.addAdminGenric({ name,genric_type },(err, response) => {
            if (err) {
                console.log(err)
                next(new NotFound('genric add error'));
            }
            else next(
                new GeneralResponse(
                  "genric successfully added",
                  undefined,
                  config.HTTP_CREATED
                )
              );
        })
     }catch (err) {
        next(new GeneralError('error while getting genric add'))
    }
}

exports.details = async (req,res,next) => {
    try {
        genricSongModel.getAdminGenricIdSong(req,(err, response) => {
             if (err) next(new NotFound('no genric song found'));
             else if(!err & response == 0)
             next(new GeneralResponse('genric list',response))
             else next(new GeneralResponse('genric song list',response[0]))
        })
  } catch (err) {
      next(new GeneralError('error while getting genric song list'))
  }
}

exports.edit = async (req,res,next) => {
    let { id } = req.params;
    let { name,genric_type } = req.body;
    let updaterequest = {};
    updaterequest = {
        name, genric_type
    },
    genricModel.getAdminGenricSongId(id, async (err, response) => {
        if (err) next(new GeneralError('error in getting genric detail'))
        else {
            if (response && response.length > 0) {
                genricModel.update({genric: updaterequest, id : id}, (err, updateresponse) => {
                        if (err) next(new GeneralError("error in updating genric"))
                        else {
                            next(new GeneralResponse("This genric update successfully"));
                        }
                    })  
            } else {
                next(new GeneralError('no such genric found against your request'))
            }
        }
    })
}

exports.delete = async (req,res,next) => {
    let { id } = req.params;
    genricModel.getAdminGenricSongId(id, async (err, response) => {
        if (err) next(new GeneralError('error in getting genric detail'))
        else {
            if (response && response.length > 0) {
                genricModel.delete(id, (err, updateresponse) => {
                        if (err) next(new GeneralError("error in deleteing genric"))
                        else {
                            next(new GeneralResponse("This genric delete successfully"));
                        }
                    })  
            } else {
                next(new GeneralError('no such genric found against your request'))
            }
        }
    })
}

