const bcrypt = require("bcrypt");
const {
  generateToken,
  generateRefreshToken,
  isRefreshTokenValid
} = require("../../helpers/auth.helper");
const { GeneralResponse } = require("../../utils/response");
const { GeneralError, UnAuthorized } = require("../../utils/error");
const usersModel = require("../../models/users.model");
const config = require("../../utils/config");
const { decryptString, encryptString } = require('../../helpers/crypto.helper');
const moment = require('moment');
const { sentMailSync, sentMail } = require('../../helpers/mail.helper');
const saltRounds = 10;
const { makeid } = require('../../utils/utils');
const tokensModel = require("../../models/tokens.model");

exports.login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    console.log(email)
    usersModel.isUserExistByEmailId(email, async (err, response) => {
      if (err || response.length === 0) next(new GeneralError("Email Id Does not exists", undefined, config.HTTP_ACCEPTED));
      else {
        const comparision = await bcrypt.compare(password, response[0].password);
        if (comparision) {
          if(response[0].role == 1)
          {
            let userdata = {
                role: response[0].role,
                is_approve: response[0].is_approve,
                device_id: response[0].device_id,
                id: response[0].id,
                is_login:1
            };
            let token = generateToken(userdata);
            let refresh_token = generateRefreshToken(userdata); 
            tokensModel.createToken(
              { user_id: userdata.id, refresh_token, user_agent: req.useragent.source },
              (err, tokenresponse) => {
                if (err || tokenresponse.affectedRows === 0)
                  next(new GeneralError("error in generation of auth token"));
                else  
                  next(
                    new GeneralResponse("Login Successfully.", {token: token,
                      refresh_token: refresh_token,
                      // user_id: response[0].id,
                      name: response[0].fname,
                      email: response[0].email}, config.HTTP_SUCCESS)
                  );
                });
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

exports.token = async (req, res, next) => {
  try {
    let { refresh_token } = req.body;

    let { isvalid, decoded } = await isRefreshTokenValid(refresh_token);
    if (isvalid) {
      tokensModel.isTokenExist(refresh_token, (err, response) => {
        if (err || response.length === 0) next(new UnAuthorized("refresh token is invalid"));
        else {
          usersModel.getUserFromId(response[0].user_id, (err, userresponse) => {
            if (err || userresponse.length === 0) next(new UnAuthorized("user does not exist"));
            else {
              let userdata = {
                role: response[0].role,
                is_approve: response[0].is_approve,
                device_id: response[0].device_id,
                id: response[0].id,
                is_login:1
              };
              let exp_time = moment.unix(decoded.exp);
              let current_time = moment();
              let exp_diff = moment.duration(exp_time - current_time, 'milliseconds');
              if (Math.floor(exp_diff.hours()) == process.env.ADMIN_REFRESH_TOKEN_EXPIRY_HOURS && Math.floor(exp_diff.minutes()) < (process.env.ADMIN_REFRESH_TOKEN_EXPIRY_MINUTES - 1)) {
                let refreshtoken = generateRefreshToken(userdata, "admin");
                tokensModel.updateSingleColumn({ key: 'refresh_token', value: refreshtoken, id: response[0].id }, (err, response) => {
                  if (err) next(new UnAuthorized("error in updating refresh token"));
                  else {
                    let token = generateToken(userdata, "admin");
                    next(new GeneralResponse("token generated", { token: token, refresh_token : refreshtoken }))
                  }
                })
              } else {
                let token = generateToken(userdata, "admin");
                next(new GeneralResponse("token generated", { token: token }))
              }
            }
          });
        }
      });
    } else {
      tokensModel.isTokenExist(refresh_token, (err, response) => {
        tokensModel.deleterecord({ refresh_token }, (err, response) => {
          next(new UnAuthorized("refresh token is invalid"))
        })
      });
    }
  } catch (err) {
    console.log(err)
    next(new UnAuthorized("refresh token failure"));
  }
};

/** Sent OTP for forget password */
exports.sentotp = async (req, res, next) => {
  try {
    let { email } = req.body;
    usersModel.isUserExist(email, (err, response) => {
      if (err || response.length === 0) next(new GeneralError('Email Id Does not exists'));
      else {
        // console.log(response[0])
        let user_id = response[0].id;
        if (response[0].role == 1) {
          let verificationCode = makeid(5);
          let encryptedVerificationCode = encryptString(verificationCode);
          console.log({key: 'verify_token', value: encryptedVerificationCode, user_id})
          usersModel.updateSingleColumn({ key: 'verify_token', value: encryptedVerificationCode, user_id}, (err, updateresponse2) => {
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

/** LOGOUT */
exports.logout = async(req,res,next) => {
  try{
    let {refresh_token} = req.body; 
    console.log(refresh_token)
    tokensModel.deleterecord({ refresh_token },(err,response)=>{
      if(err) next(new GeneralError("error in logout api"))
      next(new GeneralResponse("logout successfully"))
    })
  }catch(err){
    next(new GeneralError("error in logout api"))
  }
}