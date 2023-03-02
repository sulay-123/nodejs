const Joi = require("@hapi/joi");

module.exports = {
  
  login : Joi.object({
    email: Joi.string().required().empty().email().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `email cannot be an empty field`,
      "string.email": `Please enter valid email`,
      "any.required": `email is a required field`,
    }),
    password: Joi.string().required().empty().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/).min(6).max(20).messages({
      "string.base": `password should be a type of 'text'`,
      "string.empty": `password cannot be an empty field`,
      "string.min": "password should be of minimum 6 characters",
      "string.max": "password should be of maximum 16 characters",
      "string.pattern.base": "In Valid Password.",
      "any.required": `password is a required field`,
    })
  }),
  sentotp : Joi.object({
    email: Joi.string().required().empty().email().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `email cannot be an empty field`,
      "string.email": `Please enter valid email`,
      "any.required": `email is a required field`,
    })
  }),
  token : Joi.object({
    refresh_token: Joi.string().required().empty().messages({
      "string.base": `refreshToken should be a type of 'text'`,
      "string.empty": `refreshToken cannot be an empty field`,
      "any.required": `refreshToken is a required field`,
    }),
  }),
  forgetpass: Joi.object({
    email: Joi.string().required().empty().email().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `email cannot be an empty field`,
      "string.email": `Please enter valid email`,
      "any.required": `email is a required field`,
    }),
    otp: Joi.string().required().empty().min(5).max(5).messages({
      "string.base": `otp should be a type of 'text'`,
      "string.empty": `otp cannot be an empty field`,
      "string.min": "otp should be of 5 characters",
      "string.max": "otp should be of 5 characters",
      "any.required": `otp is a required field`,
    }),
    password: Joi.string().required().empty().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/).min(6).max(20).messages({
      "string.base": `password should be a type of 'text'`,
      "string.empty": `password cannot be an empty field`,
      "string.min": "password should be of minimum 6 characters",
      "string.max": "password should be of maximum 20 characters",
      "string.pattern.base": "password must contains lower case, upper case and digit between 6 and 16 characters",
      "any.required": `password is a required field`,
    })
  }),
  logout : Joi.object({
    refresh_token: Joi.string().required().empty().messages({
      "string.base": `refreshToken should be a type of 'text'`,
      "string.empty": `refreshToken cannot be an empty field`,
      "any.required": `refreshToken is a required field`,
    }),
  }),
};
