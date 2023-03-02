/**
 * The Express.js framework makes it very easy to develop an application which can be used to handle multiple types of requests like the GET, PUT, and POST and DELETE requests.
 */
const express = require("express");
const app = express();
const subPath = express(); // For Swagger Implementation

/**
 * helmet => Helmet helps you secure your Express apps by setting various HTTP headers. 
 * It's not a silver bullet, but it can help!
 */
const helmet = require("helmet");
app.use(helmet());

/**
 * dotenv For Managing Environments in node js
 */
const dotenv = require("dotenv");
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

/** Express middleware - cors
 * enables cross-origin-resource-sharing for express apis
 */
const cors = require("cors");
app.use(cors());

/** Express middleware - body-parser
 * body-parser extract the entire body portion of an incoming request stream and exposes it on req.body
 */
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" })); // support parsing of application/json type post data
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // support parsing of application/x-www-form-urlencoded post data

/**
 * Swagger Api Documentation
 */
const swagger = require("swagger-node-express").createNew(subPath);
swagger.configure('http://localhost:5000/', '1.0.0');

/**
 * Express User Agent for getting Session Data
 */
app.use(require('express-useragent').express())

/**
 * Routes
 */
app.use("/api/v1", require("./api/routes/v1")); // Version 1

/**
 * Response Handling
 */
app.use(require("./api/helpers/response.helper"));

/**
 * After your routes add a standard express error handler. This will be passed the Joi
 * error, plus an extra "type" field so we can tell what type of validation failed
 */
app.use(require("./api/helpers/error.helper").handleJoiErrors);

/**
 * Error Handling
 */
app.use(require("./api/helpers/error.helper").handleErrors);

/**
 * Process is a default property for fetching Environment Variables
 */
const port = process.env.PORT || 3001;
app.listen(port, () => {
  // Listening to port
  console.log(`Listening to Port :  ${port}`);
  console.log('123');
});
