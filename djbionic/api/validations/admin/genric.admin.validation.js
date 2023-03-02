const Joi = require("@hapi/joi");

module.exports = {
  
  add : Joi.object({
      name: Joi.string().required().empty().min(3).messages({
          "string.base": `name should be a type of 'text'`,
          "string.empty": `name cannot be an empty field`,
          "string.min": "name should be of minimum 3 characters",
          "any.required": `name is a required field`,
      }),
      genric_type: Joi.number().integer().required().empty().messages({
        "number.empty": `genric id cannot be an empty field`,
        "any.required": `genric id is a required field`,
      })
  })
};
