import UserSchema from './../schemes/user.js';
import Model from './../models/user.js';
import Joi from '@hapi/joi';

class User {
  async index (req, h) {
    return Model.find().lean().exec();
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

    return new Promise(resolve => {
      Model.create(req.payload, (err, user) => {
        if (err) {
          resolve(
            h.response({
              status: 500,
              message: err
            })
            .code(500));
        }

        resolve(
          h.response({
            statusCode: 201, 
            message: 'User created.', 
            document: user
          })
          .code(201));
      })
    })
  }

  async show (req, h) {
    let doc = await Model.findById(req.params.id);

    if (doc === null) {
      return h.response({
        statusCode: 404,
        error: "Document not found.",
        message: "The id doesn't exist in the database."
      })
      .code(404);
    }

    return doc;
  }

  async update (req, h) {
    const { error } = UserSchema.validate(req.payload);
    if (error) {
      return h.response({
        message: error.details
        })
        .code(400)
        .takeover();
    }

    let doc = await Model.findByIdAndUpdate(req.params.id, req.payload, { new: true });

    if (doc === null) {
      return h.response({
        statusCode: 404,
        error: "Document not found.",
        message: "The id doesn't exist in the database."
      })
      .code(404);
    }

    return doc;
  }
  
  async delete (req, h) {
    let doc = await Model.findByIdAndDelete(req.params.id).lean().exec();

    if (doc === null) {
      return h.response({
        statusCode: 404,
        error: "Document not found.",
        message: "The id doesn't exist in the database."
      })
      .code(404);
    }

    return doc;
  }
}

const user = new User();

export default user;
