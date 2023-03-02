const Joi = require("@hapi/joi");

module.exports = {
  contact: Joi.object({
     name: Joi.string().required().empty().messages({
      "string.base": `Name should be a type of 'text'`,
      "string.empty": `Name cannot be an empty field`,
      "any.required": `Name is required`,
    }),
    mobile: Joi.required().empty().messages({
      "any.required": `Phone number is required`,
    }),
    email: Joi.string().required().empty().email().messages({
      "string.base": `Email should be a type of 'text'`,
      "string.empty": `Email cannot be an empty field`,
      "string.email": `Email is not valid`,
      "any.required": `Email is required`,
    }),
    comment: Joi.string().required().empty().min(6).messages({
      "string.base": `Comment should be a type of 'text'`,
      "string.empty": `Comment cannot be an empty field`,
      "string.min": "Comment should be of minimum 6 characters",
      "any.required": `Comment is required`,
    }),
    
  })
};
