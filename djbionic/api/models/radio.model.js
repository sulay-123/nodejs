const db = require("../helpers/db.helper");

exports.getRadio = (callback) => {
     db(`Select id,name,link from radio`, (err, response) => {
         if (!err && response) {
             if (response.length > 0) {
                callback(null, response);   
             }
             else callback(null, response);
         }
         else callback(err);
     })
}

exports.updateSingleColumn = ({ key, value, id }, callback) => {
    console.log(`Update radio SET ${key} = '${value}' where id = '${id}'`)
    db(`Update radio SET ${key} = '${value}' where id = '${id}'`, (err, response) => {
      if (err){
        // console.log(err)
        callback(err);
      } 
      else callback(null, response);
    })
}

exports.getradioByID = (id,callback)=>{
    let sql = `Select id,name,link from radio where id = '${id}'`;
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