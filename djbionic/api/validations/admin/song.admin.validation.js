const Joi = require("@hapi/joi");

module.exports = {
     add_song: Joi.object({
          name: Joi.string().required().empty().min(3). messages({
               "string.base": `name should be a type of 'text'`,
               "string.empty": `name cannot be an empty field`,
               "string.min": "name should be of minimum 3 characters",
               "string.max": "name should be of maximum 20 characters",
               "any.required": `name is a required field`,
          }),
          author_name: Joi.string().required().empty().min(3).messages({
               "string.base": `author name should be a type of 'text'`,
               "string.empty": `author name cannot be an empty field`,
               "string.min": "author name should be of minimum 3 characters",
               "any.required": `author name is a required field`,
          }),
          url: Joi.string().required().empty().messages({
               "string.empty": `url cannot be an empty field`,
               "any.required": `url is a required field`,
          }),
          is_premium: Joi.number().empty().messages({
               "string.empty": `is_premium cannot be an empty field`,
               "any.required": `is_premium is a required field`,
          }),
          genric_id: Joi.number().integer().messages({
               "number.empty": `genric id cannot be an empty field`,
               "any.required": `genric id is a required field`,
          }),
          album_id: Joi.number().integer().messages({
               "number.empty": `album id cannot be an empty field`,
               "any.required": `album id is a required field`,
          }),
          new_song: Joi.number().integer().messages({
               "number.empty": `new_song cannot be an empty field`,
               "any.required": `new_song is a required field`,
          })
     })
};
