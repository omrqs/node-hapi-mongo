import Main from './main.js';
import Auth from './auth.js';
import User from './user.js';

const plugin = {
  name: process.env.APP_NAME || 'example',
  version: '0.1.0',
  register: async function register (server) {
    server.route(Main);
    server.route(Auth);
    server.route(User);
  },
};

export default plugin;
