import Model from './../models/user.js';
import Joi from '@hapi/joi';

class Guard {
  async cookie(req, h) {
    const sessionCookie = req.state.session || "";
    const { token } = sessionCookie;
    const user = await Model.findOneByToken(token);

    if (!user) {
      return h.response({ message: "unauthorized." }).code(401).takeover();
    }

    return h.response({ message: "authenticated" });
  }

  async token(req, h) {
    const authorization = req.headers.authorization || '';
    const user = await Model.findOneByToken(authorization);

    if (!user) {
      return h.response({ message: "unauthorized." }).code(401).takeover();
    }

    return h.response({ message: "authenticated" });
  }
}

const guard = new Guard();

export default guard;
