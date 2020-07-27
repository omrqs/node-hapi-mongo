import Controller from './../controllers/auth.js';
import Guard from './../controllers/guard.js';
import LoginSchema from './../schemes/auth/login.js';

export default [
  {
    method: 'POST',
    path: '/login',
    handler: Controller.login,
    config: {
      validate: {
        payload: LoginSchema
      }
    }
  },
  {
    method: 'GET',
    path: '/logout',
    handler: Controller.logout,
    config: {
      pre: [{ method: Guard.token, assign: "guard" }]
    }
  },
];
