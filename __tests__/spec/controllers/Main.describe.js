const describer = (server) => {
  describe("Main endpoint (healthy checker).", () => {
    test("should success to request index API", async (done) => {
      try {
        const options = {
          method: "GET",
          url: "/",
        };
        const data = await server.inject(options);

        expect(data.statusCode).toBe(200);
        expect(data.result).toHaveProperty("message");

        done();
      } catch (err) {
        done(err);
      }
    });
  });
};

export default describer;
