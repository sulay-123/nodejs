const db = require("../helpers/db.helper");

exports.getGenric = (callback) => {
    console.log(`Select genric.genric_id,genric.name,concat("${process.env.IMAGE_BASE_URL}",genric.image) as image,song_count from genric LEFT JOIN (Select genric_id,COUNT(id) as song_count from geric_song where is_premium = 0 group by genric_id) as count_genric
    ON genric.genric_id = count_genric.genric_id`);
     db(`Select genric.genric_id,genric.name,concat("${process.env.IMAGE_BASE_URL}",genric.image) as image,song_count from genric LEFT JOIN (Select genric_id,COUNT(id) as song_count from geric_song where is_premium = 0 group by genric_id) as count_genric
     ON genric.genric_id = count_genric.genric_id where genric.genric_type = 0 ORDER BY genric.name`, (err, response) => {
         if (!err && response) {
             if (response.length > 0) {
                callback(null, response);
             }
             else callback(null, response);
         }
         else{
             console.log(err)
            callback(err);   
        } 
     })
}

exports.getdj = (callback) =>{
    console.log(`Select genric.genric_id,genric.name,concat("${process.env.IMAGE_BASE_URL}",genric.image) as image,song_count from genric LEFT JOIN (Select genric_id,COUNT(id) as song_count from geric_song where is_premium = 1 group by genric_id) as count_genric
    ON genric.genric_id = count_genric.genric_id`);
     db(`Select genric.genric_id,genric.name,concat("${process.env.IMAGE_BASE_URL}",genric.image) as image,song_count from genric LEFT JOIN (Select genric_id,COUNT(id) as song_count from geric_song where is_premium = 1 group by genric_id) as count_genric
     ON genric.genric_id = count_genric.genric_id where genric.genric_type = 1 ORDER BY genric.name`, (err, response) => {
         if (!err && response) {
             if (response.length > 0) {
                callback(null, response);
             }
             else callback(null, response);
         }
         else{
             console.log(err)
            callback(err);   
        } 
     })
}

exports.getAdminGenric = (req,callback) => {
    const filters = {
        pagination: false,
        search: false
      }
      let sql;
      if('genric_type' in req.query)
      {
           sql = `Select genric.genric_id,genric.name,concat("${process.env.IMAGE_BASE_URL}",genric.image) as image,song_count,genric_type from genric LEFT JOIN (Select genric_id,COUNT(id) as song_count from geric_song group by genric_id) as count_genric
          ON genric.genric_id = count_genric.genric_id where genric.genric_type=1`;
      }
      else{
           sql = `Select genric.genric_id,genric.name,concat("${process.env.IMAGE_BASE_URL}",genric.image) as image,song_count,genric_type from genric LEFT JOIN (Select genric_id,COUNT(id) as song_count from geric_song group by genric_id) as count_genric
          ON genric.genric_id = count_genric.genric_id where genric.genric_type=0`;
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
      //for getting total count while pagination
      let countsql = `Select count(genric.genric_id) as counts from genric LEFT JOIN (Select genric_id,COUNT(id) as song_count from geric_song  group by genric_id) as count_genric
      ON genric.genric_id = count_genric.genric_id where genric.genric_type=0`;
        // pagination
        if ( filters.search )
        {
           sql += ` and genric.name LIKE '%${search}%'`
           countsql += ` and genric.name LIKE '%${search}%'`
        }
        sql += ` ORDER BY genric.name`;
        if (filters.pagination) {
            sql += ` limit ${limit} OFFSET ${offset} `
        }
        console.log(sql)
     db(sql, (err, response) => {
         if (!err && response) {
             if (response.length > 0) {
                let finalres = [];
                response = response.map(user => {
                    delete user.created_at;
                    delete user.updated_at;
                    finalres.push(user);
                });
               
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
             else callback(null, response);
         }
         else{
             console.log(err)
            callback(err);   
        } 
     })
}

exports.getGenricAdmin = (req,callback) =>{
    const filters = {
        pagination: false,
        search: false
      }
      let sql;
     
        sql = `Select genric.genric_id,genric.name,concat("${process.env.IMAGE_BASE_URL}",genric.image) as image,song_count,genric_type from genric LEFT JOIN (Select genric_id,COUNT(id) as song_count from geric_song group by genric_id) as count_genric ON genric.genric_id = count_genric.genric_id`;
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
      //for getting total count while pagination
      let countsql = `Select count(genric.genric_id) as counts from genric LEFT JOIN (Select genric_id,COUNT(id) as song_count from geric_song  group by genric_id) as count_genric
      ON genric.genric_id = count_genric.genric_id`;
        // pagination
        if ( filters.search )
        {
           sql += ` where genric.name LIKE '%${search}%'`
           countsql += ` where genric.name LIKE '%${search}%'`
        }
        sql += ` ORDER BY genric.name`;
        if (filters.pagination) {
            sql += ` limit ${limit} OFFSET ${offset} `
        }

        console.log(sql)
     db(sql, (err, response) => {
         if (!err && response) {
             if (response.length > 0) {
                let finalres = [];
                response = response.map(user => {
                    delete user.created_at;
                    delete user.updated_at;
                    finalres.push(user);
                });
               
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
             else callback(null, response);
         }
         else{
             console.log(err)
            callback(err);   
        } 
     })
}
exports.addAdminGenric = (genric,callback) => {
    console.log(`INSERT INTO genric (name,genric_type) values ('${genric.name}','${genric.genric_type}')`);
    db(
        `INSERT INTO genric (name,genric_type) values ('${genric.name}','${genric.genric_type}')`,
        (err, response) => {
          if (err) {
            console.log(err)
            callback(err)
          }
          else callback(null,response)
    })
}

/** update Single Column */
exports.updateSingleColumn = ({ key, value, id }, callback) => {
    console.log(`Update genric SET ${key} = '${value}' where genric_id = '${id}'`)
    db(`Update genric SET ${key} = '${value}' where genric_id = '${id}'`, (err, response) => {
      if (err){
        // console.log(err)
        callback(err);
      } 
      else callback(null, response);
    })
}

exports.update = ({ genric, id }, callback) => {
    db(`Update genric SET ? where genric_id = ?`, [genric, id], (err, response) => {
      if (!err) {
        callback(null, response);
      }
      else {
        console.log(`DB Error`, err)
        callback(err);
      }
    });
  };

exports.getAdminGenricSongId = (id,callback) => {
    let sql = `Select * from genric where genric_id = ${id}`;
     db(sql, (err, response) => {
         if (!err && response) {
             if (response.length > 0) {
                let finalres = [];
                response = response.map(user => {
                    delete user.created_at;
                    delete user.updated_at;
                    finalres.push(user);
                });
                callback(null, response);
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
    db(`DELETE from genric where genric_id ='${id}'`, (err, response) => {
        if (!err && response) {
            if (response.length > 0) {
                db(`select * from geric_song where genric_id='${id}'`, (err, response) => {
                    if (!err && response) {
                        if (response.length > 0) {
                            db(`DELETE from geric_song where genric_id='${id}'`, (err, response) => {
                                if (!err && response) {
                                    // if (response.length > 0) {
                                    //    callback(null, response);   
                                    // }
                                     callback(null, response);
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