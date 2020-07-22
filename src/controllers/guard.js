import TokenSchema from './../schemes/token.js';
import Joi from '@hapi/joi';

class Guard {
  async cookie(req, h) {
    const sessionCookie = req.state.session || "";

    return h.response({ message: "authenticated" });
  }

  async token(req, h) {
    const { error } = TokenSchema.validate(req.headers);
    if (error) {
      return h.response({ message: error.details }).code(400).takeover();
    }

    return h.response({ message: "authenticated" });
  }
}

const guard = new Guard();

module.exports = guard;
