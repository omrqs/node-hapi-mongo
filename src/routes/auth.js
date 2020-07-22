import controller from './../controllers/auth.js';

export default [
  {
    method: 'POST',
    path: '/login',
    handler: controller.login,
  },
  {
    method: 'GET',
    path: '/logout',
    handler: controller.logout,
  },
];
