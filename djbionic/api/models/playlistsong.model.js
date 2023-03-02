const db = require("../helpers/db.helper");

exports.createPlaylistsong = (user, callback) => {
     console.log(`INSERT INTO playlist_song (song_id,playlist_id) values ('${user.body.song_id}','${user.body.playlist_id}')`)
  db(
    `INSERT INTO playlist_song (song_id,playlist_id) values ('${user.body.song_id}','${user.body.playlist_id}')`,
    (err, response) => {
      if (err) callback(err);
      else {
           console.log("db err",err);
           callback(null, response);
      }
    }
  );
};

exports.isPlaylistsongExist = (request, callback) => {
     /** Here all columns are taken from users table because of Checking Password Validation Login time */
     let song_id = request.body.song_id;
     let playlist_id = request.body.playlist_id;
     console.log(`Select id,song_id,playlist_id from playlist_song where song_id = '${song_id}' and playlist_id= '${playlist_id}'`)
     db(`Select id,song_id,playlist_id from playlist_song where song_id = '${song_id}' and playlist_id= '${playlist_id}'`, (err, response) => {
          if (!err && response) callback(null, response);
          else {
               console.log("db err",err);
               callback(null, response);
          }
     });
};

exports.getPlaylistsongplay_id = (playlist_id,user_id,callback) => {
     // var user_id = playlist_id.decoded.id;
     console.log(playlist_id)
     let sql = `Select playlist.id,playlist.name, count , group_concat(song.id) as song_data_ids, group_concat(song.name) as song_data_name, group_concat(concat("${process.env.SONG_BASE_URL}",song.url)) as song_data_url, group_concat(song.author_name) as song_data_author_name,group_concat(CASE COALESCE(user_favourites.id,'0')  WHEN 0 THEN 0 ELSE 1 END) as song_data_favourites from playlist LEFT JOIN (Select playlist_id,COUNT(song_id) as count from playlist_song group by playlist_id) as count_user ON playlist.id = count_user.playlist_id LEFT JOIN playlist_song ON playlist_song.playlist_id = playlist.id LEFT JOIN song ON song.id = playlist_song.song_id LEFT JOIN ( Select id, user_id, song_id from favourite where user_id = ${user_id} ) as user_favourites
     ON user_favourites.song_id = song.id`;
     sql += ` where playlist_song.playlist_id = ${playlist_id} group by playlist.id ORDER BY song.name`;
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

exports.removeplaylistfromuser = (request,callback) => {
     let playlist_id = request.query.playlist_id;
     let song_id = request.query.id;
     console.log(`DELETE from playlist_song where song_id ='${song_id}' and playlist_id='${playlist_id}'`);
     db(`DELETE from playlist_song where song_id ='${song_id}' and playlist_id='${playlist_id}'`, (err, response) => {
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

exports.getPlaylistByid = (request,callback) => {
     let playlist_id = request.query.playlist_id;
     let song_id = request.query.id;
     console.log(`Select id,song_id,playlist_id from playlist_song where song_id ='${song_id}' and playlist_id='${playlist_id}'`);
     db(`Select id,song_id,playlist_id from playlist_song where song_id ='${song_id}' and playlist_id='${playlist_id}'`, (err, response) => {
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