import Db from './../libs/mongodb.js';
import Bcrypt from 'bcrypt';

const SALT_LEVEL = 10;

const UserSchema = Db.schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
}, { versionKey: false, timestamps: true })


// // Hash the password before store it
// UserSchema.pre('save', (next) => {
//   if (!this.isModified('password')) {
//     return next();
//   }

//   Bcrypt.genSalt(SALT_LEVEL, (err, salt) => {
//     if (err) {
//       return next(err);
//     }

//     Bcrypt.hash(this.password, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }

//       this.password = hash;
      
//       next();
//     })
//   })
// });

// UserSchema.pre('updateOne', (next) => {
//   if (!Object.prototype.hasOwnProperty.call(this._update['$set'], 'password')) {
//     return next();
//   }

//   Bcrypt.genSalt(SALT_LEVEL, (err, salt) => {
//     if (err) {
//       return next(err);
//     }

//     Bcrypt.hash(this._update['$set'].password, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }

//       this._update['$set'].password = hash;
      
//       next();
//     })
//   })
// });

UserSchema.methods.comparePwd = async (triedPwd, cb) => {
  return Bcrypt.compare(triedPwd, this.password).then(res => {
    return res;
  });
}

UserSchema.statics.findOneByUsername = async (email, cb) => {
  return this.findOne({ email: email });
}

const model = Db.instance.model('User', UserSchema);

export default model;
