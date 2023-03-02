const { request } = require("express");
const db = require("../helpers/db.helper");


exports.getGenricSong = (request,callback) => {
    var id = request.query.id;
    var user_id = request.decoded.id;
    console.log(id);
    const filters = {
        pagination: false,
        search: false
      }
    
    let  limit, offset, search;
    //pagination
    if ('limit' in request.query && 'page' in request.query) {
        filters.pagination = true;
        limit = request.query.limit ? request.query.limit : 10;
        offset = (request.page ? Number(request.page) - 1 : 0) * Number(limit);
    }
   
    let sql = `Select genric.genric_id, group_concat(song.id) as song_data_ids, group_concat(song.name) as song_data_name, group_concat(concat("${process.env.SONG_BASE_URL}",song.url)) as song_data_url, group_concat(song.author_name) as song_data_author_name,group_concat(CASE COALESCE(user_favourites.id,'0')  WHEN 0 THEN 0 ELSE 1 END) as song_data_favourites from genric LEFT JOIN geric_song ON geric_song.genric_id = genric.genric_id LEFT JOIN song ON song.id = geric_song.song_id LEFT JOIN ( Select id, user_id, song_id from favourite where user_id = ${user_id} ) as user_favourites
    ON user_favourites.song_id = song.id`;
    //for getting total count while pagination
    let countsql = `Select count(distinct geric_song.song_id) as counts from genric LEFT JOIN geric_song ON geric_song.genric_id = genric.genric_id LEFT JOIN song ON song.id = geric_song.song_id`;
    
    sql += ` where geric_song.genric_id = ${id} and geric_song.is_premium = 0 group by genric.genric_id ORDER BY song.name`;

    countsql += ` where geric_song.genric_id = ${id} and geric_song.is_premium = 0 group by geric_song.song_id`;
    
    console.log(sql)

    console.log(countsql)

      // pagination
    if (filters.pagination) {
        sql += ` limit ${limit} OFFSET ${offset} `
    }
    //for getting total count while pagination
     db(sql, (err, response) => {
         if (!err && response) {
            if (response.length > 0) {
                let finalres = [];
                response.forEach(song => {
                    let song_details = [];
                    song.song_data_ids = song.song_data_ids !== null ? song.song_data_ids.split(',') : [];
                    song.song_data_name = song.song_data_name !== null ? song.song_data_name.split(',') : [];
                    song.song_data_author_name = song.song_data_author_name !== null ? song.song_data_author_name.split(',') : [];
                    song.song_data_url = song.song_data_url !== null ? song.song_data_url.split(',') : [];
                    song.song_data_favourites = song.song_data_favourites !== null ? song.song_data_favourites.split(',') : [];
                    song.song_data_ids.forEach((item, index) => {
                        song_details.push({
                            song_id: song.song_data_ids[index],
                            song_name: song.song_data_name[index],
                            author_name: song.song_data_author_name[index],
                            song_url:song.song_data_url[index],
                            favriout_id:song.song_data_favourites[index]
                       })
                     })
                  song.song = song_details;
                  delete song.song_data_ids;
                  delete song.song_data_name;
                  delete song.song_data_author_name;
                  delete song.song_data_url;
                  delete song.song_data_favourites;
                  finalres.push(song);
               })
               console.log(filters.pagination)
              //  if(filters.pagination === false)
              //  {
              //    return callback(null,finalres)
              //  }
            //    console.log(finalres)
                db(countsql,
                    (err, response) => {
                      if (err)
                      {
                          console.log(err)
                          callback(err)

                      }
                      else {
                        let count = response.length
                        finalres[0].count = count;
                        callback(null, finalres)
                      }
                    })
            }
             else callback(null, response);
         }
         else{
             console.log("db log",err)
            callback(err);   
        } 
     })
}

exports.getdjSong = (request,callback) => {
    var id = request.query.id;
    var user_id = request.decoded.id;
    console.log(id);
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
   
    let sql = `Select genric.genric_id, group_concat(song.id) as song_data_ids, group_concat(song.name) as song_data_name, group_concat(concat("${process.env.SONG_BASE_URL}",song.url)) as song_data_url, group_concat(song.author_name) as song_data_author_name,group_concat(CASE COALESCE(user_favourites.id,'0')  WHEN 0 THEN 0 ELSE 1 END) as song_data_favourites from genric LEFT JOIN geric_song ON geric_song.genric_id = genric.genric_id LEFT JOIN song ON song.id = geric_song.song_id LEFT JOIN ( Select id, user_id, song_id from favourite where user_id = ${user_id} ) as user_favourites
    ON user_favourites.song_id = song.id`;
   //for getting total count while pagination
    let countsql = `Select count(distinct geric_song.song_id) as counts from genric LEFT JOIN geric_song ON geric_song.genric_id = genric.genric_id LEFT JOIN song ON song.id = geric_song.song_id`;
    sql += ` where geric_song.genric_id = ${id} and geric_song.is_premium = 1 group by genric.genric_id ORDER BY song.name `;
    countsql += ` where geric_song.genric_id = ${id} and geric_song.is_premium = 1 group by geric_song.song_id`;
    
    console.log(sql)

    console.log(countsql)
      // pagination
    if (filters.pagination) {
        sql += ` limit ${limit} OFFSET ${offset} `
    }
    //for getting total count while pagination
     db(sql, (err, response) => {
         if (!err && response) {
            if (response.length > 0) {
                let finalres = [];
                response.forEach(song => {
                    let song_details = [];
                    song.song_data_ids = song.song_data_ids !== null ? song.song_data_ids.split(',') : [];
                    song.song_data_name = song.song_data_name !== null ? song.song_data_name.split(',') : [];
                    song.song_data_author_name = song.song_data_author_name !== null ? song.song_data_author_name.split(',') : [];
                    song.song_data_url = song.song_data_url !== null ? song.song_data_url.split(',') : [];
                    song.song_data_favourites = song.song_data_favourites !== null ? song.song_data_favourites.split(',') : [];
                    song.song_data_ids.forEach((item, index) => {
                        song_details.push({
                            song_id: song.song_data_ids[index],
                            song_name: song.song_data_name[index],
                            author_name: song.song_data_author_name[index],
                            song_url:song.song_data_url[index],
                            favriout_id:song.song_data_favourites[index]
                       })
                     })
                  song.song = song_details;
                  delete song.song_data_ids;
                  delete song.song_data_name;
                  delete song.song_data_author_name;
                  delete song.song_data_url;
                  delete song.song_data_favourites;
                  finalres.push(song);
               })
                db(countsql,
                    (err, response) => {
                      if (err)
                      {
                          console.log(err)
                          callback(err)

                      }
                      else {
                        let count = response.length
                        finalres[0].count = count;
                        callback(null, finalres[0])
                      }
                    })
            }
             else callback(null, response);
         }
         else{
             console.log("db log",err)
            callback(err);   
        } 
     })
}

exports.getAdminGenricSong = (request,callback) => {
  var id = request.query.id;
  var user_id = request.decoded.id;
  console.log(id);
  const filters = {
      pagination: false,
      search: false
    }
  
  let  limit, offset, search;
  //pagination
  if ('limit' in request.query && 'page' in request.query) {
      filters.pagination = true;
      limit = request.query.limit ? request.query.limit : 10;
      offset = (request.page ? Number(request.page) - 1 : 0) * Number(limit);
  }
 
  let sql = `Select genric.genric_id,genric.name, group_concat(song.id) as song_data_ids, group_concat(song.name) as song_data_name, group_concat(concat("${process.env.SONG_BASE_URL}",song.url)) as song_data_url, group_concat(song.author_name) as song_data_author_name,group_concat(CASE COALESCE(user_favourites.id,'0')  WHEN 0 THEN 0 ELSE 1 END) as song_data_favourites from genric LEFT JOIN geric_song ON geric_song.genric_id = genric.genric_id LEFT JOIN song ON song.id = geric_song.song_id LEFT JOIN ( Select id, user_id, song_id from favourite where user_id = ${user_id} ) as user_favourites
  ON user_favourites.song_id = song.id`;
  //for getting total count while pagination
  let countsql = `Select count(distinct geric_song.song_id) as counts from genric LEFT JOIN geric_song ON geric_song.genric_id = genric.genric_id LEFT JOIN song ON song.id = geric_song.song_id`;
  
  sql += ` where geric_song.genric_id = ${id} group by genric.genric_id ORDER BY song.name`;

  countsql += ` where geric_song.genric_id = ${id} group by geric_song.song_id`;
  
  console.log(sql)

  console.log(countsql)

    // pagination
  if (filters.pagination) {
      sql += ` limit ${limit} OFFSET ${offset} `
  }
  //for getting total count while pagination
    db(sql, (err, response) => {
       if (!err && response) {
          if (response.length > 0) {
              let finalres = [];
              response.forEach(song => {
                  let song_details = [];
                  song.song_data_ids = song.song_data_ids !== null ? song.song_data_ids.split(',') : [];
                  song.song_data_name = song.song_data_name !== null ? song.song_data_name.split(',') : [];
                  song.song_data_author_name = song.song_data_author_name !== null ? song.song_data_author_name.split(',') : [];
                  song.song_data_url = song.song_data_url !== null ? song.song_data_url.split(',') : [];
                  song.song_data_favourites = song.song_data_favourites !== null ? song.song_data_favourites.split(',') : [];
                  song.song_data_ids.forEach((item, index) => {
                      song_details.push({
                          song_id: song.song_data_ids[index],
                          song_name: song.song_data_name[index],
                          author_name: song.song_data_author_name[index],
                          song_url:song.song_data_url[index],
                          favriout_id:song.song_data_favourites[index]
                     })
                   })
                song.song = song_details;
                delete song.song_data_ids;
                delete song.song_data_name;
                delete song.song_data_author_name;
                delete song.song_data_url;
                delete song.song_data_favourites;
                finalres.push(song);
             })
             console.log(filters.pagination)
            //  if(filters.pagination === false)
            //  {
            //    return callback(null,finalres)
            //  }
          //    console.log(finalres)
              db(countsql,
                  (err, response) => {
                    if (err)
                    {
                        console.log(err)
                        callback(err)

                    }
                    else {
                      let count = response.length
                      finalres[0].count = count;
                      callback(null, finalres)
                    }
                  })
          }
           else callback(null, response);
       }
       else{
           console.log("db log",err)
          callback(err);   
      } 
   })
}

exports.getAdminGenricSongId = (id,callback) => {
  let sql = `Select genric.genric_id,genric.name, group_concat(song.id) as song_data_ids, group_concat(song.name) as song_data_name, group_concat(concat("${process.env.SONG_BASE_URL}",song.url)) as song_data_url, group_concat(song.author_name) as song_data_author_name,group_concat(CASE COALESCE(user_favourites.id,'0')  WHEN 0 THEN 0 ELSE 1 END) as song_data_favourites from genric LEFT JOIN geric_song ON geric_song.genric_id = genric.genric_id LEFT JOIN song ON song.id = geric_song.song_id LEFT JOIN ( Select id, user_id, song_id from favourite where user_id = ${user_id} ) as user_favourites
  ON user_favourites.song_id = song.id`;
  sql += ` where geric_song.genric_id = ${id} group by genric.genric_id`;
  db(sql, (err, response) => {
    if (!err && response) {
       if (response.length > 0) {
           let finalres = [];
           response.forEach(song => {
               let song_details = [];
               song.song_data_ids = song.song_data_ids !== null ? song.song_data_ids.split(',') : [];
               song.song_data_name = song.song_data_name !== null ? song.song_data_name.split(',') : [];
               song.song_data_author_name = song.song_data_author_name !== null ? song.song_data_author_name.split(',') : [];
               song.song_data_url = song.song_data_url !== null ? song.song_data_url.split(',') : [];
               song.song_data_favourites = song.song_data_favourites !== null ? song.song_data_favourites.split(',') : [];
               song.song_data_ids.forEach((item, index) => {
                   song_details.push({
                       song_id: song.song_data_ids[index],
                       song_name: song.song_data_name[index],
                       author_name: song.song_data_author_name[index],
                       song_url:song.song_data_url[index],
                       favriout_id:song.song_data_favourites[index]
                  })
                })
             song.song = song_details;
             delete song.song_data_ids;
             delete song.song_data_name;
             delete song.song_data_author_name;
             delete song.song_data_url;
             delete song.song_data_favourites;
             finalres.push(song);
          })
          callback(null, finalres)
       }
        else callback(null, response);
    }
    else{
        console.log("db log",err)
       callback(err);   
   } 
})
}

exports.getAdminGenricIdSong = (id,callback) => {
  let sql = `Select genric.genric_id,genric.name,genric.genric_type, group_concat(song.id) as song_data_ids, group_concat(song.name) as song_data_name, group_concat(concat("${process.env.SONG_BASE_URL}",song.url)) as song_data_url, group_concat(song.author_name) as song_data_author_name from genric LEFT JOIN geric_song ON geric_song.genric_id = genric.genric_id LEFT JOIN song ON song.id = geric_song.song_id`;
  sql += ` where genric.genric_id = ${id.query.id} group by genric.genric_id`;
  console.log(sql)
  db(sql, (err, response) => {
    if (!err && response) {
       if (response.length > 0) {
           let finalres = [];
           response.forEach(song => {
               let song_details = [];
               song.song_data_ids = song.song_data_ids !== null ? song.song_data_ids.split(',') : [];
               song.song_data_name = song.song_data_name !== null ? song.song_data_name.split(',') : [];
               song.song_data_author_name = song.song_data_author_name !== null ? song.song_data_author_name.split(',') : [];
               song.song_data_url = song.song_data_url !== null ? song.song_data_url.split(',') : [];
               song.song_data_ids.forEach((item, index) => {
                   song_details.push({
                       song_id: song.song_data_ids[index],
                       song_name: song.song_data_name[index],
                       author_name: song.song_data_author_name[index],
                       song_url:song.song_data_url[index]
                  })
                })
             song.song = song_details;
             delete song.song_data_ids;
             delete song.song_data_name;
             delete song.song_data_author_name;
             delete song.song_data_url;
             finalres.push(song);
          })
          callback(null, finalres)
       }
        else callback(null, response);
    }
    else{
        console.log("db log",err)
       callback(err);   
   } 
  })
}