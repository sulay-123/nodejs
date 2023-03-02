const db = require("../helpers/db.helper");
var path = require('path');
exports.getAllalbum = (callback) => {
     db(`Select album.id,album.name,song_count from album LEFT JOIN (Select album_id,COUNT(id) as song_count from song group by album_id) as count_album
     ON album.id = count_album.album_id  ORDER BY album.name`, (err, response) => {
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

exports.getAdminAlbum = (request,callback) => {
     const filters = {
       pagination: false,
       search: false
     }
   
       let  limit, offset, search;
       let sql =`Select album.id,album.name,song_count from album LEFT JOIN (Select album_id,COUNT(id) as song_count from song group by album_id) as count_album
       ON album.id = count_album.album_id `;
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
       let countsql = `Select count(album.id) as counts from album`;
       console.log(countsql)
         // pagination
         if ( filters.search )
          {
              sql += ` where album.name LIKE '%${search}%'`
              countsql += ` where album.name LIKE '%${search}%'`
          }
          sql += `ORDER BY album.name`;
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
   
   exports.addAdminAlbum = (song,callback) => {
     db(
       `INSERT INTO album (name) values ('${song.name}')`,
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
   exports.getAdminalbumDetails = (id,callback) => {
     let sql = `Select album.id,album.name, group_concat(song.id) as song_data_ids, group_concat(song.name) as song_data_name, 
    group_concat(concat("${process.env.SONG_BASE_URL}",song.url)) as song_data_url, group_concat(song.author_name) as song_data_author_name
     from album LEFT JOIN song ON song.album_id = album.id where album.id = ${id} group by album.id`;
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
   exports.getAdminalbumId = (id,callback) => {
     let sql = `Select album.id,album.name, group_concat(song.id) as song_data_ids, group_concat(song.name) as song_data_name, 
     group_concat(concat("${process.env.SONG_BASE_URL}",song.url)) as song_data_url, group_concat(song.author_name) as song_data_author_name
      from album LEFT JOIN song ON song.album_id = album.id where album.id = ${id} group by album.id`;
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
     db(`DELETE from album where id ='${id}'`, (err, response) => {
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
   
   
   exports.updatealbum = ({ album, id }, callback) => {
     db(`Update album SET ? where id = ?`, [album, id], (err, response) => {
       if (!err) {
         callback(null, response);
       }
       else {
         console.log(`DB Error`, err)
         callback(err);
       }
     });
   };