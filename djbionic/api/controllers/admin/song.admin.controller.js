const { GeneralResponse } = require("../../utils/response");
const { GeneralError, NotFound } = require("../../utils/error");
const songModel = require("../../models/song.model");
const config = require("../../utils/config");
var path = require('path');
exports.list = async (req, res, next) => {
    try {
        songModel.getAdminSong(req,(err, response) => {
            if (err) next(new NotFound('no song found'));
            else if(!err & response == 0)
            next(new GeneralResponse('no  song list',response))
            else next(new GeneralResponse('song list',response))
        })
    } catch (err) {
        next(new GeneralError('error while getting song list'))
    }
}
exports.add = async (req,res,next) => {
     try{
        if(req.body.album_id){
            let { name, url, author_name , is_premium,album_id,new_song } = req.body;
                songModel.addAdminSong({ name, url, author_name , is_premium ,album_id,new_song },(err, response) => {
                    if (err) next(new NotFound('song add error'));
                    else next(
                        new GeneralResponse(
                          "song successfully added",
                          undefined,
                          config.HTTP_CREATED
                        )
                      );
                })

        }else{
            let { name, url, author_name , is_premium,genric_id,new_song } = req.body;
            songModel.addAdminSong({ name, url, author_name , is_premium ,genric_id,new_song },(err, response) => {
                if (err) next(new NotFound('song add error'));
                else next(
                    new GeneralResponse(
                      "song successfully added",
                      undefined,
                      config.HTTP_CREATED
                    )
                  );
            })
        }
     }catch (err) {
        next(new GeneralError('error while getting song add'))
    }
}

exports.delete = async (req,res,next) => {
    let { id } = req.params;
        songModel.getAdminSongId(id, async (err, response) => {
        if (err) next(new GeneralError('error in getting song detail'))
        else {
            if (response && response.length > 0) {
                songModel.delete(id, (err, updateresponse) => {
                        if (err) next(new GeneralError("error in deleteing song"))
                        else {
                            next(new GeneralResponse("This song delete successfully"));
                        }
                    })  
            } else {
                next(new GeneralError('no such song found against your request'))
            }
        }
    })
}

exports.details = async (req,res,next) => {
    try {
        let id = req.params.id;
        songModel.getAdminSongId(id,(err, response) => {
            if (err) next(new NotFound('no song found'));
            else if(!err && response.length > 0)
            next(new GeneralResponse('no  song details',response[0]))
            else next(new GeneralResponse('song details',response))
        })
    } catch (err) {
        next(new GeneralError('error while getting song details'))
    }
}

exports.edit = async (req,res,next) => {
    let { id } = req.params;
    if(req.body.album_id){
        let { name, author_name, is_premium,album_id,new_song } = req.body;
        let updatesongrequest = {};
        let url  = path.parse(req.body.url).base;
        updatesongrequest = {
            name, author_name, is_premium,url,album_id,new_song
        },
        songModel.getAdminSongId(id, async (err, response) => {
            if (err) next(new GeneralError('error in getting song detail'))
            else {
                console.log(response.length)
                if (response) {
                    songModel.update({song: updatesongrequest, song_id : id}, (err, updateresponse) => {
                            if (err) next(new GeneralError("error in update song"))
                            else {
                                next(new GeneralResponse("This song update successfully"));
                            }
                        })  
                } else {
                    next(new GeneralError('no such song found against your request'))
                }
            }
        })
    }
    else
    {
        let { name, author_name, is_premium,genric_id,new_song } = req.body;
        let updatesongrequest = {};
        let updategericsongrequest = {};
        let url  = path.parse(req.body.url).base;
        updatesongrequest = {
            name, author_name, is_premium,url,new_song
        },
        updategericsongrequest = {
            is_premium,
            genric_id
        }
      //   path.parse(image).base
        songModel.getAdminSongId(id, async (err, response) => {
            if (err) next(new GeneralError('error in getting song detail'))
            else {
                console.log(response.length)
                if (response) {
                    songModel.update({song: updatesongrequest, song_id : id}, (err, updateresponse) => {
                            if (err) next(new GeneralError("error in update song"))
                            else {
                                songModel.updategenric({geric_song: updategericsongrequest, song_id : id}, (err, updateresponse) => {
                                  if (err) next(new GeneralError("error in updating song"))
                                  else {
                                      next(new GeneralResponse("This song update successfully"));
                                  }
                              })
                                // next(new GeneralResponse("This event update successfully"));
                            }
                        })  
                } else {
                    next(new GeneralError('no such song found against your request'))
                }
            }
        })
    }   
  }