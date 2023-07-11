const { Joi, validate } = require("express-validation");

const createPermission = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    method: Joi.string().trim().required(),
    url: Joi.string().trim().required(),
    type: Joi.string().trim().required(),
  }),
};

module.exports = {
  createPermissionValidate: validate(createPermission, { keyByField: true }),
};
