const db = require("../helpers/db.helper");



exports.createPlaylist = (user, callback) => {
     let user_id = user.decoded.id;
     let name = user.body.name;
     console.log(`INSERT INTO playlist (user_id,name) values ('${user_id}','${name}')`)
  db(
    `INSERT INTO playlist (user_id,name) values ('${user_id}','${name}')`,
    (err, response) => {
      if (err) callback(err);
      else {
           callback(null, response);
      }
    }
  );
};

exports.isPlaylistExist = (request, callback) => {
     /** Here all columns are taken from users table because of Checking Password Validation Login time */
     let user_id = request.decoded.id;
     let name = request.body.name;
     console.log(`Select * from playlist where user_id = '${user_id}' and name= '${name}'`)
     db(`Select * from playlist where user_id = '${user_id}' and name= '${name}'`, (err, response) => {
          if (!err && response) callback(null, response);
          else {
               console.log("db err",err);
               callback(null, response);
          }
     });
};

exports.getPlaylistuser_id = (user_id,callback) => {
     console.log(`Select playlist.id as id,playlist.name,playlist.user_id,song_count from playlist LEFT JOIN (Select COUNT(song_id) as song_count,playlist_id from playlist_song group by playlist_id) as count_playlist ON playlist.id = count_playlist.playlist_id where playlist.user_id ='${user_id}'`);
     db(`Select playlist.id as id,playlist.name,playlist.user_id,song_count from playlist LEFT JOIN (Select COUNT(song_id) as song_count,playlist_id from playlist_song group by playlist_id) as count_playlist ON playlist.id = count_playlist.playlist_id where playlist.user_id ='${user_id}' ORDER BY playlist.name `, (err, response) => {
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

exports.removeplaylistfromuser = (playlist_id,callback) => {
     console.log(`DELETE from playlist where id ='${playlist_id}'`);
     db(`DELETE from playlist where id ='${playlist_id}'`, (err, response) => {
         if (!err && response) {
             if (response.length > 0) {
               db(`DELETE from playlist_song where playlist_id='${playlist_id}'`, (err, response) => {
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

exports.getPlaylistByid = (id,callback) => {
     console.log(`Select id,user_id,name from playlist where id ='${id}'`);
     db(`Select id,user_id,name from playlist where id ='${id}'`, (err, response) => {
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