const { GeneralResponse } = require("../utils/response");
const { GeneralError, NotFound } = require("../utils/error");
const {
  generateToken
} = require("../helpers/auth.helper");
const usersModel = require("../models/users.model");
const config = require("../utils/config");
exports.list = async (req, res, next) => {
    try {
        usersModel.getUsers((err, response) => {
            if (err) next(new NotFound('no users found'));
            else next(new GeneralResponse('users list',response))
        })
    } catch (err) {
        next(new GeneralError('error while getting users list'))
    }
}

exports.getUserByUserId = async (req, res, next) => {
    let { userid } = req.query;
    try {
        usersModel.getUserFromId(userid, (err, response) => {
            if (err) next(new NotFound('user not found'));
            else next(new GeneralResponse('user detail found',response))
        })
    } catch (err) {
        next(new GeneralError('error while getting user detail'))
    }
}


exports.registerdevice = async (req, res, next) => {
    try {
        let { device_id } = req.body;
        usersModel.isUserExistByDeviceId(device_id, async (err, response) => {
          if (!err && response.length > 0)
            next(
              new GeneralError(
                "user already exist",
                undefined,
                config.HTTP_ACCEPTED
              )
            );
          else {
            usersModel.createUserByDeviceId(
              { device_id},
              (err, response) => {
                if (err || response.affectedRows == 0)
                  next(new GeneralError("user registeration failed"));
                else
                  next(
                    new GeneralResponse(
                      "user successfully registered",
                      undefined,
                      config.HTTP_CREATED
                    )
                  );
              }
            );
          }
        });
      } catch (err) {
        next(new GeneralError("user registeration failed"));
      }
}

exports.getUserByDeviceId = async (req, res, next) => {
  let { device_id } = req.body;
  let login = req.body.login_is;
  console.log(login)
  try {
      usersModel.getUserByDeviceId(device_id, (err, response) => {
        
          if (err) next(new NotFound('user not found'));
          
          else 
          {
            
            let userdata = {
              role: response[0].role,
              is_approve: response[0].is_approve,
              device_id: response[0].device_id,
              id: response[0].id,
              is_login: login
            };
            console.log(userdata)
            let token = generateToken(userdata);
            response[0].token = token;
            next(new GeneralResponse('user detail found',response[0]));
          }
      })
  } catch (err) {
      next(new GeneralError('error while getting user detail'))
  }
}