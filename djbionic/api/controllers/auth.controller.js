const bcrypt = require("bcrypt");
const {
  generateToken
} = require("../helpers/auth.helper");
const { GeneralResponse } = require("../utils/response");
const { GeneralError, UnAuthorized } = require("../utils/error");
const usersModel = require("../models/users.model");
const config = require("../utils/config");
const { decryptString, encryptString } = require('../helpers/crypto.helper');
const { sentMailSync, sentMail } = require('../helpers/mail.helper');
const saltRounds = 10;
const { makeid } = require('../utils/utils');

exports.register = async (req, res, next) => {
  try {
    let { fname, lname, email, password , device_id } = req.body;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);
    let updateuserrequest = { fname, lname, email, password: encryptedPassword , device_id ,is_approve:1 };
    usersModel.isUserExist(email, async (err, response) => {
      if (!err && response.length > 0)
          next(new GeneralError("user already exist", undefined, config.HTTP_ACCEPTED));
      else {
        usersModel.isUserExistByDeviceId(device_id, async (err, response) => {
          if (!err && response.length > 0)
          {
              usersModel.updateuser({ user: updateuserrequest, device_id }, (err, userupdateresponse) => {
                if (err) next(new GeneralError("user update failed"));
                else {
                    next(new GeneralResponse("user updated all details"));
                }
              })
          }
          else {
            usersModel.createUser(
              { fname, lname, email, password: encryptedPassword,device_id },
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
      }
    });
  } catch (err) {
    next(new GeneralError("user registeration failed"));
  }
};

exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    usersModel.isUserExistByEmailId(email, async (err, response) => {
      if (err || response.length === 0) next(new GeneralError("user not found", undefined, config.HTTP_ACCEPTED));
      else {
        const comparision = await bcrypt.compare(password, response[0].password);
        if (comparision) {
          if(response[0].role == 2)
          {
            if(response[0].is_approve != 1)
            { 
              next(
                new GeneralResponse("user is not approve by admin", response[0], config.HTTP_SUCCESS)
              );
            }
            let userdata = {
                role: response[0].role,
                is_approve: response[0].is_approve,
                device_id: response[0].device_id,
                id: response[0].id,
                is_login:1
            };
            let token = generateToken(userdata);
            response[0].token = token;   
            next(
              new GeneralResponse("user successfully login", response[0], config.HTTP_SUCCESS)
            );
          }
          else
          {
            next(
              new GeneralResponse("You are not a normal user", response, config.HTTP_SUCCESS)
            );
          }
        } else {
          next(new UnAuthorized("email and password does not match"));
        }
      }
    });
  } catch (err) {
    next(new GeneralError("user login failure"));
  }
};

/** Sent OTP for forget password */
exports.resentforgetpassmail = async (req, res, next) => {
  try {
    let { email } = req.body;
    usersModel.isUserExist(email, (err, response) => {
      if (err || response.length === 0) next(new GeneralError('User does not exists'));
      else {
        if (response[0].role != 3) {
          let verificationCode = makeid(5);
          let encryptedVerificationCode = encryptString(verificationCode);
          usersModel.updateSingleColumn({ key: 'verify_token', value: encryptedVerificationCode, user_id: response[0].id }, (err, updateresponse2) => {
            if (err) next(new GeneralError('resent email failure'));
            else {
              sentMailSync({
                from: process.env.MAIL_FROM_DEFAULT_ID,
                to: email,
                subject: `Requested OTP for Your ${process.env.APP_NAME}`,
                html: `<p>Hello ` + response[0].fname +" " + response[0].lname + `,</p><p>Your otp code is ` + verificationCode + `.</p>Thank you,<br>Your ${process.env.APP_NAME}.`
              }, (err, info) => {
                if (err) next(new GeneralError("resent email failure"));
                else next(new GeneralResponse('Verification code sent to your email'));
              })
            }
          })
        } else {
          next(new GeneralError('you dont have access for admin'));
        }
      }
    })
  } catch (err) {
    next(new GeneralError("resent email failure"));
  }
};

/** forget password  */
exports.forgetpass = async (req, res, next) => {
  try {
    let { otp, password, email } = req.body;
    usersModel.isUserExist(email, async (err, response) => {
      if (err || response.length === 0) next(new GeneralError('error while getting user details'));
      else {
        if (response[0].role != 3) {
          let verify_token = response[0].verify_token;
          if (verify_token && verify_token !== "") {
            let verificationCode = decryptString(verify_token);
            if (otp === verificationCode) {
              const encryptedPassword = await bcrypt.hash(password, saltRounds);
              usersModel.updateSingleColumn({ key: 'password', value: encryptedPassword, user_id: response[0].id }, (err, updateresponse) => {
                if (err) next(new GeneralError('forget password failure'));
                usersModel.updateSingleColumn({ key: 'verify_token', value: '', user_id: response[0].id }, (err, updateresponse2) => {
                  if (err) next(new GeneralError('forget password failure'));
                  else next(new GeneralResponse('Changed Password Successfully'));
                })
              })
            } else {
              next(new GeneralError('otp is incorrect'));
            }
          } else {
            next(new GeneralError('please request for otp first'));
          }
        } else {
          next(new GeneralError('you dont have access for admin'));
        }
      }
    })
  } catch (err) {
    console.log(err)
    next(new GeneralError("forget password failure"));
  }
};
