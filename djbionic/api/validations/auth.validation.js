const Joi = require("@hapi/joi");

module.exports = {
  register: Joi.object({
    fname: Joi.string().required().empty().messages({
      "string.base": `First name should be a type of 'text'`,
      "string.empty": `First name cannot be an empty field`,
      "any.required": `First name is required`,
    }),
    lname: Joi.string().required().empty().messages({
      "string.base": `Last name should be a type of 'text'`,
      "string.empty": `Last name cannot be an empty field`,
      "any.required": `Last name is required`,
    }),
    email: Joi.string().required().empty().email().messages({
      "string.base": `Email should be a type of 'text'`,
      "string.empty": `Email cannot be an empty field`,
      "string.email": `Email is not valid`,
      "any.required": `Email is required`,
    }),
    password: Joi.string().required().empty().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/).min(6).max(16).messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password cannot be an empty field`,
      "string.min": "Password should be of minimum 6 characters",
      "string.max": "Password should be of maximum 16 characters",
      "string.pattern.base": "Password must contains lower case, upper case and digit between 6 and 16 characters",
      "any.required": `Password is required`,
    }),
    device_id: Joi.string().required().empty().messages({
      "string.empty": `Device id cannot be an empty field`,
      "any.required": `Device id is required`,
    })
  }), 
  login : Joi.object({
    email: Joi.string().required().empty().email().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `Email cannot be an empty field`,
      "string.email": `Email is not valid`,
      "any.required": `Email is required`,
    }),
    password: Joi.string().required().empty().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/).min(6).max(16).messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password cannot be an empty field`,
      "string.min": "Password should be of minimum 6 characters",
      "string.max": "Password should be of maximum 16 characters",
      "string.pattern.base": "Password must contains lower case, upper case and digit between 6 and 16 characters",
      "any.required": `Password is required`,
    })
  }),
  sentotp : Joi.object({
    email: Joi.string().required().empty().email().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `Email cannot be an empty field`,
      "string.email": `Email is not valid`,
      "any.required": `Email is required`,
    })
  }),
  forgetpass: Joi.object({
    email: Joi.string().required().empty().email().messages({
      "string.base": `email should be a type of 'text'`,
      "string.empty": `Email cannot be an empty field`,
      "string.email": `Email is not valid`,
      "any.required": `Email is required`,
    }),
    otp: Joi.string().required().empty().min(5).max(5).messages({
      "string.base": `Otp should be a type of 'text'`,
      "string.empty": `Otp cannot be an empty field`,
      "string.min": "Otp should be of 5 characters",
      "string.max": "Otp should be of 5 characters",
      "any.required": `Otp is required`,
    }),
    password: Joi.string().required().empty().regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/).min(6).max(20).messages({
      "string.base": `Password should be a type of 'text'`,
      "string.empty": `Password cannot be an empty field`,
      "string.min": "Password should be of minimum 6 characters",
      "string.max": "Password should be of maximum 16 characters",
      "string.pattern.base": "Password must contains lower case, upper case and digit between 6 and 16 characters",
      "any.required": `Password is required`,
    })
  })
};
