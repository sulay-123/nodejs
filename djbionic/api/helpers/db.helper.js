// Dependencies
const mysql = require("mysql");
const { ServiceNotAvailable, BadRequest } = require("../utils/error");

/*
 * @sqlConnection
 * Creates the connection, makes the query and close it to avoid concurrency conflicts.
 */
const sqlConnection = function sqlConnection(sql, values, next) {
  // It means that the values hasnt been passed
  if (arguments.length === 2) {
    next = values;
    values = null;
  }

  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });

  connection.connect(function (err) {
    if (err !== null) {
        next(new ServiceNotAvailable('Error connecting to Database'), null);
    }
  });

  connection.query(sql, values, function (err) {
    connection.end(); // close the connection

    if (err) {
        next(new BadRequest('Error in Database Query'),null);
    }

    // Execute the callback
    next.apply(this, arguments);
  });
};

module.exports = sqlConnection;
