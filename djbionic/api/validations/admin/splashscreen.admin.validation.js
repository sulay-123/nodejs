const Joi = require("@hapi/joi");

module.exports = {
  
  add : Joi.object({
     image: Joi.string().required().empty().messages({
          "string.base": `image should be a type of 'text'`,
          "string.empty": `image cannot be an empty field`,
          "any.required": `image is a required field`,
      })
  })
};
