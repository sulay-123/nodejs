const db = require("../helpers/db.helper");
var path = require('path');
exports.getAllEvent = (callback) => {
     db(`Select event.id,event.title,event.description,event.event_date, group_concat(event_image.id) as event_image_data_ids,group_concat(event_image.event_id) as event_image_data_event_ids, group_concat(concat("${process.env.IMAGE_BASE_URL}",event_image.image)) as event_image_data_image from event LEFT JOIN event_image ON event_image.event_id = event.id group by event.id ORDER BY event.title`, (err, response) => {
         if (!err && response) {
             if (response.length > 0) {

                 response = response.map(event => {
                      let event_image = [];
                      event.event_image_data_ids = event.event_image_data_ids !== null ? event.event_image_data_ids.split(',') : [];
                      event.event_image_data_image = event.event_image_data_image !== null ? event.event_image_data_image.split(',') : [];
                      event.event_image_data_event_ids = event.event_image_data_event_ids !== null ? event.event_image_data_event_ids.split(',') : [];
                      event.event_image_data_ids.forEach((item, index) => {
                         event_image.push({
                              event_image_id: event.event_image_data_ids[index],
                              event_image: event.event_image_data_image[index],
                              event_id: event.event_image_data_event_ids[index]
                         })
                       })
                    event.event_image = event_image;
                    delete event.event_image_data_ids;
                    delete event.event_image_data_image;
                    delete event.event_image_data_event_ids;
                     return event;
                 })
             }
             callback(null, response);
         }
         else {
             console.log(err)
             callback(err);
         }
     })
}

exports.getEventByID = (event_id,callback) => {
    console.log(`Select event.id,event.title,event.description,event.event_date, group_concat(event_image.id) as event_image_data_ids,group_concat(event_image.event_id) as event_image_data_event_ids, group_concat(concat("${process.env.IMAGE_BASE_URL}",event_image.image)) as event_image_data_image from event LEFT JOIN event_image ON event_image.event_id = event.id where event.id='${event_id}' group by event.id`);
    db(`Select event.id,event.title,event.description,event.event_date,event.time,event.address, group_concat(event_image.id) as event_image_data_ids,group_concat(event_image.event_id) as event_image_data_event_ids, group_concat(concat("${process.env.IMAGE_BASE_URL}",event_image.image)) as event_image_data_image from event LEFT JOIN event_image ON event_image.event_id = event.id where event.id='${event_id}' group by event.id`, (err, response) => {
        if (!err && response) {
            if (response.length > 0) {
                response = response.map(event => {
                     let event_image = [];
                     event.event_image_data_ids = event.event_image_data_ids !== null ? event.event_image_data_ids.split(',') : [];
                     event.event_image_data_image = event.event_image_data_image !== null ? event.event_image_data_image.split(',') : [];
                     event.event_image_data_event_ids = event.event_image_data_event_ids !== null ? event.event_image_data_event_ids.split(',') : [];
                     event.event_image_data_ids.forEach((item, index) => {
                        event_image.push({
                             event_image_id: event.event_image_data_ids[index],
                             event_image: event.event_image_data_image[index],
                             event_id: event.event_image_data_event_ids[index]
                        })
                      })
                   event.event_image = event_image;
                   delete event.event_image_data_ids;
                   delete event.event_image_data_image;
                   delete event.event_image_data_event_ids;
                   return event;
                })
            }
            callback(null, response);
        }
        else {
            console.log(err)
            callback(err);
        }
    })
}

exports.getAdminEvent = (req,callback) => {
    const filters = {
        pagination: false,
        search: false
    }
    let  limit, offset, search;
      //pagination
      if ('limit' in req.query && 'page' in req.query) {
        filters.pagination = true;
        limit = req.query.limit ? req.query.limit : 10;
        offset = (req.query.page ? Number(req.query.page) - 1 : 0) * Number(limit);
      }
      if('search' in req.query)
      {
        filters.search = true;
        search = req.query.search;
      }
    let sql = `Select event.id,event.title,event.address,event.time,event.description,event.event_date, group_concat(event_image.id) as event_image_data_ids,group_concat(event_image.event_id) as event_image_data_event_ids, group_concat(concat("${process.env.IMAGE_BASE_URL}",event_image.image)) as event_image_data_image from event LEFT JOIN event_image ON event_image.event_id = event.id `;
    //for getting total count while pagination
    let countsql = `Select count(event.id) as counts from event LEFT JOIN event_image ON event_image.event_id = event.id`;
    
      // pagination
      if (filters.search == true)
      {
          console.log(search)
         sql += ` where event.title LIKE '%${search}%'`
         countsql += ` where event.title LIKE '%${search}%'`
      }
      sql += ` group by event.id ORDER BY event.title`;
      if (filters.pagination == true) {
          sql += ` limit ${limit} OFFSET ${offset}`
      }
      console.log(sql)
      console.log(countsql)
    db(sql, (err, response) => {
        if (!err && response) {
            if (response.length > 0) {
                let finalres = [];
                response = response.map(event => {
                     let event_image = [];
                     event.event_image_data_ids = event.event_image_data_ids !== null ? event.event_image_data_ids.split(',') : [];
                     event.event_image_data_image = event.event_image_data_image !== null ? event.event_image_data_image.split(',') : [];
                     event.event_image_data_event_ids = event.event_image_data_event_ids !== null ? event.event_image_data_event_ids.split(',') : [];
                     event.event_image_data_ids.forEach((item, index) => {
                        event_image.push({
                             event_image_id: event.event_image_data_ids[index],
                             event_image: event.event_image_data_image[index],
                             event_id: event.event_image_data_event_ids[index]
                        })
                      })
                   event.event_image = event_image;
                   delete event.event_image_data_ids;
                   delete event.event_image_data_image;
                   delete event.event_image_data_event_ids;
                   finalres.push(event);  
                });
                db(countsql,
                    (counterr, countresponse) => {
                      if (counterr)
                      {
                          console.log(counterr)
                          callback(counterr)
  
                      }
                      else {
                        let count = countresponse[0].counts;
                        callback(null, { count, finalres })
                      }
                    }) 
            }
            else
            {
              callback(null, response)
            }
        }
        else {
            console.log(err)
            callback(err);
        }
    })
}

exports.addAdminEvent = (event,callback) => {
    db(
      `INSERT INTO event (title,description,address,event_date,time) values ('${event.title}','${event.description}','${event.address}','${event.event_date}','${event.time}')`,
      (err, response) => {
        if (err) {
          callback(err)
        }
        else {
          if(response)
          {
            let image  = path.parse(event.image).base;
            db(
              `INSERT INTO event_image (event_id,image) values ('${response.insertId}','${image}')`,
              (event_imageerr, event_imageresponse) => {
                if (event_imageerr) {
                  callback(event_imageerr)
                }
                else {
                  callback(null, event_imageresponse);
                }
              });
          }
          // callback(null, genricresponse);
        }
      }
    );
}
  
exports.delete = (id,callback) => {
    db(`DELETE from event where id ='${id}'`, (err, response) => {
        if (!err && response) {
          if (response.length > 0) {
              db(`select * from event_image where event_id='${id}'`, (err, response) => {
                if (!err && response) {
                    if (response.length > 0) {
                        db(`DELETE from event_image where event_id='${id}'`, (err, response) => {
                            if (!err && response) {
                                    if (response.length > 0) {
                                        callback(null, response);   
                                    }
                                    else callback(null, response);  
                                }
                                else 
                                {
                                      console.log("db err",err);
                                      callback(err);
                                }
                        })    
                    }
                    else callback(null, response);
                }
                else 
                {
                      console.log("db err",err);
                      callback(err);
                }
             }) 
           callback(null, response);   
          }
          else callback(null, response);
          }
        else 
        {
              console.log("db err",err);
              callback(err);
        }
    })
}
exports.update = ({ event, event_id }, callback) => {
    db(`Update event SET ? where id = ?`, [event, event_id], (err, response) => {
      if (!err) {
        callback(null, response);
      }
      else {
        console.log(`DB Error`, err)
        callback(err);
      }
    });
};

exports.updateSingleColumn = ({ key, value, id }, callback) => {
  console.log(`Update event_image SET ${key} = '${value}' where event_id = '${id}'`)
  db(`Update event_image SET ${key} = '${value}' where event_id = '${id}'`, (err, response) => {
    if (err){
      // console.log(err)
      callback(err);
    } 
    else callback(null, response);
  })
}