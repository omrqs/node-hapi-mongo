const describer = (server) => {
  describe("Login endpoint.", () => {
    it("should success to login", async (done) => {
      try {
        const options = {
          method: "POST",
          url: "/login",
          payload: JSON.stringify({
            "email":"first@user.io",
            "password":"firstuser"
          })  
        };
        const data = await server.inject(options);

        expect(data.statusCode).toBe(200);
        expect(data.result).toHaveProperty("message");
        expect(data.result).toHaveProperty("token");
        expect(data.result).toHaveProperty("user");

        done();
      } catch (err) {
        done(err);
      }
    });
  });
};

export default describer;
