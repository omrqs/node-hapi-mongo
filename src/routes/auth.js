import Controller from './../controllers/auth.js';
import Guard from './../controllers/guard.js';

export default [
  {
    method: 'POST',
    path: '/login',
    handler: Controller.login,
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
