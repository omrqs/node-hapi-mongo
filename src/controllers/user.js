import NewSchema from './../schemes/user/new.js';
import UpdateSchema from './../schemes/user/update.js';
import Model from './../models/user.js';
import Joi from '@hapi/joi';

class User {
  async index (req, h) {
    return Model.find().lean().exec()
      .then(users => {
        return h.response({ users });
      })
      .catch(err => {
        return h.response({ message: err }).code(500).takeover();
      });
  }

  async new (req, h) {
    const { error } = NewSchema.validate(req.payload);
    if (error) {
      return h.response({ message: error.details }).code(400).takeover();
    }

    return Model.create(req.payload)
      .then(user => {
        return h.response({
          message: 'Document created.', 
          user
        });
      })
      .catch(err => {
        return h.response({ message: err }).code(500).takeover();
      });
  }

  async show (req, h) {
    return Model.findById(req.params.id)
      .then(user => {
        return h.response({ user });
      })
      .catch(err => {
        return h.response({
          message: "The id doesn't exist in the database."
        })
        .code(404)
        .takeover();
      })
  }

  async update (req, h) {
    const { error } = UpdateSchema.validate(req.payload);
    if (error) {
      return h.response({ message: error.details })
        .code(400)
        .takeover();
    }

    return Model.findByIdAndUpdate(req.params.id, req.payload, { new: true })
    .then(user => {
      return h.response({
        message: "Document was updated.",
        user
      });
    })
    .catch(err => {
      return h.response({
        message: "The id doesn't exist in the database."
      })
      .code(404)
      .takeover();
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
      .catch(err => {
        return h.response({ message: "The id doesn't exist in the database." }).code(404);
      });
  }
}

const user = new User();

export default user;
