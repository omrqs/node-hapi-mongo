class Main {
  async index() {
    return {
      message: `welcome to '${process.env.APP_NAME}'@'${process.env.NODE_ENV}' environment`,
    };
  }
}

const main = new Main();

export default main;
