const Joi = require("@hapi/joi");

module.exports = {
     addPlayList: Joi.object({
          name: Joi.string().required().empty().messages({
               "string.base": `play list name should be a type of 'text'`,
               "string.empty": `play list name cannot be an empty field`,
               "any.required": `play list name is a required field`,
          }),
     })
};