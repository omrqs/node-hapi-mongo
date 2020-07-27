import Model from './../models/user.js';

class User {
  async index (req, h) {
    const page = req.query.page || 0;
    const limit = req.query.limit || 25;
    const sort = req.query.sort || {};

    return Model.find()
      .sort(sort).skip(page).limit(limit)
      .lean().exec()
      .then(users => {
        return h.response({ users });
      })
      .catch(err => {
        return h.response({ message: err }).code(500);
      });
  }

  async new (req, h) {
    return Model.create(req.payload)
      .then(async (user) => {
        return h.response({
          message: 'Document created.', 
          user: await user.toJson()
        });
      })
      .catch(err => {
        return h.response({ message: err }).code(500);
      });
  }

  async show (req, h) {
    return Model.findById(req.params.id)
      .then(async (user) => {
        return h.response({ user: await user.toJson() });
      })
      .catch(() => {
        return h.response({ message: "The id doesn't exist in the database." }).code(404);
      })
  }

  async update (req, h) {
    return Model.findByIdAndUpdate(req.params.id, req.payload)
    .then(async (user) => {
      return h.response({
        message: "Document was updated.",
        user: await user.toJson()
      });
    })
    .catch(() => {
      return h.response({ message: "The id doesn't exist in the database." }).code(404);
    });
  }
  
  async changePassword (req, h) {
    const { current_password, new_password } = req.payload;
    const sessionCookie = req.state.session || "";
    const { id } = sessionCookie;

    return Model.findById(id)
      .then(async (user) => {
        const checkPwd = await user.comparePwd(current_password);
        
        if (checkPwd) {
          return Model.findByIdAndUpdate(id, { password: user.encryptPwd(new_password) })
            .then(async (user) => {
              return h.response({ message: `password was changed` }).state("session", await user.toJson());
            })
            .catch(err => {
              return h.response({ message: err }).code(404);
            });
        }

        return h.response({ message: "Invalid current password." }).code(401);
      })
      .catch(err => {
        return h.response({ message: err }).code(500);
      });
  }
  
  async delete (req, h) {
    return Model.findByIdAndDelete(req.params.id).lean().exec()
      .then(resp => {
        if (typeof resp._id === 'undefined') {
          return h.response({ message: "The id doesn't exist in the database." }).code(404);
        }

        return h.response({ message: 'Document was removed.' });
      })
      .catch(() => {
        return h.response({ message: "The id doesn't exist in the database." }).code(404);
      });
  }
}

const user = new User();

export default user;
