import loginSchema from './../schemes/login.js';

class Auth {
  async login(req, h) {
    const { error } = loginSchema.validate(req.payload);
    if (error) {
      return h.response({ message: error.details }).code(400).takeover();
    }

    const { email } = req.payload;

    return h.response({
      message: `logged`,
    }).state("session", {
      email: email
    });
  }
  async logout(req, h) {
    return h.response({
      message: `logout`,
    }).unstate('session');
  }
}

const auth = new Auth();

export default auth;