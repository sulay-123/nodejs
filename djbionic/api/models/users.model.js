const db = require("../helpers/db.helper");



exports.createUser = (user, callback) => {
  db(
    `INSERT INTO user (fname,lname,email,password,device_id,is_approve) values ('${user.fname}','${user.lname}','${user.email}','${user.password}','${user.device_id}',1)`,

    (err, response) => {
      if (err) callback(err);
      else callback(null, response);
    }
  );
};

/** update user */
exports.updateuser = ({ user, device_id }, callback) => {
  db(`Update user SET ? where device_id = ?`, [user, device_id], (err, response) => {
    // console.log(response)
    if (!err) callback(null, response);
    else callback(err);
  });
};

exports.isUserExistByDeviceId = (device_id, callback) => {
  /** Here all columns are taken from users table because of Checking Password Validation Login time */
  db(`Select * from user where device_id = '${device_id}'`, (err, response) => {
    if (!err && response) callback(null, response);
    else callback(err);
  });
};

exports.createUserByDeviceId = (user, callback) => {
  db(
    `INSERT INTO user (device_id) values ('${user.device_id}')`,
    (err, response) => {
      if (err) callback(err);
      else {

        callback(null, response);
      }
    }
  );
};



exports.updateSingleColumn = ({ key, value, user_id }, callback) => {
  db(`Update user SET ${key} = '${value}' where id = '${user_id}'`, (err, response) => {
    if (err) callback(err);
    else callback(null, response);
  })
}

exports.getUserFromId = (userid, callback) => {
  console.log(`Select * from user where id = '${userid}'`)
  db(`Select * from user where id = '${userid}'`, (err, response) => {
    if (!err && response && response.length > 0) callback(null, response);
    else callback(err);
  });
};

exports.getUserByDeviceId = (deviceid, callback) => {
  db(`Select * from user where device_id = '${deviceid}'`, (err, response) => {
    console.log(response)
    if (!err && response) {
      if(response.length !== 0)
      {
        response = response.map(user => {
          delete user.created_at;
          delete user.updated_at;
          delete user.password;
          delete user.role;
          return user;
        })
        callback(null, response);
      }
      else callback('user not found');
    }
    else callback(err);
  });
};

exports.getUserFromEmail = (email, callback) => {
  db(`Select * from user where email = '${email}'`, (err, response) => {
    if (!err && response && response.length > 0) callback(null, response);
    else callback(err);
  });
};

exports.isUserExistByEmailId = (email, callback) => {
  /** Here all columns are taken from users table because of Checking Password Validation Login time */
  console.log(`Select * from user where email = '${email}'`);
  db(`Select * from user where email = '${email}'`, (err, response) => {
    if (!err && response && response.length >= 0) 
    if(response.length !== 0)
    {
      response = response.map(user => {
        delete user.created_at;
          delete user.updated_at;
        return user;
      })
      callback(null, response);
    }
    else callback(null, response);
    else callback(err);
  });
};

exports.isUserExist = (email, callback) => {
  db(`Select * from user where email = '${email}'`, (err, response) => {
    if (!err && response) callback(null, response);
    else callback(err);
  });
};

exports.getdashboard = (callback) => {

  let sql = `
        SELECT 
          COUNT(*) AS users_count
      FROM user where role != 1 and is_approve!=0;`
    
  sql += `select Count(*) as event_count from event;`

  sql +=`select Count(*) as genric_count from genric;`

  sql +=`select Count(*) as song_count from song;`

  sql += `
  SELECT 
    COUNT(*) AS users_count
  FROM user where role != 1 and is_approve!=0 and created_at >= curdate();`

  sql += `select Count(*) as event_count from event where created_at >= curdate();`

  sql += `select Count(*) as genric_count from genric where created_at >= curdate();`
  sql += `select Count(*) as song_count from song where created_at >= curdate();`
  console.log(sql)

  db(sql,
    (err, countresponse) => {
      if (err)
        callback(err)
      else {
        console.log(countresponse)
        let res = {
          usersCount : countresponse[0][0].users_count,
          eventcount: countresponse[1][0].event_count,
          genriccount: countresponse[2][0].genric_count,
          songcount: countresponse[3][0].song_count,
          userstodayCount : countresponse[4][0].users_count,
          eventtodaycount: countresponse[5][0].event_count,
          genrictodaycount: countresponse[6][0].genric_count,
          songtodaycount: countresponse[7][0].song_count
        }
        callback(null, res )
      }
    })

}

/** update Single Column */
exports.updateSingleColumn = ({ key, value, user_id }, callback) => {
  console.log(`Update user SET ${key} = '${value}' where id = '${user_id}'`)
  db(`Update user SET ${key} = '${value}' where id = '${user_id}'`, (err, response) => {
    if (err){
      // console.log(err)
      callback(err);
    } 
    else callback(null, response);
  })
}

exports.getUser = (req,callback) => {
  const filters = {
    pagination: false,
    search: false
  }
  let sql = `Select * from user where role != 1 and is_approve!=0`;
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
  let countsql = `Select count(id) as counts from user where role != 1 and is_approve!=0`;
    // pagination
    if ( filters.search )
    {
       sql += ` and fname LIKE '%${search}%'`
       countsql += ` and fname LIKE '%${search}%'`
    }

    sql += `ORDER BY fname`;

    if (filters.pagination) {
        sql += ` limit ${limit} OFFSET ${offset} `
    }

    db(sql, (err, response) => {
        if (!err && response) {
            if (response.length > 0) {
              let finalres = [];
                response = response.map(user => {
                    delete user.created_at;
                    delete user.updated_at;
                    delete user.password;
                    delete user.device_id;
                    delete user.verify_token;
                    delete user.role;
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
         else 
         {
               console.log("db err",err);
               callback(err);
         }
        });
}

exports.getcontact = (req,callback) => {
  const filters = {
    pagination: false,
    search: false
  }
  let sql = `Select * from contact`;
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
  let countsql = `Select count(id) as counts from contact`;
    // pagination
    if ( filters.search )
    {
       sql += ` where name LIKE '%${search}%'`
       countsql += ` where name LIKE '%${search}%'`
    }
    sql += `ORDER BY name`
    if (filters.pagination) {
        sql += ` limit ${limit} OFFSET ${offset} `
    }

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
         else 
         {
               console.log("db err",err);
               callback(err);
         }
        });
}
