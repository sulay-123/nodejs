const { GeneralResponse } = require("../../utils/response");
const { GeneralError, NotFound } = require("../../utils/error");
const eventModel = require("../../models/event.model");
const config = require("../../utils/config");
var path = require('path');
exports.list = async (req, res, next) => {
    try {
          eventModel.getAdminEvent(req,(err, response) => {
            if (err) next(new NotFound('no event found'));
            else if(!err & response == 0)
            next(new GeneralResponse('no  event list',response))
            else next(new GeneralResponse('event list',response))
          })
    } catch (err) {
        next(new GeneralError('error while getting event list'))
    }
}
exports.add = async (req,res,next) => {
  try{
     let { title, description, address , event_date, time ,image } = req.body;
     eventModel.addAdminEvent({ title, description, address , event_date, time ,image },(err, response) => {
         if (err) next(new NotFound('event add error'));
         else next(
             new GeneralResponse(
               "event successfully added",
               undefined,
               config.HTTP_CREATED
             )
           );
     })
  }catch (err) {
     next(new GeneralError('error while getting event add'))
 }
}

exports.delete = async (req,res,next) => {
 let { id } = req.params;
 console.log(id)
     eventModel.getEventByID(id, async (err, response) => {
     if (err) next(new GeneralError('error in getting event detail'))
     else {
         if (response && response.length > 0) {
             eventModel.delete(id, (err, updateresponse) => {
                     if (err) next(new GeneralError("error in deleteing event"))
                     else {
                         next(new GeneralResponse("This event delete successfully"));
                     }
                 })  
         } else {
             next(new GeneralError('no such event found against your request'))
         }
     }
 })
}

exports.details = async (req,res,next) => {
  try {
    let event_id = req.query.id;
      eventModel.getEventByID(event_id,(err, response) => {
          if (err) next(new NotFound('no event found'));
          else if(!err & response == 0)
          next(new GeneralResponse('no  event details',response))
          else next(new GeneralResponse('event details',response[0]))
      })
  } catch (err) {
      next(new GeneralError('error while getting event details'))
  }
}
exports.edit = async (req,res,next) => {
  let { id } = req.params;
  let { title, description, address , event_date, time } = req.body;
  let updateeventrequest = {};
  updateeventrequest = {
    title,
    address,
    description,
    event_date,
    time
  }
//   path.parse(image).base
  let image  = path.parse(req.body.image).base;
      eventModel.getEventByID(id, async (err, response) => {
      if (err) next(new GeneralError('error in getting event detail'))
      else {
          if (response && response.length > 0) {
              eventModel.update({event: updateeventrequest, event_id : id}, (err, updateresponse) => {
                      if (err) next(new GeneralError("error in update event"))
                      else {
                        eventModel.updateSingleColumn({ key: 'image', value: image, id }, (err, updateresponse) => {
                            if (err) next(new GeneralError("error in updating user status"))
                            else {
                                next(new GeneralResponse("This event update successfully"));
                            }
                        })
                        //   next(new GeneralResponse("This event update successfully"));
                      }
                  })  
          } else {
              next(new GeneralError('no such event found against your request'))
          }
      }
  })
}