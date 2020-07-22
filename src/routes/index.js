import main from './main.js';
import auth from './auth.js';

const plugin = {
  name: process.env.APP_NAME || 'example',
  version: '0.1.0',
  register: async function register (server) {
    server.route(main);
    server.route(auth);
  },
};

export default plugin;
