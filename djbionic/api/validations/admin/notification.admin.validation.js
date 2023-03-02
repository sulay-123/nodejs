const Joi = require("@hapi/joi");

module.exports = {
  
     add : Joi.object({
          title: Joi.string().required().empty().min(3).max(20).messages({
               "string.base": `title should be a type of 'text'`,
               "string.empty": `title cannot be an empty field`,
               "string.min": "title should be of minimum 3 characters",
               "string.max": "title should be of maximum 20 characters",
               "any.required": `title is a required field`,
          }),
          message: Joi.string().required().empty().min(3).messages({
               "string.base": `message should be a type of 'text'`,
               "string.empty": `message cannot be an empty field`,
               "string.min": "message should be of minimum 3 characters",
               "any.required": `message is a required field`,
          }),
          image:Joi.string().messages({

          }),
          user_type:Joi.number().integer().messages({
          
          })
     })
};
