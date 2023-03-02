const Joi = require("@hapi/joi");

module.exports = {
     add_event: Joi.object({
          title: Joi.string().required().empty().min(3).messages({
               "string.base": `title should be a type of 'text'`,
               "string.empty": `title cannot be an empty field`,
               "string.min": "title should be of minimum 3 characters",
               "any.required": `title is a required field`,
          }),
          description: Joi.string().required().empty().min(3).messages({
               "string.base": `description should be a type of 'text'`,
               "string.empty": `description cannot be an empty field`,
               "string.min": "description should be of minimum 3 characters",
               "any.required": `description is a required field`,
          }),
          address: Joi.string().required().empty().messages({
               "string.empty": `address cannot be an empty field`,
               "any.required": `address is a required field`,
          }),
          event_date: Joi.string().required().empty().messages({
               "string.empty": `event date cannot be an empty field`,
               "any.required": `event date is a required field`,
          }),
          time: Joi.string().required().empty().messages({
               "string.empty": `time cannot be an empty field`,
               "any.required": `time is a required field`,
          }),
          image: Joi.string().required().empty().messages({
               "string.empty": `image cannot be an empty field`,
               "any.required": `image is a required field`,
          }),
     }),
     edit_event: Joi.object({
          title: Joi.string().required().empty().min(3).messages({
               "string.base": `title should be a type of 'text'`,
               "string.empty": `title cannot be an empty field`,
               "string.min": "title should be of minimum 3 characters",
               "any.required": `title is a required field`,
          }),
          description: Joi.string().required().empty().min(3).messages({
               "string.base": `description should be a type of 'text'`,
               "string.empty": `description cannot be an empty field`,
               "string.min": "description should be of minimum 3 characters",
               "any.required": `description is a required field`,
          }),
          address: Joi.string().required().empty().messages({
               "string.empty": `address cannot be an empty field`,
               "any.required": `address is a required field`,
          }),
          event_date: Joi.string().required().empty().messages({
               "string.empty": `event date cannot be an empty field`,
               "any.required": `event date is a required field`,
          }),
          time: Joi.string().required().empty().messages({
               "string.empty": `time cannot be an empty field`,
               "any.required": `time is a required field`,
          }),
          image: Joi.string().required().empty().messages({
               "string.empty": `image cannot be an empty field`,
               "any.required": `image is a required field`,
          }),
     })
};