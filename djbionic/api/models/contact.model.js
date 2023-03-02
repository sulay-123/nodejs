const db = require("../helpers/db.helper");



exports.createcontact = (user, callback) => {
  db(
    `INSERT INTO contact (name,email,mobile,comment) values ('${user.name}','${user.email}','${user.mobile}','${user.comment}')`,
    (err, response) => {
      if (err) callback(err);
      else callback(null, response);
    }
  );
};
