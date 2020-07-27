const describer = (server) => {
  describe("main endpoint (healthy checker).", () => {
    it("should success to request index API", async (done) => {
      try {
        const options = {
          method: "GET",
          url: "/",
        };
        const data = await server.inject(options);

        expect(data.statusCode).toBe(200);
        expect(data.result).toHaveProperty("message");

        return done();
      } catch (err) {
        return done(err);
      }
    });
  });
};

export default describer;
