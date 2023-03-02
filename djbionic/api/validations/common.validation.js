const Joi = require("@hapi/joi");


module.exports = {
  upload: Joi.object({
    file: Joi.alternatives().try(Joi.string().required(),Joi.array().items(Joi.string().required()))
  }),
  
};
