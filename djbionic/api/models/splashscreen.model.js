const db = require("../helpers/db.helper");
var path = require('path');

exports.getSplashscreen = (callback) => {

     db(`Select id,concat("${process.env.IMAGE_BASE_URL}",image) as splash_image from splash_image`, (err, response) => {
         if (!err && response) {
             if (response.length > 0) {
                 callback(null, response);
             }
             else  callback(null, response);
         }
         else {
             console.log("db error",err)
             callback(err);
         }
     })
 }

 exports.getAdminsplashscreen = (request,callback) => {
    const filters = {
      pagination: false,
      search: false
    }
  
      let  limit, offset, search;
      let sql =`Select id,concat("${process.env.IMAGE_BASE_URL}",image) as splash_image from splash_image`;
      //pagination
      if ('limit' in request.query && 'page' in request.query) {
          filters.pagination = true;
          limit = request.query.limit ? request.query.limit : 10;
          offset = (request.query.page ? Number(request.query.page) - 1 : 0) * Number(limit);
      }
      if('search' in request.query)
      {
           filters.search = true;
           search = request.query.search;
      }
      //for getting total count while pagination
      let countsql = `Select count(id) as counts from splash_image`;
      console.log(countsql)
        // pagination
        // if ( filters.search )
        //  {
        //      sql += ` where album.name LIKE '%${search}%'`
        //      countsql += ` where album.name LIKE '%${search}%'`
        //  }
      if (filters.pagination) {
          sql += ` limit ${limit} OFFSET ${offset} `
      }
      db(sql, (err, response) => {
          if (!err && response) {
              if (response.length > 0) {
                  let finalres = [];
                  response.forEach(song => {
                    finalres.push(song);
                })
              //    console.log(finalres)
              if(filters.pagination)
              {
                db(countsql,
                    (err, response) => {
                      if (err)
                      {
                          console.log(err)
                          callback(err)
  
                      }
                      else {
                        let count = response[0].counts;
                        callback(null, { count, finalres })
                      }
                    })   
                }
                else callback(null, finalres)  
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
  
  exports.addAdminsplashscreen = (song,callback) => {
    let song_url  = path.parse(song.image).base;
    db(
      `INSERT INTO splash_image (image) values ('${song_url}')`,
      (err, response) => {
        if (err) {
          console.log(err)
          callback(err)
        }
        else {
          callback(null, response);
        }
      }
    );
  }
  
  exports.getAdminsplashscreenId = (id,callback)=>{
    let sql = `Select id,concat("${process.env.IMAGE_BASE_URL}",image) as splash_image from splash_image where id = '${id}'`;
       console.log(sql)
      db(sql, (err, response) => {
          if (!err && response) {
              if (response.length > 0) {
               let finalres = [];
               response.forEach(song => {
                   
                 finalres.push(song);
               })
                 callback(null, finalres);
              }
              else callback(null, response);
          }
          else{
              console.log(err)
             callback(err);   
         } 
      })
  }
  
exports.delete = (id,callback) => {
    db(`DELETE from splash_image where id ='${id}'`, (err, response) => {
        if (!err && response) {
          if (response.length > 0) {
              callback(null, response); 
          }
        else 
        {
              console.log("db err",err);
              callback(err);
        }
        }
    })
}