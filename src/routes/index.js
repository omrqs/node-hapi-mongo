import main from "./main.js";

const plugin = {
  name: process.env.APP_NAME || "example",
  version: "0.1.0",
  register: async function register (server) {
    server.route(main);
  },
};

export default plugin;
