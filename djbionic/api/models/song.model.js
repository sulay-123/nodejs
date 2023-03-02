const { request } = require("express");
const db = require("../helpers/db.helper");
var path = require('path');
exports.getSong = (request,user_id,callback) => {
    const filters = {
        pagination: false,
        search: false
      }
    
    let  limit, offset, search;
    let sql =`Select song.id as song_id,song.name as song_name, concat("${process.env.SONG_BASE_URL}",url) as song_url, song.author_name,song.is_premium,CASE COALESCE(user_favourites.favourite_id,'0') WHEN 0 THEN '0' ELSE '1' END as favriout_id from song LEFT JOIN ( Select id as favourite_id, user_id, song_id from favourite where user_id = ${user_id}) as user_favourites ON user_favourites.song_id = song.id where song.is_premium = 0 ORDER BY song.name DESC`;
    //pagination
    if ('limit' in request.query && 'page' in request.query) {
        filters.pagination = true;
        limit = request.query.limit ? request.query.limit : 10;
        offset = (request.query.page ? Number(request.query.page) - 1 : 0) * Number(limit);
    }
     //for getting total count while pagination
     let countsql = `Select count(song.id) as counts from song where song.is_premium = 0`;
     
       // pagination
     if (filters.pagination) {
         sql += ` limit ${limit} OFFSET ${offset} `
     }
     console.log(countsql)
     console.log(sql);
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

exports.getnewSong = (request,user_id,callback) => {
  let id = request.query.id;
    const filters = {
        pagination: false,
        search: false
      }
    
    let  limit, offset, search;
    //pagination
    if ('limit' in request.query && 'page' in request.query) {
        filters.pagination = true;
        limit = request.query.limit ? request.query.limit : 10;
        offset = (request.query.page ? Number(request.query.page) - 1 : 0) * Number(limit);
    }
    let sql = `Select song.id as song_id,song.name as song_name, concat("${process.env.SONG_BASE_URL}",url) as song_url, song.author_name,song.is_premium,CASE COALESCE(user_favourites.favourite_id,'0') WHEN 0 THEN '0' ELSE '1' END as favriout_id from song LEFT JOIN ( Select id as favourite_id, user_id, song_id from favourite where user_id = ${user_id}) as user_favourites ON user_favourites.song_id = song.id where song.album_id = ${id} ORDER BY song.name DESC`;
    console.log(sql)
    //for getting total count while pagination
    let countsql = `Select count(song.id) as counts from song where song.album_id = ${id} ORDER BY song.name DESC`;
    console.log(countsql)
      // pagination
    if (filters.pagination) {
        sql += ` limit ${limit} OFFSET ${offset} `
    }
    db(sql, (err, response) => {
        if (!err && response) {
            if (response.length > 0) {
                let finalres = [];
                response.forEach(song => {
                  // song.favriout_id = song.favriout_id.toString;
                  finalres.push(song);
               })
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
            //    console.log(finalres)
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

exports.getAdminSong = (request,callback) => {
  const filters = {
    pagination: false,
    search: false
  }

    let  limit, offset, search;
    let sql =`Select id as song_id,name as song_name,concat("${process.env.SONG_BASE_URL}",url) as song_url,author_name,is_premium from song`;
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
    let countsql = `Select count(song.id) as counts from song`;
    console.log(countsql)
      // pagination
      if ( filters.search )
       {
           sql += ` where name LIKE '%${search}%'`
           countsql += ` where name LIKE '%${search}%'`
       }
       sql += `ORDER BY song.name`;
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

exports.addAdminSong = (song,callback) => {
  let song_url  = path.parse(song.url).base;
  let album_id = song.album_id ? song.album_id : 0
  db(
    `INSERT INTO song (name,url,author_name,is_premium,album_id,new_song) values ('${song.name}','${song_url}','${song.author_name}','${song.is_premium}','${album_id}','${song.new_song}')`,
    (err, response) => {
      if (err) {
        console.log(err)
        callback(err)
      }
      else {
        if(response && song.genric_id)
        {
          db(
            `INSERT INTO geric_song (song_id,genric_id,is_premium) values ('${response.insertId}','${song.genric_id}','${song.is_premium}')`,
            (genricerr, genricresponse) => {
              if (genricerr) {
                console.log(genricerr)
                callback(genricerr)
              }
              else {
                callback(null, genricresponse);
              }
            });
        }
        else
          callback(null, response);
      }
    }
  );
}

exports.getAdminSongId = (id,callback) => {
  let sql = `Select song.id as song_id,song.name as song_name,
    concat("${process.env.SONG_BASE_URL}",song.url) as song_url,song.author_name,song.is_premium,song.new_song,group_concat(geric_song.genric_id) as genric_data_genric_ids,group_concat(genric.name) as genric_data_genric_names,group_concat(album.id) as id,group_concat(album.name) as name from song left join geric_song on geric_song.song_id = song.id left join genric on genric.genric_id = geric_song.genric_id left join album on album.id = song.album_id where song.id = ${id} group by song.id`;
    console.log(sql)
   db(sql, (err, response) => {
       if (!err && response) {
           if (response.length > 0) {
              let finalres = [];
              response = response.map(user => {
                let genric = [];
                    user.genric_data_genric_ids = user.genric_data_genric_ids != null ? user.genric_data_genric_ids.split(',') : [];
                    user.genric_data_genric_names = user.genric_data_genric_names != null ? user.genric_data_genric_names.split(',') : [];
                    user.genric_data_genric_ids.forEach((item, index) => {
                      genric.push({
                             genric__id: user.genric_data_genric_ids[index],
                             genric_name: user.genric_data_genric_names[index]
                        })
                      })
                  user.genric_details = genric;
                  delete user.genric_data_genric_names;
                  delete user.genric_data_genric_ids;
                  delete user.created_at;
                  delete user.updated_at;
                  finalres.push(user);
              });
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
  db(`DELETE from song where id ='${id}'`, (err, response) => {
      if (!err && response) {
        if (response.length > 0) {
            db(`select * from favourite where song_id='${id}'`, (err, response) => {
              if (!err && response) {
                  if (response.length > 0) {
                      db(`DELETE from favourite where song_id='${id}'`, (err, response) => {
                          if (!err && response) {
                            db(`select * from playlist_song where song_id='${id}'`, (err, response) => {
                              if (!err && response) {
                                  if (response.length > 0) {
                                      db(`DELETE from playlist_song where song_id='${id}'`, (err, response) => {
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

exports.update = ({ song, song_id }, callback) => {
  db(`Update song SET ? where id = ?`, [song, song_id], (err, response) => {
    if (!err) {
      callback(null, response);
    }
    else {
      console.log(`DB Error`, err)
      callback(err);
    }
  });
};

exports.updategenric = ({ geric_song, song_id }, callback) => {
  db(`Update geric_song SET ? where song_id = ?`, [geric_song, song_id], (err, response) => {
    if (!err) {
      callback(null, response);
    }
    else {
      console.log(`DB Error`, err)
      callback(err);
    }
  });
};