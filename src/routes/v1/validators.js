const Joi = require('joi')

const createOrgRequestValidator = Joi.object({
    org_name: Joi.string()
                .alphanum()
                .min(3)
                .max(32)
                .required(),
    address: Joi.string()
                .alphanum()
                .min(3)
                .max(128)
                .required(),
    tel:     Joi.string()
                .pattern(new RegExp('^[0][0-9]{8,9}$'))
                .required()
});

module.exports = {
    createOrgRequestValidator
}