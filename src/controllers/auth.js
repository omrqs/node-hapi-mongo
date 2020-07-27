import LoginSchema from './../schemes/auth/login.js';
import Model from './../models/user.js';

class Auth {
  async login(req, h) {
    const { error } = LoginSchema.validate(req.payload);
    if (error) {
      return h.response({ message: error.details }).code(400);
    }

    const { email, password } = req.payload;

    return Model.findOneByUsername(email)
      .then(async (user) => {
        const checkPwd = await user.comparePwd(password);

        if (checkPwd) {
          return h.response({
            message: `logged`,
            token: user.token,
            user: await user.toJson()
          })
          .code(201)
          .state("session", await user.toJson());
        }

        return h.response({ message: "Invalid credentials." }).code(401);
      })
      .catch(err => {
        return h.response({ err: err.getMessage() }).code(500);
      });
  }
  async logout(req, h) {
    return h.response({ message: `logout` }).unstate('session');
  }
}

const auth = new Auth();

export default auth;
