import Controller from './../controllers/main.js';

export default [
  {
    method: 'GET',
    path: '/',
    handler: Controller.index,
  },
];
