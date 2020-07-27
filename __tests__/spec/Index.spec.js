import Server from './../../src/server.js';
import SeedUp from './../../src/seeds/tearUp.js';
import SeedDown from './../../src/seeds/tearDown.js';
import Main from './controllers/Main.describe.js';
import Auth from './controllers/Auth.describe.js';

// Start application before running the test case
beforeAll((done) => {
  Server.events.on('start', () => {
    done();
  });

  SeedUp();
});

// Called before each test.
beforeEach(() => {});

// Stop application after running the test case
afterAll((done) => {
  Server.events.on("stop", () => {
    done();
  });
  Server.stop();

  SeedDown();
});

describe("API helper", () => Main(Server));
describe("API Auth", () => Auth(Server));
