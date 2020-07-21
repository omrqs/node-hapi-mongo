import Hapi from '@hapi/hapi';
import HapiCors from "hapi-cors";
import HapiPino from "hapi-pino";
import Routes from "./routes/index.js";

const server = new Hapi.Server({
  host: process.env.SERVER_HOST || "0.0.0.0",
  port: process.env.SERVER_PORT || 8000,
  router: { stripTrailingSlash: true },
});

const init = async () => {
  await server.register({
    plugin: Routes
  });

  await server.register({
    plugin: HapiCors,
    options: {
      origins: ["*"],
      allowCredentials: "true",
      methods: ["GET", "POST", "OPTIONS", "HEAD", "PUT", "DELETE", "PATCH"],
    },
  });

  await server.register({
    plugin: HapiPino,
    options: {
      prettyPrint: true,
      logEvents: ["response", "onPostStart"],
    },
  });

  await server.start();

  console.info(`Server running at: ${server.info.uri}`);
};

// enable error handler log only production.
if (process.env.NODE_ENV === "production") {
  process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
  });
}

export default init();
