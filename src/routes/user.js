import Controller from './../controllers/user.js';
import Guard from './../controllers/guard.js';
import NewSchema from './../schemes/user/new.js';
import UpdateSchema from './../schemes/user/update.js';
import PasswordSchema from './../schemes/user/password.js';

export default [
  {
    method: 'GET',
    path: '/users',
    handler: Controller.index,
    config: {
      pre: [{ method: Guard.token, assign: "guard" }]
    }
  },
  {
    method: 'POST',
    path: '/users',
    handler: Controller.new,
    config: {
      pre: [{ method: Guard.token, assign: "guard" }],
      validate: {
        payload: NewSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: Controller.show,
    config: {
      pre: [{ method: Guard.token, assign: "guard" }]
    }
  },
  {
    method: 'PATCH',
    path: '/users/{id}',
    handler: Controller.update,
    config: {
      pre: [{ method: Guard.token, assign: "guard" }],
      validate: {
        payload: UpdateSchema
      }
    }
  },
  {
    method: 'POST',
    path: '/users/change-password',
    handler: Controller.changePassword,
    config: {
      pre: [{ method: Guard.token, assign: "guard" }],
      validate: {
        payload: PasswordSchema
      }
    }
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: Controller.delete,
    config: {
      pre: [{ method: Guard.token, assign: "guard" }]
    }
  },
];
