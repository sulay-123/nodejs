const Joi = require("@hapi/joi");

module.exports = {
     registerdevice: Joi.object({
          device_id: Joi.string().required().empty().messages({
               "string.empty": `device id cannot be an empty field`,
               "any.required": `device id is a required field`,
          })
     })
};
