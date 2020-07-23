import Joi from '@hapi/joi';

export default Joi.object({
  authorization: Joi.string().required(),
});
