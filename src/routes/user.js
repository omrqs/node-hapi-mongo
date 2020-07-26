import Controller from './../controllers/user.js';
import Guard from './../controllers/guard.js';

export default [
  {
    method: 'GET',
    path: '/users',
    handler: Controller.index,
    config: {
      pre: [{ method: Guard.cookie, assign: "guard" }],
    }
  },
  {
    method: 'POST',
    path: '/users',
    handler: Controller.new,
    config: {
      pre: [{ method: Guard.cookie, assign: "guard" }],
    }
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: Controller.show,
    config: {
      pre: [{ method: Guard.cookie, assign: "guard" }],
    }
  },
  {
    method: 'PATCH',
    path: '/users/{id}',
    handler: Controller.update,
    config: {
      pre: [{ method: Guard.cookie, assign: "guard" }],
    }
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: Controller.changePassword,
    config: {
      pre: [{ method: Guard.cookie, assign: "guard" }],
    }
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: Controller.delete,
    config: {
      pre: [{ method: Guard.cookie, assign: "guard" }],
    }
  },
];
