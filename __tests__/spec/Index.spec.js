import server from "./../../src/server.js";
import Main from "./controllers/Main.describe.js";

// Start application before running the test case
beforeAll((done) => {
  server.events.on("start", () => {
    done();
  });
});

// Called before each test.
beforeEach(() => {});

// Stop application after running the test case
afterAll((done) => {
  server.events.on("stop", () => {
    done();
  });
  server.stop();
});

describe("aPI helper", () => Main(server));
