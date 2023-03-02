const Joi = require("@hapi/joi");

module.exports = {
  
  add : Joi.object({
      url: Joi.string().required().empty().min(3).messages({
          "string.base": `url should be a type of 'text'`,
          "string.empty": `url cannot be an empty field`,
          "string.min": "url should be of minimum 3 characters",
          "any.required": `url is a required field`,
      })
  })
};
