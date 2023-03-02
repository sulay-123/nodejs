const Joi = require("@hapi/joi");

module.exports = {
     addPlayListsong: Joi.object({
          song_id: Joi.string().required().empty().regex(/^[0-9]*$/).min(1).messages({
               "string.pattern.base": "song id has only digit",
               "any.required": `song id is a required field`,
               "string.min": "password should be of minimum 1 digit",
          }),
          playlist_id: Joi.string().required().empty().regex(/^[0-9]*$/).min(1).messages({
               "string.pattern.base": "play list id has only digit",
               "any.required": `play list id is a required field`,
               "string.min": "password should be of minimum 1 digit",
          })
     })
};