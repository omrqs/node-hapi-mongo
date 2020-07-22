import Controller from './../controllers/auth.js';

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
  },
];
