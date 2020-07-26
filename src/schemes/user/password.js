import Joi from '@hapi/joi';

const pattern = new RegExp('^[a-zA-Z0-9]{3,30}$');

export default Joi.object({
  current_password: Joi.string().pattern(pattern).required(),
  new_password: Joi.string().pattern(pattern).required()
});
