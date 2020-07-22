import Mongoose from 'mongoose';

class Db {
  constructor() {
    Mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })
    Mongoose.set('useFindAndModify', false)
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

export default { db };
