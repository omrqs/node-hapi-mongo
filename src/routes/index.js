exports.plugin = {
  name: process.env.APP_NAME,
  version: "0.1.0",
  async register(server) {
    server.route(require("Routes/main"));
  },
};
