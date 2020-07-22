import UserSchema from './../schemes/user.js';
import Model from './../models/user.js';
import Joi from '@hapi/joi';

class User {
  async index (req, h) {
    const user = Model.find().lean().exec();
    
    return h.response({ user });
  }

  async new (req, h) {
    const { error } = UserSchema.validate(req.payload);
    if (error) {
      return h.response({
        message: error.details
        })
        .code(400)
        .takeover();
    }

    return Model.create(req.payload, (err, user) => {
      if (err) {
        return h.response({ message: err }).code(500).takeover();;
      }

      return h.response({
        message: 'Document created.', 
        user
      })
    });
  }

  async show (req, h) {
    let user = await Model.findById(req.params.id);

    if (user === null) {
      return h.response({
        message: "The id doesn't exist in the database."
      })
      .code(404)
      .takeover();
    }

    return h.response({ user });
  }

  async update (req, h) {
    const { error } = UserSchema.validate(req.payload);
    if (error) {
      return h.response({ message: error.details })
        .code(400)
        .takeover();
    }

    let user = await Model.findByIdAndUpdate(req.params.id, req.payload, { new: true });

    if (user === null) {
      return h.response({
        message: "The id doesn't exist in the database."
      })
      .code(404)
      .takeover();
    }

    return h.response({ user });
  }
  
  async delete (req, h) {
    let user = await Model.findByIdAndDelete(req.params.id).lean().exec();

    if (user === null) {
      return h.response({ message: "The id doesn't exist in the database." }).code(404);
    }

    return h.response({});
  }
}

const user = new User();

export default user;
