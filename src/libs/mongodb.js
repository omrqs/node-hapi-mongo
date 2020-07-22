import Mongoose from 'mongoose';

class Db {
  constructor() {
    const {
      MONGO_USERNAME,
      MONGO_PASSWORD,
      MONGO_HOST,
      MONGO_PORT,
      MONGO_DB
    } = process.env;
    
    const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;

    Mongoose.connect(url, {
      retryWrites: true,
      useNewUrlParser: true,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      connectTimeoutMS: 10000,
    });

    Mongoose.set('useFindAndModify', false);
  }

  init() {
    this.instance = Mongoose;
    this.connection = Mongoose.connection;
    this.schema = Mongoose.Schema;
  }
}

const db = new Db();

db.init();
db.connection.on('error', console.error.bind(console, 'connection error:'));

export default db;