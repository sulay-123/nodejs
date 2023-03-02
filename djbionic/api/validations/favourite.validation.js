const Joi = require("@hapi/joi");

module.exports = {
     addfavourite: Joi.object({
          song_id: Joi.string().required().empty().regex(/^[0-9]*$/).min(1).messages({
               "string.pattern.base": "song id has only digit",
               "any.required": `song id is a required field`,
               "string.min": "password should be of minimum 1 digit",
          }),
     })
};