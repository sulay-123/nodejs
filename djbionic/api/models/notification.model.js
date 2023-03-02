const db = require("../helpers/db.helper");
var path = require('path');
let { send_notification } = require('../helpers/firebase.helper');

exports.getAdminnotification = (request,callback) => {
     const filters = {
       pagination: false,
       search: false
     }
   
       let  limit, offset, search;
       let sql =`Select id,title,msg,concat("${process.env.IMAGE_BASE_URL}",image)  as notification_image from notification`;
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
       let countsql = `Select count(id) as counts from notification`;
       console.log(countsql)
         // pagination
         if ( filters.search )
          {
              sql += ` where title LIKE '%${search}%'`
              countsql += ` where title LIKE '%${search}%'`
          }
        sql += `order by title `;
       if (filters.pagination) {
           sql += ` limit ${limit} OFFSET ${offset} `
       }
       console.log(sql)
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
   
exports.addAdminnotification = (notification,callback) => {
     let image = '';
     if(notification.image)
     {
           image  = path.parse(notification.image).base;
     }
     console.log(`INSERT INTO notification (title,msg,image) values ('${notification.title}','${notification.message}','${image}'`);
     db(
       `INSERT INTO notification (title,msg,image) values ('${notification.title}','${notification.message}','${image}')`,
       (err, response) => {
         if (err) {
           console.log(err)
           callback(err)
         }
         else {
          if(notification.image){
               var payload = {
                    notification: {
                        title: notification.title,
                        body: notification.message,
                        image: notification.image
                    }
               };
          }
          else
          {
               var payload = {
                    notification: {
                        title: notification.title,
                        body: notification.message
                    }
                };
          }
          let topic = "";
          if(notification.user_type == 1)
          {
             topic = "/topics/djbionico";
          }
          else{
            topic = "/topics/login";
          }
          send_notification(payload,topic)
          callback(null, response);
         }
     }
     );
}
   exports.getAdminnotificationId = (id,callback) => {
     let sql = `Select id,title,msg,concat("${process.env.IMAGE_BASE_URL}",image)  as notification_image from notification where id = ${id}`;
        console.log(sql)
       db(sql, (err, response) => {
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
   
exports.delete = (id,callback) => {
     db(`DELETE from notification where id ='${id}'`, (err, response) => {
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