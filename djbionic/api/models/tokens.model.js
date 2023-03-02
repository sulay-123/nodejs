const db = require("../helpers/db.helper");

exports.isTokenExist = (refresh_token, callback) => {
  db(
    `Select * from tokens where refresh_token = '${refresh_token}'`,
    (err, response) => {
      if (!err && response) callback(null, response);
      else callback(err);
    }
  );
};

exports.createToken = ({ user_id , refresh_token, user_agent }, callback) => {
  db(
    `INSERT INTO tokens (user_id,refresh_token,user_agent) values ('${user_id}','${refresh_token}','${user_agent}')`,
    (err, response) => {
      if (err) callback(err);
      else callback(null, response);
    }
  );
};

exports.updateSingleColumn = ({ key, value, id }, callback) => {
  db(`Update tokens SET ${key} = '${value}' where id = '${id}'`, (err, response) => {
    if (err) callback(err);
    else callback(null, response);
  })
}

exports.deleterecord = ({ refresh_token }, callback) => {
  console.log(`DELETE from tokens where refresh_token = '${refresh_token}'`)
  db(
    `DELETE from tokens where refresh_token = '${refresh_token}'`,
    (err, response) => {
      if (err) callback(err);
      else callback(null, response);
    }
  );
};
