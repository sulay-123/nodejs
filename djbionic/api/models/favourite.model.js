const db = require("../helpers/db.helper");



exports.createfavourite = (user, callback) => {
     let user_id = user.decoded.id;
     let song_id = user.body.song_id;
     console.log(`INSERT INTO favourite (user_id,song_id) values ('${user_id}','${song_id}')`)
  db(
    `INSERT INTO favourite (user_id,song_id) values ('${user_id}','${song_id}')`,
    (err, response) => {
      if (err) callback(err);
      else {
           console.log("db err",err);
           callback(null, response);
      }
    }
  );
};

exports.isfavouriteExist = (request, callback) => {
     /** Here all columns are taken from users table because of Checking Password Validation Login time */
     let user_id = request.decoded.id;
     let song_id = request.body.song_id;
     console.log(`Select * from favourite where user_id = '${user_id}' and song_id= '${song_id}'`)
     db(`Select * from favourite where user_id = '${user_id}' and song_id= '${song_id}'`, (err, response) => {
          if (!err && response) callback(null, response);
          else {
               console.log("db err",err);
               callback(null, response);
          }
     });
};

exports.getfavouriteuser_id = (user_id,callback) => {
     let sql = `Select user.id, group_concat(song.id) as song_data_ids, group_concat(song.name) as song_data_name, group_concat(concat("${process.env.SONG_BASE_URL}",song.url)) as song_data_url, group_concat(song.author_name) as song_data_author_name,group_concat(CASE COALESCE(user_favourites.id,'0')  WHEN 0 THEN 0 ELSE 1 END) as song_data_favourites from user LEFT JOIN favourite ON favourite.user_id = user.id LEFT JOIN song ON song.id = favourite.song_id LEFT JOIN ( Select id, user_id, song_id from favourite where user_id = ${user_id} ) as user_favourites ON user_favourites.song_id = song.id`;
     sql += ` where favourite.user_id = ${user_id} group by user.id ORDER BY song.name`;
     console.log(sql)
     db(sql, (err, response) => {
         if (!err && response) {
             if (response.length > 0) {
               response = response.map(song => {
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
                  return song;
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

exports.removefavouritefromuser = (favourite_id,callback) => {
     console.log(`DELETE from favourite where id ='${favourite_id}'`);
     db(`DELETE from favourite where id ='${favourite_id}'`, (err, response) => {
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

exports.getfavouriteByid = (id,callback) => {
     console.log(`Select id,user_id,song_id from favourite where id ='${id}'`);
     db(`Select id,user_id,song_id from favourite where id ='${id}'`, (err, response) => {
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

exports.unfavouritefromuser = (request,callback) => {
     let user_id = request.decoded.id;
     let song_id = request.body.song_id;
     console.log(`DELETE from favourite where user_id = '${user_id}' and song_id= '${song_id}'`);
     db(`DELETE from favourite where user_id = '${user_id}' and song_id= '${song_id}'`, (err, response) => {
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