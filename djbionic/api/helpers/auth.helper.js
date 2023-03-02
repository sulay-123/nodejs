const jwt = require("jsonwebtoken");
const { UnAuthorized } = require("../utils/error");

/**
 * Middeware for Checking User Authentication
 */
const authenticate = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      console.log(token) // Remove Bearer from string
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        next(new UnAuthorized("auth token is invalid"));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    next(new UnAuthorized("auth token not supplied"));
  }
};

/**
 * Middeware for Generating a new JWT Token
 */
const generateToken = (data, role = "") => {
  if(role == 1){
    let token = jwt.sign(data, process.env.SECRET_KEY, {
      expiresIn: process.env.ADMIN_TOKEN_EXPIRY,
    });
    return token;
  }else{
    let token = jwt.sign(data, process.env.SECRET_KEY, {
      expiresIn: process.env.TOKEN_EXPIRY,
    });
    return token;
  }
};

/**
 * Middeware for Generating a new Refresh Token
 */
const generateRefreshToken = (data, role = "") => {
  if(role == 1){
    let token = jwt.sign(data, process.env.REFRESH_SECRET_KEY, {
      expiresIn: process.env.ADMIN_REFRESH_TOKEN_EXPIRY,
    });
    return token;
  }else{
    let token = jwt.sign(data, process.env.REFRESH_SECRET_KEY, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });
    return token;
  }
};

const isRefreshTokenValid = async (refreshToken) => {
  
  let isvalid, dec;
  await jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
    if (err) {
      isvalid = false;
      dec = undefined
    } else {
      isvalid = true  
      dec = decoded    
    }
    
  });
  return { isvalid , decoded : dec };
}
module.exports = {
  authenticate,
  generateToken,
  generateRefreshToken,
  isRefreshTokenValid
};
